import * as React from 'react';
import { Button, Container, Title, Text, Paper, Group, Box, Grid, Card, Badge, Modal, Loader, Divider, Slider } from '@mantine/core'
import Footer from './Footer';
//import { MediaRenderer } from '@thirdweb-dev/react';

import ResponsivePlayerLoop from "../../Components/video/ResponsivePlayerLoop"

import {
    ChainId,
    useNetwork,
    useEditionDrop,
    useAddress,
    useNetworkMismatch,
    ConnectWallet,
} from "@thirdweb-dev/react";

import { useState, useEffect, useContext, } from "react";

import Swal from 'sweetalert2';
import axios from 'axios';
import { useForceUpdate } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { authContext } from '../../context/UserContext';



const API_URL = "https://app.salientyachts.com"




export default function MembershipNFT() {

    const forceUpdate = useForceUpdate();
    const isOnWrongNetwork = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();
    const [isMinting, setIsMinting] = useState(false)
    const { auth, }: any = useContext(authContext);

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
        ref_id: '075843',
        nftname: 'SYClub',
        salevalue: '1.00',
        noOfNfts: '1',
        nftType: '0',
        nftTxnAmount: '0.0123',
        nftTxnResult: 'hash etc',
        txid: '0x...',
        buyerAddress: '0x...',

    });

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


    //const sourceSaved = localStorage.getItem('source');




    const mintNFT = async (nftType: any, noOfNfts: any, nftPrice: any) => {
        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        let ref_idSaved = localStorage.getItem('ref_id');
        if (ref_idSaved == null || ref_idSaved == undefined) {
            ref_idSaved = '075843'
        }

        // Make sure the user has their wallet connected.
        if (!address) {
            setProcessing(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No Wallet Connected',
                footer: 'Please Connect your wallet at the top of the page!',
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
            const ref_idSaved2: any = ref_idSaved
            // Capture order and commssions
            const txidResult: any = receipt?.transactionHash
            const valueofsale: any = (noOfNfts * nftPrice)
            //console.log("----> Sale Value = ", valueofsale)
            //console.log("----> nftTxnResult = ", receipt);
            console.log("----> TXID = ", txidResult);

            setOrderData({ ...orderData.ref_id = ref_idSaved2 });
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
                `${API_URL}/store2`
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
                `${API_URL}/broker_dist2`
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



        <div className="mainContainer">
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

            <Container sx={{ maxWidth: "none" }}>


                <Group className='walletconnect' sx={{ justifyContent: 'center' }} >
                    <ConnectWallet theme="dark" />
                </Group>
                <Divider my={15} size="md" color="#000000" sx={{ width: '100%', }} />


                <Title order={1} color="white" align="center" className="overview" sx={{ fontSize: "clamp(25px, 35px, 1rem)", }}>
                    Membership NFTs
                </Title>

                <Title order={4} align="center" sx={{
                    margin: '2rem 0 1rem', fontSize: "clamp(12px, 38px, 1rem)", color: "white"
                }}>
                    Salient Yachts is utilizing Membership NFTs in order to crowd fund project development.<br />Effectively allowing our own community to become our strategic partners <br /> Proceeds from sales will go directly into completing "Salient One"
                </Title>




                <Paper withBorder p="md" pb={20} my={30} radius="xl" sx={{
                    boxShadow: "1px -1px 12px 3px #0cfbf8",
                    position: 'relative', backgroundColor: '#25262b',
                }}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-around',
                    }}>
                        <Title order={2} color="white" align="center" className="overview" sx={{ fontSize: "clamp(25px, 35px, 1rem)", }}
                        //sx={{ margin: '0rem 0 0.5rem' }}
                        >
                            Membership Benefits include:
                        </Title>
                        <Title order={5} mt={25} align='center'>
                            Gated Access to Members Only Conversation rooms<br />
                            Access to Private Tours of Salient Yachts at Boat Shows <br />
                            Invitation to Pre-sales, NFT Shares & Events before the public <br />
                            - Specific Member Rewards for each NFT - <br /><br />
                            Double the NFT value in SYP Tokens after IDO<br />
                            Shares in each yacht we build for life!
                        </Title>
                    </Box>
                </Paper>

                <Grid sx={{display: 'flex', justifyContent: "space-around"}}>
                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '350px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '280px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Title mb={10} order={3} align='center'>
                                Epic Membership <br /> NFT
                            </Title>
                            <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                $4 000 USDC
                            </Badge>
                            <Text align='center' my={15}>
                                Rarity: 0.51%<br />
                                NFT QTY: 50 NFTs </Text>

                            <Card.Section>
                                <ResponsivePlayerLoop url="https://youtube.com/shorts/a0dpF6Z5ZZ0?feature=share"
                                    //alt="A mp4 video"
                                    aplay={true} />
                            </Card.Section>
                            <Text align='center' mt={15}>
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

                            {auth == true ?
                                <div style={{ display: "flex", justifyContent: 'center' }}>
                                    <Button
                                        component={Link} to={"/buynfts"}
                                        mb={20}
                                        sx={{ fontSize: "1.2rem", }}>
                                        Buy Now
                                    </Button>
                                </div>
                                :
                                <div>
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
                                </div>
                            }
                        </Card>
                    </Group>

                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '350px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '280px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Title mb={10} order={3} align='center'>
                                Gold Membership<br /> NFT
                            </Title>
                            <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                $2 000 USDC
                            </Badge>
                            <Text align='center' my={15}>
                                Rarity: 1.03%<br />
                                NFT QTY: 100 NFTs </Text>

                            <Card.Section>
                                <ResponsivePlayerLoop url="https://youtube.com/shorts/gCdkUWSjsbY?feature=share"
                                    //alt="A mp4 video"
                                    aplay={true} />
                            </Card.Section>
                            <Text align='center' mt={15}>
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
                            {auth == true ?
                                <div style={{ display: "flex", justifyContent: 'center' }}>
                                    <Button
                                        component={Link} to={"/buynfts"}
                                        mb={20}
                                        sx={{ fontSize: "1.2rem", }}>
                                        Buy Now
                                    </Button>
                                </div>
                                :
                                <div>
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
                                </div>
                            }
                        </Card>
                    </Group>

                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '350px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '280px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Title mb={10} order={3} align='center'>
                                Silver Membership<br /> NFT
                            </Title>
                            <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                $1 000 USDC
                            </Badge>
                            <Text align='center' my={15}>
                                Rarity: 2.05%<br />
                                NFT QTY: 200 NFTs </Text>

                            <Card.Section>
                                <ResponsivePlayerLoop url="https://youtube.com/shorts/3b4ZnwkSvR0?feature=share"
                                    //alt="A mp4 video"
                                    aplay={true} />
                            </Card.Section>
                            <Text align='center' mt={15}>
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
                            {auth == true ?
                                <div style={{ display: "flex", justifyContent: 'center' }}>
                                    <Button
                                        component={Link} to={"/buynfts"}
                                        mb={20}
                                        sx={{ fontSize: "1.2rem", }}>
                                        Buy Now
                                    </Button>
                                </div>
                                :
                                <div>
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
                                </div>
                            }
                        </Card>
                    </Group>


                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '350px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '280px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Title mb={10} order={3} align='center'>
                                Bronze Membership<br /> NFT
                            </Title>
                            <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                $500 USDC
                            </Badge>
                            <Text align='center' my={15}>
                                Rarity: 4.10%<br />
                                NFT QTY: 400 NFTs </Text>

                            <Card.Section>
                                <ResponsivePlayerLoop url="https://youtube.com/shorts/O1tZTvK7HJw?feature=share"
                                    //alt="A mp4 video"
                                    aplay={true} />
                            </Card.Section>
                            <Text align='center' mt={15}>
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
                            {auth == true ?
                                <div style={{ display: "flex", justifyContent: 'center' }}>
                                    <Button
                                        component={Link} to={"/buynfts"}
                                        mb={20}
                                        sx={{ fontSize: "1.2rem", }}>
                                        Buy Now
                                    </Button>
                                </div>
                                :
                                <div>
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
                                </div>
                            }
                        </Card>
                    </Group>

                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '350px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '280px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Title mb={10} order={3} align='center'>
                                Standard Membership<br /> NFT
                            </Title>
                            <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                $100 USDC
                            </Badge>
                            <Text align='center' my={15}>
                                Rarity: 20.51%<br />
                                NFT QTY: 2000 NFTs </Text>

                            <Card.Section>
                                <ResponsivePlayerLoop url="https://youtube.com/shorts/EhqSc2pIlTw?feature=share"
                                    //alt="A mp4 video"
                                    aplay={true} />
                            </Card.Section>
                            <Text align='center' mt={15}>
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
                            {auth == true ?
                                <div style={{ display: "flex", justifyContent: 'center' }}>
                                    <Button
                                        component={Link} to={"/buynfts"}
                                        mb={20}
                                        sx={{ fontSize: "1.2rem", }}>
                                        Buy Now
                                    </Button>
                                </div>
                                :
                                <div>
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
                                </div>
                            }
                        </Card>
                    </Group>

                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '350px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '280px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Title mb={10} order={3} align='center'>
                                Common Membership <br /> NFT
                            </Title>
                            <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                $25 USDC
                            </Badge>
                            <Text align='center' my={15}>
                                Rarity: 71.79%<br />
                                NFT QTY: 7000 NFTs </Text>

                            <Card.Section>
                                <ResponsivePlayerLoop url="https://youtube.com/shorts/gyU7exw0vJk?feature=share"
                                    //alt="A mp4 video"
                                    aplay={true} />
                            </Card.Section>
                            <Text align='center' mt={15}>
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
                            {auth == true ?
                                <div style={{ display: "flex", justifyContent: 'center' }}>
                                    <Button
                                        component={Link} to={"/buynfts"}
                                        mb={20}
                                        sx={{ fontSize: "1.2rem", }}>
                                        Buy Now
                                    </Button>
                                </div>
                                :
                                <div>
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
                                    <Card.Section my={15} sx={{ display: "flex", justifyContent: 'center' }}>
                                        <Button mb={20}
                                            sx={{ fontSize: "1.2rem", }}
                                            disabled={isMinting}
                                            onClick={() => mintNFT("5", CommonQty, CommonPrice)}>
                                            {isMinting ? "Minting..." : "Mint Common NFT"}
                                        </Button>
                                    </Card.Section>
                                </div>
                            }
                        </Card>
                    </Group>


                </Grid>


            </Container><Footer />
        </div>

    )
}
;