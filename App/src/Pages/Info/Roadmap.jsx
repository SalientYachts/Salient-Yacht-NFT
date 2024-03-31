
import React from 'react'
import {Box, Container, Text, Paper,  Title, Timeline, Divider, } from '@mantine/core';

import Footer from '../Info/Footer';






export default function Roadmap() {






    return (
        <Container px={0} mx={0} sx={{ maxWidth: 'none', }} >


            <Box sx={{ width: 'full', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Title order={1} color="white" align="center" className="overview" sx={{  fontSize: "clamp(25px, 35px, 1rem)", }}>
                    Roadmap & Goals
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

                        <Timeline active={8} bulletsize={24} linewidth={2}>
                            <Timeline.Item
                                //bullet={<IconGitBranch size={12} />}
                                title="Purchase of Molds">
                                <Text color="dimmed" size="sm">
                                    We purchased production molds and components to manufacture the yachts
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q1 2021
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconGitCommit size={12} />} 
                                title="Partial Completion of 'Salient One">
                                <Text color="dimmed" size="sm">
                                    Partial completion of "Salient One"
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q2 2021
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconGitCommit size={12} />} 
                                title="Sea Trial of 'Salient One'">
                                <Text color="dimmed" size="sm">
                                    Partially completed "Salient One" for initial sea trial<br />
                                    approx 850nm
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q3 2021
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconGitPullRequest size={12} />} 
                                title="Project Development"
                            >
                                <Text color="dimmed" size="sm">
                                    Established initial website and project development
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q4 2021
                                </Text>
                            </Timeline.Item>

                            <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="Code review" >
                                <Text color="dimmed" size="sm">
                                    Entered project in Hackathons for peer reviews
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q1 2022
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="App Development" >
                                <Text color="dimmed" size="sm">
                                    Further App development and Membership NFT product testing
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q2 2022
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="Community Brokerage" >
                                <Text color="dimmed" size="sm">
                                    Broker / Affiliate development for marketing and rewards
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q3 2022
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="Initial Launch" >
                                <Text color="dimmed" size="sm">
                                    Initial Product launch with strategic partners
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q3 2022
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="Grow Community"
                                lineVariant="dashed" >
                                <Text color="dimmed" size="sm">
                                    Create product awareness and community growth in preparation for LaunchPad
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q4 2022
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="Initial Fundraising"
                                lineVariant="dashed" >
                                <Text color="dimmed" size="sm">
                                    Generate $300 000 in Membership NFT / token sales <br/>
                                    Proceeds from sales will go towards completion of "Salient One"
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q4 2022
                                </Text>
                            </Timeline.Item>

                            <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="SYNFT1 - NFT sale of shares in our First Charter Yacht"
                                lineVariant="dashed" >
                                <Text color="dimmed" size="sm">
                                    Open sales for NFTs of our first Fractional Ownership Charter Yacht
                                    <br/>Once 50% is Minted, a Governance Vote will be established
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q1 2023
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="Governance Vote"
                                lineVariant="dashed" >
                                <Text color="dimmed" size="sm">
                                    Once 50% of NFTs have been sold from SYNFT1<br />
                                    Governance Vote for whether "Salient One" is to be sold<br />
                                    or used for the first Charter Yacht?
                                </Text>
                                <Text size="xs" mt={4}>
                                    2023
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="Yacht Shows"
                                lineVariant="dashed" >
                                <Text color="dimmed" size="sm">
                                    Send Salient One to various yachts shows
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q3 2023
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="SYNFT2"
                                lineVariant="dashed" >
                                <Text color="dimmed" size="sm">
                                    Open sales for NFTs of the next Fractional Ownership Charter Yacht
                                </Text>
                                <Text size="xs" mt={4}>
                                    Q3 2023
                                </Text>
                            </Timeline.Item>

                            <Timeline.Item
                                //bullet={<IconMessageDots size={12} />}
                                title="Expand Production"
                                lineVariant="dashed" >
                                <Text color="dimmed" size="sm">
                                    Expand Production to build 3 yachts per year
                                </Text>
                                <Text size="xs" mt={4}>
                                     2024
                                </Text>
                            </Timeline.Item>

                        </Timeline>
                    </Box>
                </Paper>
            </Box >
            <Footer />
        </Container >
    )
}
