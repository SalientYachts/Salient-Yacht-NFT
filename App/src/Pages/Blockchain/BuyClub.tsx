import * as React from 'react';

import { useState, useEffect } from "react";


import { Accordion, Badge, Box, Card, Image, Group, Progress, Loader, Slider, Modal, Button, Text, Title, Grid, Divider } from '@mantine/core';
import Swal from 'sweetalert2';
import axios from 'axios';


import {
  ChainId,
  useContractMetadata,
  useNetwork,
  useActiveClaimCondition,
  useEditionDrop,
  useNFT,
  ThirdwebNftMedia,
  useAddress,
  useMetamask,
  useNetworkMismatch,
  useClaimNFT,
  useEdition,
  useNFTCollection,
  MediaRenderer,
  useContract,
} from "@thirdweb-dev/react";
import { useForceUpdate } from '@mantine/hooks';





const API_URL = "https://app.salientyachts.com"








export default function BuyClub() {

  const forceUpdate = useForceUpdate();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const [isMinting, setIsMinting] = useState(false)

  let orderIDBroker: any
  const [infoMessage, setInfoMessage]: any = useState('waiting for transaction confirmation...');

  const [CommonQty, setCommonQty] = useState(1)
  const CommonPrice = 25
  const [StandardQty, setStandardQty] = useState(1)
  const StandardPrice = 100
  const [BronzeQty, setBronzeQty] = useState(1)
  const BronzePrice = 500
  const [SilverQty, setSilverQty] = useState(1)
  const SilverPrice = 1000
  const [goldQty, setGoldQty] = useState(1)
  const goldPrice = 2000
  const [EpicQty, setEpicQty] = useState(1)
  const EpicPrice = 4000



  // purchase data
  const [orderData, setOrderData]: any = useState({
    nftname: 'SYClub',
    salevalue: '1.00',
    noOfNfts: '1',
    nftType: '0',
    nftTxnAmount: '0.0123',
    nftTxnResult: 'hash etc',
    txid: '0x...',
    buyerAddress: '0x...',

  });

  const { contract } = useContract(
    "0x83a4958CB9ba1961Fbf385CC652aB74bFCc7a284"
  );



  const myEditionDropContractAddress = "0x83a4958CB9ba1961Fbf385CC652aB74bFCc7a284";  //mainnet
  //const myEditionDropContractAddress = "0xd40F966c594593AF64DBf16ea2c2C18F20337889";   //testnet

  const [processing, setProcessing]: any = useState(false);
  const editionDrop = useEditionDrop(myEditionDropContractAddress)
  const address = useAddress()
  const [addressClaim, setaddressClaim] = useState("")

  const [brokerData, setbrokerData]: any = useState({
    orderIDBroker: orderIDBroker,
  });

  useEffect(() => {
    if (address) {
      setaddressClaim(address)
    }
  }, [address]);

  // Load contract metadata
  // const { data: contractMetadata } = useContractMetadata(
  //   myEditionDropContractAddress
  // );

  // const { data: nftMetadata } = useNFT(editionDrop, 0);



  // Load the active claim condition
  // const { data: activeClaimCondition } = useActiveClaimCondition(
  //   editionDrop,
  //   BigNumber.from(0)
  // );




  // const {
  //   mutate: claimNft,
  //   error,
  // } = useClaimNFT(editionDrop);

  // if (error) {
  //   console.error("failed to claim nft", error);
  // }



  //@ts-ignore
  const mintNFT = async (nftType, noOfNfts, nftPrice) => {



    // Make sure the user has their wallet connected.
    if (!address) {
      setProcessing(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No Wallet Connected',
        footer: 'Please Connect your wallet in the account menu!',
        timer: 4000,
        timerProgressBar: true,
      })
      return;
    }

    // Make sure the user is on the correct network (same network as your NFT Drop is).
    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(ChainId.Mainnet);
      return;
    }
    setProcessing(true);
    try {
      setIsMinting(true)
      const tx = await editionDrop?.claimTo(addressClaim, nftType, noOfNfts);
      console.log("🎉 NFT claimed successfully!");
      const receipt: any = tx?.receipt; // the transaction receipt
      const buyerAddress2: any = addressClaim
      // Capture order and commssions
      const txidResult: any = receipt?.transactionHash
      const valueofsale: any = (noOfNfts * nftPrice)
      //console.log("----> Sale Value = ", valueofsale)
      //console.log("----> nftTxnResult = ", receipt);
      //console.log("----> TXID = ", txidResult);

      setOrderData({ ...orderData.salevalue = valueofsale });
      setOrderData({ ...orderData.noOfNfts = noOfNfts });
      setOrderData({ ...orderData.nftType = nftType });
      setOrderData({ ...orderData.nftTxnAmount = nftPrice });
      setOrderData({ ...orderData.nftTxnResult = receipt });
      setOrderData({ ...orderData.txid = txidResult });
      setOrderData({ ...orderData.buyerAddress = buyerAddress2 });

      console.log('Confirming Transaction...');
      setInfoMessage('Confirming Transaction...');
      storeOrder();


    } catch (err) {
      console.log("💩 Error claiming NFT: ", err);
      const e = err as Error;
      alert((e?.message as string) || "Something went wrong");
      setProcessing(false)
    }
    setIsMinting(false)
  };






  async function storeOrder() {

    forceUpdate()
    const token = localStorage.getItem('SYtoken');
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    //console.log(orderData);

    try {
      const response = await axios.post(
        `${API_URL}/store`
        , orderData
        , { headers: headers })

      if (response.data.success === true) {
        console.log('NFT Bought!');
        //console.log('New Order ID: ', response.data.newOrderID);
        orderIDBroker = response.data.newOrderID;
        setInfoMessage('NFT Bought!');
      }
      //setOrderIDBroker(response.data.newOrderID) as unknown as number
      setbrokerData({ ...brokerData.orderIDBroker = orderIDBroker });
    } catch (error) {
      console.log("Error: " + error.code + " " + error.message)
      setProcessing(false)
    }
    setInfoMessage('Processing order...');
    broker_dist();
  }

  async function broker_dist() {

    forceUpdate()
    const token = localStorage.getItem('SYtoken');
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    try {
      const response = await axios.post(
        `${API_URL}/broker_dist`
        , brokerData
        , { headers: headers })

      if (response.data.success === true) {
        console.log('Order has been Confirmed!');
        setProcessing(false)
        Swal.fire({
          icon: 'success',
          title: 'Awesome!!',
          text: 'You bought a Salient Yacht NFT!',
          timer: 4000,
          timerProgressBar: true,
        })
      }
    } catch (error) {
      console.log("Error: " + error.code + " " + error.message)
      setProcessing(false)
    }
  }








  return (
    <Box>

      <Modal
        opened={processing}
        onClose={() => setProcessing(false)}
        zIndex={999999}
        title="Placing Order"
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        {/* Modal content */}
        <Text>
          Please confirm the transaction with your wallet...<br />
          You may have to confirm 2x transactions: <br />
          1. Allow the transfer of USDC for NFTs <br />
          2. Confirm the transaction to MINT NFTs. <br />
        </Text>
        <Group mt={30} position="center">
          <Loader color="violet" size="xl" />
        </Group>
        <Text mt={15}>
          {infoMessage}
        </Text>
      </Modal>

      <Title order={1} color="white" align="center" className="overview" sx={{ margin: '0rem 0 0.5rem' }}>
        Membership Benefits include:
      </Title>
      <Text mb={30} align='center'>
        Gated Access to Members Only Conversation rooms<br />
        Access to Private Tours of Salient Yachts at Boat Shows <br />
        Invitation to Pre-sales, NFT Shares & Events before the public <br />
        - Specific Member Rewards for each NFT - <br />
      </Text>



      <Grid sx={{ display: 'flex', justifyContent: "space-around" }}>
        <Group mt={50} sx={{

          '@media (min-width: 1361px)': {
            width: '350px',
          },
          '@media (max-width: 1360px)': {
            width: '280px',
          },
        }}>
          <Card shadow="sm" p="lg" radius="md" withBorder style={{ boxShadow: "1px -1px 12px 3px #0cfbf8", }}>
            <Title mb={10} order={3} align='center' >
              Common Membership <br /> NFT
            </Title>
            <Group my={15} sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Badge color="cyan" size="xl" variant="filled">
                ${CommonPrice} USDC
              </Badge>

            </Group>
            <Divider my={15} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section>
              <MediaRenderer
                src="ipfs://QmYspPaaDBocDCTppED76fzNKNE1RuoaW7ZGukcJuifRiA/1.mp4"
              />
            </Card.Section>
            <Text align='center' mt={15} >
              Membership Rewards include: <br />
              50 SYP Tokens <br />
              Airdrop at Launch <br />
              <br /><br /><br /><br />
            </Text>
            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Text align='center'>
                Broker / Affiliate Rank
                <Button style={{
                  width: "170px",
                  padding: '5px',
                  marginTop: '5px',
                  marginBottom: '5px',
                  color: 'black',
                  borderRadius: '40px',
                  backgroundColor: '#0288d1',
                  boxShadow: '0 0px 15px #0288d1',
                }}>
                  Standard Broker
                </Button>
              </Text>
            </Group>
            <Divider mt={15} mb={50} size="md" color="#1976d2" sx={{ width: '99%', }} />

            <Card.Section mt={35} mx={20}>
              <Slider
                size="lg"
                radius="lg"
                labelAlwaysOn
                value={CommonQty}
                step={1}
                min={1}
                max={16}
                onChange={setCommonQty} />
            </Card.Section>
            <Card.Section mt={10} mb={15} sx={{ textAlign: 'center' }}>
              <Text  >
                Quantity: {CommonQty} NFTs
              </Text>
              <Badge color="yellow" size="lg" variant="filled" mt={10}>

                Total of ${(CommonQty * CommonPrice).toFixed(0)} USDC
              </Badge>
            </Card.Section>

            {/* <Button fullWidth
            sx={{ display: 'block', fontSize: "1.2rem", mr: '1rem' }}
            disabled={isMinting}
            onClick={() => claimNft({
              to: addressClaim,
              quantity: goldQty,
              tokenId: "0"
            })}>
            {isMinting ? "Minting..." : "Mint NFT"}
          </Button> */}
            <Card.Section my={15} sx={{ display: "flex", justifyContent: 'center' }}>
              <Button mb={20}
                sx={{ fontSize: "1.2rem", }}
                disabled={isMinting}
                onClick={() => mintNFT("5", CommonQty, CommonPrice)}>
                {isMinting ? "Minting..." : "Mint Common NFT"}
              </Button>
            </Card.Section>
          </Card>
        </Group>

        <Group mt={50} sx={{
          '@media (min-width: 1361px)': {
            width: '350px',
          },
          '@media (max-width: 1360px)': {
            width: '280px',
          },
        }}>
          <Card shadow="sm" p="lg" radius="md" withBorder style={{ boxShadow: "1px -1px 12px 3px #0cfbf8", }}>
            <Title mb={10} order={3} align='center' >
              Standard Membership <br /> NFT
            </Title>
            <Group mt={15} sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Badge color="cyan" size="xl" variant="filled">
                ${StandardPrice} USDC
              </Badge>
            </Group>
            <Divider my={15} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section>
              <MediaRenderer
                src="ipfs://QmWWsKhk7qEY1a1uZmfRjyxeT4UdoB2GrkTvuu8tM3oxzT/1.mp4"
                alt="A mp4 video" />
            </Card.Section>
            <Text align='center' mt={15} >
              Membership Rewards include: <br />
              250 SYP Tokens <br />
              Airdrop at Launch <br />
              <br /><br /><br /><br />
            </Text>
            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Text align='center'>
                Broker / Affiliate Rank
                <Button style={{
                  width: "170px",
                  padding: '5px',
                  marginTop: '5px',
                  marginBottom: '5px',
                  color: 'black',
                  borderRadius: '40px',
                  backgroundColor: '#0288d1',
                  boxShadow: '0 0px 15px #0288d1',
                }}>
                  Standard Broker
                </Button>
              </Text>
            </Group>


            <Divider mt={15} mb={50} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section mt={35} mx={20}>
              <Slider
                size="lg"
                radius="lg"
                labelAlwaysOn
                value={StandardQty}
                step={1}
                min={1}
                max={16}
                onChange={setStandardQty} />
            </Card.Section>
            <Card.Section mt={10} mb={15} sx={{ textAlign: 'center' }}>
              <Text  >
                Quantity: {StandardQty} NFTs
              </Text>
              <Badge color="yellow" size="lg" variant="filled" mt={10}>
                Total of ${(StandardQty * StandardPrice).toFixed(0)} USDC
              </Badge>
            </Card.Section>
            <Card.Section my={15} sx={{ display: "flex", justifyContent: 'center' }}>
              <Button mb={20}
                sx={{ fontSize: "1.2rem", }}
                disabled={isMinting}
                onClick={() => mintNFT("4", StandardQty, StandardPrice)}>
                {isMinting ? "Minting..." : "Mint Standard NFT"}
              </Button>
            </Card.Section>
          </Card>
        </Group>

        <Group mt={50} sx={{
          '@media (min-width: 1361px)': {
            width: '350px',
          },
          '@media (max-width: 1360px)': {
            width: '280px',
          },
        }}>
          <Card shadow="sm" p="lg" radius="md" withBorder style={{ boxShadow: "1px -1px 12px 3px #0cfbf8", }}>
            <Title mb={10} order={3} align='center' >
              Bronze Membership <br /> NFT
            </Title>
            <Group mt={15} sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Badge color="cyan" size="xl" variant="filled">
                ${BronzePrice} USDC
              </Badge>
            </Group>

            <Divider my={15} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section>
              <MediaRenderer
                src="ipfs://QmVvPkTSDJJMm8kiY6WdLs6b8ZAQnHCjQYUsHorx2oYJV6/1.mp4"
                alt="A mp4 video" />
            </Card.Section>
            <Text align='center' mt={15} >
              Membership Rewards include: <br />
              1000 SYP Tokens <br />
              Airdrop at Launch <br />
              <br />
              1x Common NFT Share <br />
              Airdropped per Yacht Built <br /> <br />
            </Text>
            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Text align='center'>
                Broker / Affiliate Rank
                <Button style={{
                  width: "170px",
                  padding: '5px',
                  marginTop: '5px',
                  marginBottom: '5px',
                  color: 'black',
                  borderRadius: '40px',
                  backgroundColor: '#0288d1',
                  boxShadow: '0 0px 15px #0288d1',
                }}>
                  Standard Broker
                </Button>
              </Text>
            </Group>
            <Divider mt={15} mb={50} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section mt={35} mx={20}>
              <Slider
                size="lg"
                radius="lg"
                labelAlwaysOn
                value={BronzeQty}
                step={1}
                min={1}
                max={16}
                onChange={setBronzeQty} />
            </Card.Section>
            <Card.Section mt={10} mb={15} sx={{ textAlign: 'center' }}>
              <Text  >
                Quantity: {BronzeQty} NFTs
              </Text>
              <Badge color="yellow" size="lg" variant="filled" mt={10}>
                Total of ${(BronzeQty * BronzePrice).toFixed(0)} USDC
              </Badge>
            </Card.Section>
            <Card.Section my={15} sx={{ display: "flex", justifyContent: 'center' }}>
              <Button mb={20}
                sx={{ fontSize: "1.2rem", }}
                disabled={isMinting}
                onClick={() => mintNFT("3", BronzeQty, BronzePrice)}>
                {isMinting ? "Minting..." : "Mint Bronze NFT"}
              </Button>
            </Card.Section>
          </Card>
        </Group>

        <Group mt={50} sx={{
          '@media (min-width: 1361px)': {
            width: '350px',
          },
          '@media (max-width: 1360px)': {
            width: '280px',
          },
        }}>
          <Card shadow="sm" p="lg" radius="md" withBorder style={{ boxShadow: "1px -1px 12px 3px #0cfbf8", }}>
            <Title mb={10} order={3} align='center' >
              Silver Membership <br /> NFT
            </Title>
            <Group mt={15} sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Badge color="cyan" size="xl" variant="filled">
                ${SilverPrice} USDC
              </Badge>
            </Group>
            <Divider my={15} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section>
              <MediaRenderer
                src="ipfs://QmSePFqueiQgyC9GS9vk6xKg59DdekwsHCzMoVUkZp8PE3/1.mp4"
                alt="A mp4 video" />
            </Card.Section>
            <Text align='center' mt={15} >
              Membership Rewards include: <br />
              2000 SYP Tokens <br />
              Airdrop at Launch <br />
              <br />
              2x Common NFT Shares <br />
              Airdropped per Yacht Built <br /> <br />
            </Text>
            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Text align='center'>
                Broker / Affiliate Rank
                <Button style={{
                  width: "170px",
                  padding: '5px',
                  marginTop: '5px',
                  marginBottom: '5px',
                  fontWeight: '500',
                  color: 'black',
                  borderRadius: '40px',
                  backgroundColor: '#388e3c',
                  boxShadow: '0 0px 15px #388e3c',
                }}>
                  Silver Broker
                </Button>
              </Text>
            </Group>


            <Divider mt={15} mb={50} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section mt={35} mx={20}>
              <Slider
                size="lg"
                radius="lg"
                labelAlwaysOn
                value={SilverQty}
                step={1}
                min={1}
                max={16}
                onChange={setSilverQty} />
            </Card.Section>
            <Card.Section mt={10} mb={15} sx={{ textAlign: 'center' }}>
              <Text  >
                Quantity: {SilverQty} NFTs
              </Text>
              <Badge color="yellow" size="lg" variant="filled" mt={10}>
                Total of ${(SilverQty * SilverPrice).toFixed(0)} USDC
              </Badge>
            </Card.Section>
            <Card.Section my={15} sx={{ display: "flex", justifyContent: 'center' }}>
              <Button mb={20}
                sx={{ fontSize: "1.2rem", }}
                disabled={isMinting}
                onClick={() => mintNFT("2", SilverQty, SilverPrice)}>
                {isMinting ? "Minting..." : "Mint Silver NFT"}
              </Button>
            </Card.Section>
          </Card>
        </Group>

        <Group mt={50} sx={{
          '@media (min-width: 1361px)': {
            width: '350px',
          },
          '@media (max-width: 1360px)': {
            width: '280px',
          },
        }}>
          <Card shadow="sm" p="lg" radius="md" withBorder style={{ boxShadow: "1px -1px 12px 3px #0cfbf8", }}>
            <Title mb={10} order={3} align='center' >
              Golden Membership <br /> NFT
            </Title>
            <Group mt={15} sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Badge color="cyan" size="xl" variant="filled">
                ${goldPrice} USDC
              </Badge>
            </Group>
            <Divider my={15} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section>
              <MediaRenderer
                src="ipfs://QmQtNRLJptrUbDvEpUzUvRfCQFkeJWATZt4finYczwDa3X/1.mp4"
                alt="A mp4 video" />
            </Card.Section>
            <Text align='center' mt={15} >
              Membership Rewards include: <br />
              4000 SYP Tokens <br />
              Airdrop at Launch <br />
              <br />
              5x Common NFT Shares <br />
              Airdropped per Yacht Built <br /> <br />
            </Text>
            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Text align='center'>
                Broker / Affiliate Rank
                <Button style={{
                  width: "170px",
                  padding: '5px',
                  marginTop: '5px',
                  marginBottom: '5px',
                  fontWeight: '700',
                  color: 'black',
                  borderRadius: '40px',
                  backgroundColor: '#ffca28',
                  boxShadow: '0 0px 15px #ffca28',
                }}>
                  Golden Broker
                </Button>
              </Text>
            </Group>
            <Divider mt={15} mb={50} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section mt={35} mx={20}>
              <Slider
                size="lg"
                radius="lg"
                labelAlwaysOn
                value={goldQty}
                step={1}
                min={1}
                max={16}
                onChange={setGoldQty} />
            </Card.Section>
            <Card.Section mt={10} mb={15} sx={{ textAlign: 'center' }}>
              <Text  >
                Quantity: {goldQty} NFTs
              </Text>
              <Badge color="yellow" size="lg" variant="filled" mt={10}>
                Total of ${(goldQty * goldPrice).toFixed(0)} USDC
              </Badge>
            </Card.Section>
            <Card.Section my={15} sx={{ display: "flex", justifyContent: 'center' }}>
              <Button mb={20}
                sx={{ fontSize: "1.2rem", }}
                disabled={isMinting}
                onClick={() => mintNFT("1", goldQty, goldPrice)}>
                {isMinting ? "Minting..." : "Mint Golden NFT"}
              </Button>
            </Card.Section>
          </Card>
        </Group>

        <Group mt={50} sx={{
          '@media (min-width: 1361px)': {
            width: '350px',
          },
          '@media (max-width: 1360px)': {
            width: '280px',
          },
        }}>
          <Card shadow="sm" p="lg" radius="md" withBorder style={{ boxShadow: "1px -1px 12px 3px #0cfbf8", }}>
            <Title mb={10} order={3} align='center' >
              Epic Membership <br /> NFT
            </Title>
            <Group mt={15} sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Badge color="cyan" size="xl" variant="filled">
                ${EpicPrice} USDC
              </Badge>
            </Group>
            <Divider my={15} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section>
              <MediaRenderer
                src="ipfs://QmYZcJTNc5tPwm2A3zzRReaeySwmAhDqtCj6rThtBx42Np/1.mp4"
                alt="A mp4 video" />
            </Card.Section>
            <Text align='center' mt={15} >
              Membership Rewards include: <br />
              9000 SYP Tokens <br />
              Airdrop at Launch <br />
              <br />
              1x Rare NFT Share <br />
              Airdropped per Yacht Built <br /> <br />
            </Text>
            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
              <Text align='center'>
                Broker / Affiliate Rank
                <Button style={{
                  width: "170px",
                  padding: '5px',
                  marginTop: '5px',
                  marginBottom: '5px',
                  fontWeight: '900',
                  color: 'black',
                  borderRadius: '40px',
                  backgroundColor: '#9575cd',
                  boxShadow: '0 0px 15px #9575cd',
                }}>
                  Epic Broker
                </Button>
              </Text>
            </Group>
            <Divider mt={15} mb={50} size="md" color="#1976d2" sx={{ width: '99%', }} />
            <Card.Section mt={35} mx={20}>
              <Slider
                size="lg"
                radius="lg"
                labelAlwaysOn
                value={EpicQty}
                step={1}
                min={1}
                max={16}
                onChange={setEpicQty} />
            </Card.Section>
            <Card.Section mt={10} mb={15} sx={{ textAlign: 'center' }}>
              <Text  >
                Quantity: {EpicQty} NFTs
              </Text>
              <Badge color="yellow" size="lg" variant="filled" mt={10}>
                Total of ${(EpicQty * EpicPrice).toFixed(0)} USDC
              </Badge>
            </Card.Section>
            <Card.Section my={15} sx={{ display: "flex", justifyContent: 'center' }}>
              <Button mb={20}
                sx={{ fontSize: "1.2rem", }}
                disabled={isMinting}
                onClick={() => mintNFT("0", EpicQty, EpicPrice)}>
                {isMinting ? "Minting..." : "Mint Epic NFT"}
              </Button>
            </Card.Section>
          </Card>
        </Group>

      </Grid>
    </Box >





  )



}


