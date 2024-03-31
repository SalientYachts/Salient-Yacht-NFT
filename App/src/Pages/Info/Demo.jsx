
import React from 'react'
import { Box, Container, Text, Paper, Title, Image, } from '@mantine/core';



import Footer from '../Info/Footer';
import slide1 from "../../Assets/demo/1.png"
import slide2 from "../../Assets/demo/2.png"
import slide3 from "../../Assets/demo/3.png"
import slide4 from "../../Assets/demo/4.png"
import slide5 from "../../Assets/demo/5.png"
import slide6 from "../../Assets/demo/6.png"
import slide7 from "../../Assets/demo/7.png"






export default function Roadmap() {





    return (
        <Container px={0} mx={0} sx={{ maxWidth: 'none', }} >


            <Box sx={{ width: 'full', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Title order={1} color="white" align="center" className="overview" sx={{ margin: '0rem 0 0.5rem' }}>
                    App Demo
                </Title>
                <Text color="white" size="md">
                    A quick demo of the Broker / Affiliate Account, showing images of the app
                </Text>

                <Paper withBorder p="md" pb={20} my={30} radius="xl" sx={{
                    boxShadow: "1px -1px 12px 3px #0cfbf8",
                    position: 'relative', backgroundColor: '#25262b',
                }}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center',
                        width: '950px',
                        //justifyContent: 'space-around',
                    }}>

                        
                            <Image src={slide1} />
                            <Image src={slide2} />
                            <Image src={slide3} />
                            <Image src={slide4} />
                            <Image src={slide5} />
                            <Image src={slide6} />
                            <Image src={slide7} />
                            {/* ...other slides */}
                       

                    </Box>
                </Paper>
            </Box >
            <Footer />
        </Container >
    )
}
