
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import cryptoSailing from "../../Assets/cryptoSailing.jpg";
import { Card, Image, Button, Container, Title,  Grid, Divider } from '@mantine/core';
import React from 'react';
import Footer from '../Info/Footer'



export default function AllYachts() {




  return (

    <div style={{ minHeight: '100vh', width: '100%' }}>
      <Container sx={{maxWidth: "none"}}>
        <Fade duration={2000}>
        <Title order={1} color="white" align="center" className="overview" sx={{ fontSize: "clamp(25px, 35px, 1rem)", }}>
            Crypto Sailing Quest
          </Title>
          <Title order={3} align="center" mb={20}>
          NFT - Web3 Game <br /> Coming soon...
          </Title>
        </Fade>

        <Grid sx={{margin:"0px", justifyContent:"center", width: '1000px', margin: 'auto'}}>
          
        

         
            <Image src={cryptoSailing} mb={20}
              alt="Salient One" />
         

         
        </Grid >
        <Divider sx={{ borderColor: 'primary.main', borderBottomWidth: 3, width: '90%', margin: '1rem' }} />

        <Fade duration={2000}>
          <div className="flex">

          </div>
         
        </Fade>

      </Container >
      <Footer />
    </div >

  )
}
;