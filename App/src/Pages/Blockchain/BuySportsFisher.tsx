import * as React from 'react';
import { useState, useEffect } from "react";
import { Accordion, Badge, Box, Card, Image, Group, Progress, Loader, Slider, Modal, Button, Text, Title, Grid, Divider } from '@mantine/core';
import Swal from 'sweetalert2';
import axios from 'axios';
import {

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
  ThirdwebProvider,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import { useForceUpdate } from '@mantine/hooks';


const API_URL = "https://app.salientyachts.com"


export default function BuySportFisherA() {


  return (


    <ThirdwebProvider
      activeChain={{
        // === Required information for connecting to the network === \\
        chainId: 3636, // Chain ID of the network
        // Array of RPC URLs to use
        rpc: ["https://3636.rpc.thirdweb.com"],

        // === Information for adding the network to your wallet (how it will appear for first time users) === \\
        // Information about the chains native currency (i.e. the currency that is used to pay for gas)
        nativeCurrency: {
          decimals: 18,
          name: "BTC",
          symbol: "BTC",
        },
        shortName: "BTC", // Display value shown in the wallet UI
        slug: "BTC", // Display value shown in the wallet UI
        testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
        chain: "Botanix Testnet", // Name of the network
        name: "Botanix Testnet", // Name of the network
      }}
    >
      <Box>
        <Title order={1} color="white" align="center" className="overview" sx={{ margin: '0rem 0 0.5rem' }}>
          SportsFisher Build Slot A:
        </Title>
        <Text mb={30} align='center'>
          This NFT collection represents the DEmo yacht for the hackathon<br />
          Each NFT receives  a 24% APR Reward Stream <br /> plus Airdrop bonuses from time to time.
        </Text>

        <iframe
    src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0xc73474d234B6677CE2f56B416A0536c00fE7F1f6&chain=%7B%22name%22%3A%22Botanix+Testnet%22%2C%22chain%22%3A%22BOTANIX%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F3636.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Botanix%22%2C%22symbol%22%3A%22BTC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22BTNX%22%2C%22chainId%22%3A3636%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22botanix-testnet%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmVE5s2pXiqdMnAcxhAmWkZYhpFB5CysypeLyPKzT4rGYe%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=8cc34ea2f2929e0f07eaeded02963d98&theme=dark&primaryColor=purple"
    width="800px"
    height="600px"
    
    frameBorder="0"
></iframe>

      </Box >
    </ThirdwebProvider>
  )
}


