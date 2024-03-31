import * as React from 'react';
import { useState, useEffect, useContext, useRef } from "react";
import { Accordion, Box, Button, Card, Divider, Group, Loader, Modal, Text, Image, Badge, Slider, Grid, Title } from '@mantine/core';
import { authContext } from '../../context/UserContext';
import { Columns, Sailboat } from 'tabler-icons-react';
import { AiOutlineLogin } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../../App.css';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import {
    ConnectButton,
    StreamClaimableAmount,
    StreamClaimButton,
    StreamClaimingProvider,
    StreamRateByTokens,
    StreamEmissionTimeUnit,
    StreamTotalClaimed,
    SwitchChainButton,
    WalletDropdown,
    StreamClaimingStatusBar,
    IfWalletConnected,
    StreamProvider,
    IfWalletNotConnected,
} from "flair-sdk";

const STREAM_CHAIN_ID = "3636";
const STREAM_CONTRACT_ADDRESS = "0x7D1480fed1fDC5eb460b22Ba87d2558b76dA248C";

export default function Claimrewards() {

    const { auth }: any = useContext(authContext);
    const chainId = Number(STREAM_CHAIN_ID);
    const contractAddress = STREAM_CONTRACT_ADDRESS;

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
            <Box style={{
                maxWidth: '1300px', opacity: '0.85',
            }}>

                {auth == true ?
                    <Accordion variant="separated" chevronPosition="left"  >
                        <Accordion.Item value="panel1">
                            <Accordion.Control >
                                <Text>Claim Yacht Demo Rewards (SYSFA)</Text>
                            </Accordion.Control>
                            <Accordion.Panel  >
                                <Title order={1} color="white" align="center" className="overview" sx={{ margin: '0rem 0 0.5rem' }}>
                                    Hachathon Demo:
                                </Title>
                                <Text mb={30} align='center'>
                                    Press the connect button<br />
                                    Connect your wallet<br />
                                    Click the "Change" Button <br />
                                    Enter your token ID's separated by a ","<br />
                                    Click on the cross in the top right<br />
                                    See your rewards due and claim!<br />
                                </Text>
                                <div style={{ display: "flex", justifyContent: "center" }}>




                                <iframe src="https://v1.flair.dev/public/claim/3636/0x7d1480fed1fdc5eb460b22ba87d2558b76da248c" frameBorder="0" width="800px" height="800px"  />
                                    





                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion >
                    :
                    <div style={{ justifyContent: 'center' }}>
                        <p style={{ textAlignLast: 'center' }}>Please login or Register below</p>
                        <Button component={Link} to={"/login"}
                            sx={(theme) => ({
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                                marginTop: '5px',
                                marginBottom: '15px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                display: 'flex',
                                width: '200px',
                                flexDirection: 'column',
                            })} >
                            <AiOutlineLogin size={24} style={{ marginRight: 8 }} />
                            <span>Login</span>
                        </Button>

                        <Button component={Link} to={"/register"}
                            sx={(theme) => ({
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                                marginTop: '5px',
                                marginBottom: '15px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                display: 'flex',
                                width: '200px',
                                flexDirection: 'column',
                            })} >
                            <Sailboat size={24} style={{ marginRight: 8 }} />
                            <span>Register</span>
                        </Button>

                        <Divider size="md" color="#000000" my={20} sx={{ width: '100%', }} />

                    </div>
                }
            </Box >
        </ThirdwebProvider>
    );
}

