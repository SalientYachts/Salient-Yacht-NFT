
import React from 'react'
import { Box, Container, Text, Group, Paper,   Badge,   Title, Grid, Card, Button, Divider, } from '@mantine/core';

import Footer from './Footer'
//import { MediaRenderer } from '@thirdweb-dev/react';







export default function BrokerInfo() {






    return (
        <div className="mainContainer2">
            <Container sx={{ maxWidth: "none" }}>


            <Box sx={{ width: 'full', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Title order={1} color="white" align="center" className="overview" sx={{ fontSize: "clamp(25px, 35px, 1rem)", }}>
                    Broker / Affiliate Program
                </Title>

                <Title order={4} align="center" sx={{
                    margin: '2rem 0 1rem',
                     fontSize: "clamp(12px, 38px, 1rem)", color: "white"
                }}>
                    Salient Yachts is looking for Yacht Brokers<br /><br />
                    Become our yacht brokers and earn sales commission on every NFT!<br />
                    Our Affiliate program rewards you from 2.5% to 11 % commission,<br />
                    based on which tokens you hold.<br />

                </Title>

                <Paper withBorder p="md" pb={20} my={30} radius="xl" sx={{
                    boxShadow: "1px -1px 12px 3px #0cfbf8", minWidth: '100%',
                    position: 'relative', backgroundColor: '#25262b',
                }}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-around',
                    }}>
                        <Title order={2} color="white" align="center" className="overview" sx={{ fontSize: "clamp(25px, 35px, 1rem)", }}>
                            Broker Details:
                        </Title>
                        <Title order={5} my={25} align='center'>
                            Create an account on our platform and get your affiliate link.<br />
                            Share this link on social media and with people you know.<br />
                            <br />
                            Every user that signs up, following your link will become your affiliate.<br />
                            You will earn a 'broker' commission for each NFT that your affiliates purchase.<br />
                            The more Tokens you hold, the higher your Broker / Affiliate Rank will be.<br />
                            Each rank has its own commission rates.<br />
                        </Title>
                    </Box>
                </Paper>

                <Grid justify="space-around" sx={{ width: '100%' }}>

                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '240px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '300px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: '230px' }}>
                            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
                                <Button
                                    variant="outline"
                                    style={{
                                        width: "170px",
                                        padding: '5px',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                        color: 'white',
                                        borderRadius: '40px',
                                    }}>
                                    Affiliate
                                </Button>
                                <Text align='center' my={5}>
                                    Starting level <br /><br />
                                    All New Users<br />
                                    are automatically  <br />
                                    granted this role
                                </Text>
                                <Divider size="md" color="#1976d2" sx={{ width: '100%', }} />
                                <Text align='center' >

                                    Commissions:<br /><br />
                                    Level 1 = 2.5%<br />
                                    Level 2 = 1.0%<br />
                                    Level 3 = 0.5%<br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </Text>

                                <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                    Total = 4%
                                </Badge>
                            </Group>
                        </Card>
                    </Group>

                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '240px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '300px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: '230px' }}>
                            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
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
                                <Text align='center' my={5}>
                                    Minimun Token Balance:<br /><br />
                                    ANY Membership NFT<br />
                                    or 100 SYP tokens <br />
                                    or 1 000 WIND tokens <br />
                                </Text>
                                <Divider size="md" color="#1976d2" sx={{ width: '100%', }} />
                                <Text align='center' >

                                    Commissions:<br /><br />
                                    Level 1 = 3.0%<br />
                                    Level 2 = 1.0%<br />
                                    Level 3 = 0.5%<br />
                                    Level 4 = 0.2%<br />
                                    Level 5 = 0.1%<br />
                                    Level 6 = 0.1%<br />
                                    Level 7 = 0.1%<br />
                                </Text>

                                <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                    Total = 5%
                                </Badge>
                            </Group>
                        </Card>
                    </Group>

                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '240px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '300px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: '230px' }}>
                            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
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
                                <Text align='center' my={5}>
                                    Minimun Token Balance:<br /><br />
                                    Silver Membership NFT<br />
                                    or 1 000 SYP tokens <br />
                                    or 10 000 WIND tokens <br />
                                </Text>
                                <Divider size="md" color="#1976d2" sx={{ width: '100%', }} />
                                <Text align='center' >

                                    Commissions:<br /><br />
                                    Level 1 = 3.5%<br />
                                    Level 2 = 1.5%<br />
                                    Level 3 = 0.5%<br />
                                    Level 4 = 0.2%<br />
                                    Level 5 = 0.1%<br />
                                    Level 6 = 0.1%<br />
                                    Level 7 = 0.1%<br />
                                </Text>

                                <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                    Total = 6%
                                </Badge>
                            </Group>
                        </Card>
                    </Group>

                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '240px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '300px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: '230px' }}>
                            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
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
                                <Text align='center' my={5}>
                                    Minimun Token Balance:<br /><br />
                                    Gold Membership NFT<br />
                                    or 2 000 SYP tokens <br />
                                    or 20 000 WIND tokens <br />
                                </Text>
                                <Divider size="md" color="#1976d2" sx={{ width: '100%', }} />
                                <Text align='center' >

                                    Commissions:<br /><br />
                                    Level 1 = 4.0%<br />
                                    Level 2 = 2.0%<br />
                                    Level 3 = 1.0%<br />
                                    Level 4 = 0.5%<br />
                                    Level 5 = 0.2%<br />
                                    Level 6 = 0.2%<br />
                                    Level 7 = 0.1%<br />
                                </Text>

                                <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                    Total = 8%
                                </Badge>
                            </Group>
                        </Card>
                    </Group>

                    <Group mt={30} sx={{
                        '@media (min-width: 1361px)': {
                            width: '240px',
                        },
                        '@media (max-width: 1360px)': {
                            width: '300px',
                        },
                    }}>
                        <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: '230px' }}>
                            <Group sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
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
                                <Text align='center' my={5}>
                                    Minimun Token Balance:<br /><br />
                                    Epic Membership NFT<br />
                                    or 4 000 SYP tokens <br />
                                    or 40 000 WIND tokens <br />
                                </Text>
                                <Divider size="md" color="#1976d2" sx={{ width: '100%', }} />
                                <Text align='center' >

                                    Commissions:<br /><br />
                                    Level 1 = 4.5%<br />
                                    Level 2 = 2.5%<br />
                                    Level 3 = 1.5%<br />
                                    Level 4 = 1.0%<br />
                                    Level 5 = 0.5%<br />
                                    Level 6 = 0.5%<br />
                                    Level 7 = 0.5%<br />
                                </Text>

                                <Badge sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }} color="cyan" size="xl" variant="outline">
                                    Total = 11%
                                </Badge>
                            </Group>
                        </Card>
                    </Group>



                </Grid>
            </Box >
            <Footer />
        </Container >
        </div>
    )
}
