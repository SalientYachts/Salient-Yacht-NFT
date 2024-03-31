
import { Fade } from "react-awesome-reveal";
import Footer from './Footer';
import salienty64c from "../../Assets/tsalienty64c.jpg";
import SYP from '../../Assets/logo/SYP.png'
import wind3d from '../../Assets/logo/Wind3D.jpg'
import TokenTable from './TokenTable'
import TokenChart from '../../Assets/tokenchart.jpg'
import React from 'react';

import { Card, Image, Paper, Grid, Container, Divider, Title, Text, Group, SimpleGrid } from '@mantine/core';

export default function Tokenomics() {
  return (

    <div className="mainContainer">
      <Container sx={{ maxWidth: "95%" }}>

        <Fade duration={2000}>
          <Title className="overview" align="center" sx={{

            fontSize: "clamp(25px, 35px, 1rem)",
            color: "white",

          }}>
            Tokens & Assets Information
          </Title>
        </Fade>

        <Fade duration={2000}>
          <Text sx={{ fontWeight: "700" }}
            color="white"
            align="center" >
            This is where we will display the total supply, circulating supply, liquidity and token Buyback / Repurchase values
          </Text>
        </Fade>

        <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

        <Fade duration={2000}>
          <Grid justify="center">

            <Group sx={{ maxWidth: "350px" }}>
              <Card sx={{ boxShadow: "1px -1px 12px 3px #0cfbf8", maxWidth: "350px", margin: "15px" }}>
                <Text sx={{ marginTop: "10px", component: "div", textAlign: "center", fontFamily: 'Aclonica', fontSize: "clamp(12px, 1.5vw, 1.5rem)", }}>
                  Native Token <br /> ERC-20
                </Text>
                <Card.Section>
                  <Image src={SYP} alt="Salient SYP" />
                </Card.Section>
                <Text style={{ color: "#90f3ff" }} sx={{
                  margin: "10px 5px 0px 5px", component: "div", textAlign: "center", fontFamily: 'Aclonica', colour: "green", fontSize: "clamp(12px, 2vw, 1.3rem)", '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}>S Y P</Text>
              </Card>
              <Text sx={{ fontWeight: 'bold', textAlign: "center", fontFamily: 'default', fontSize: "clamp(15px, 1.3vw, 1rem)", width: "100%", }}>
                SYP is a governance token <br />
                which is LIMITED in supply.<br />
                It is used for voting on <br />
                company decisions such as <br />
                building the next yacht <br />
                for sale or for fractonal ownership. <br />
                It is rewarded via staking <br />
                WIND until SYP supply is reached.
              </Text>
            </Group>


            <Group sx={{ maxWidth: "350px" }}>
              <Card sx={{ boxShadow: "1px -1px 12px 3px #0cfbf8", maxWidth: "350px", margin: "15px" }}>
                <Text sx={{ marginTop: "10px", component: "div", textAlign: "center", fontFamily: 'Aclonica', fontSize: "clamp(12px, 1.5vw, 1.5rem)", }}>
                  NFT Asset <br /> ERC-721
                </Text>
                <Card.Section>
                  <Image src={salienty64c} alt="Salient NFT" />
                </Card.Section>
                <Text style={{ color: "#90f3ff" }} sx={{
                  margin: "10px 5px 0px 5px", component: "div", textAlign: "center", fontFamily: 'Aclonica', colour: "green", fontSize: "clamp(12px, 2vw, 1.3rem)", '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}>
                  N F T
                </Text>
              </Card>
              <Text sx={{ fontWeight: 'bold', textAlign: "center", fontFamily: 'default', fontSize: "clamp(15px, 1.3vw, 1rem)", width: "100%", }}>
                Yacht ownership is authenticated <br />
                through the NFT contract  <br />
                created for the asset <br />
                which will have the <br />
                Title Registration of the yacht <br />
                added as metadata to the <br />
                NFT collection once built. <br /> <br />
              </Text>
            </Group>




            <Group sx={{ maxWidth: "350px" }}>
              <Card sx={{ boxShadow: "1px -1px 12px 3px #0cfbf8", maxWidth: "350px", margin: "15px" }}>
                <Text sx={{ marginTop: "10px", component: "div", textAlign: "center", fontFamily: 'Aclonica', fontSize: "clamp(12px, 1.5vw, 1.5rem)", }}>
                  Reward Token <br /> ERC-20
                </Text>
                <Card.Section>
                  <Image src={wind3d} alt="Salient WIND" />
                </Card.Section>
                <Text style={{ color: "#90f3ff" }} sx={{
                  margin: "10px 5px 0px 5px", component: "div", textAlign: "center", fontFamily: 'Aclonica', colour: "green", fontSize: "clamp(12px, 2vw, 1.3rem)", '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}>WIND</Text>
              </Card>
              <Text sx={{ fontWeight: 'bold', textAlign: "center", fontFamily: 'default', fontSize: "clamp(15px, 1.3vw, 1rem)", width: "100%", }}>
                Our rewards program, <br />
                which powers us forward <br />
                and keeps the yachts sailing! <br />
                This reward is automatically <br />
                distributed at a continuous rate<br />
                of 12% per year, <br />
                for a period of 10 years <br /> <br />
              </Text>

            </Group>
          </Grid>
        </Fade>
      </Container>

      <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

      <Fade duration={2000}>
        <Title className="overview" align="center" sx={{
          fontSize: "clamp(25px, 35px, 1rem)",
          color: "white",

        }}>
          SYP Distribution
        </Title>
      </Fade>

      <Fade duration={2000}>
        <Text align="center" sx={{
          margin: '2rem 0 2rem',
          fontSize: "clamp(16px, 30px, 0.9rem)",
          color: "white",
          fontWeight: 'bold',
        }}>
          A launch sale value of: 1 SYP = 1 USD. <br />
          The SYP token has a fixed and limited supply of 10 000 000. <br />

          This will be used for our governance program. <br />
          <br />
          Initial sale will consist of 4 800 000 SYP (48%) available for Memberships, private and public sales. <br />
          The Team will keep 1 000 000 SYP (10%) vested over a 10 year period (stream).<br />
          The Liquidity Pools will get 400 000 (4%) locked for 5 years<br />
          The Yacht NFTs will get 3% (300 000) as Bonus for the first 5 yachts built (3 SYP per NFT share)<br />
          The remaining 3 500 000 (35%) will be used for staking WIND
        </Text>
      </Fade>

      <Fade duration={2000}>
        <Grid justify="center">

          <Paper sx={{
            background: "rgba(31,144,187,0.7)",
            border: "6px solid #fff",
            boxSizing: "border-box",
            boxShadow: "0px 5px 12px rgba(0,56,73,0.25)",
            borderRadius: "37px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1rem",
            width: "100%",
            minWidth: "250px",
            maxWidth: "30%",
            margin: "10px",
          }}>
            <Text sx={{
              '@media (min-width: 770px)': {
                margin: "15px 15px 0px 15px",
              },

              '@media (max-width: 769px)': {
                //margin: "5px 5px 0px 5px",
              },
              component: "div", textAlign: "center", fontFamily: 'Aclonica', fontSize: "clamp(12px, 1.5vw, 1.5rem)",
            }}>
              Public Sale
            </Text>

            <Text style={{ color: "#FFDB8B" }} sx={{
              //margin: "5px 5px 0px 5px",
              component: "div",
              textAlign: "center",
              fontFamily: 'Aclonica',

              '@media (min-width: 770px)': {
                fontSize: "clamp(12px, 35px, 2.5rem)",
              },

              '@media (max-width: 769px)': {
                fontSize: "clamp(12px, 35px, 1.5rem)",
              },
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}>
              $1.5M
            </Text></Paper>

          <Paper sx={{
            background: "rgba(31,144,187,0.7)",
            border: "6px solid #fff",
            boxSizing: "border-box",
            boxShadow: "0px 5px 12px rgba(0,56,73,0.25)",
            borderRadius: "37px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1rem",
            width: "100%",
            minWidth: "250px",
            maxWidth: "30%",
            margin: "10px",
          }}>
          <Text sx={{
            '@media (min-width: 770px)': {
              margin: "15px 15px 0px 15px",
            },

            '@media (max-width: 769px)': {
              //margin: "5px 5px 0px 5px",
            },
            component: "div", textAlign: "center", fontFamily: 'Aclonica', fontSize: "clamp(12px, 1.5vw, 1.5rem)",
          }}>
              Total supply
            </Text>

            <Text style={{ color: "#FFDB8B" }} sx={{
              //margin: "5px 5px 0px 5px",
              component: "div",
              textAlign: "center",
              fontFamily: 'Aclonica',

              '@media (min-width: 770px)': {
                fontSize: "clamp(12px, 35px, 2.5rem)",
              },

              '@media (max-width: 769px)': {
                fontSize: "clamp(12px, 35px, 1.5rem)",
              },
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}>
              10'000'000
            </Text></Paper>

          <Paper sx={{
            background: "rgba(31,144,187,0.7)",
            border: "6px solid #fff",
            boxSizing: "border-box",
            boxShadow: "0px 5px 12px rgba(0,56,73,0.25)",
            borderRadius: "37px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1rem",
            width: "100%",
            minWidth: "250px",
            maxWidth: "30%",
            margin: "10px",
          }}>
          <Text sx={{
            '@media (min-width: 770px)': {
              margin: "15px 15px 0px 15px",
            },

            '@media (max-width: 769px)': {
              //margin: "5px 5px 0px 5px",
            },
            component: "div", textAlign: "center", fontFamily: 'Aclonica', fontSize: "clamp(12px, 1.5vw, 1.5rem)",
          }}>
              Initial Price
            </Text>

            <Text style={{ color: "#FFDB8B" }} sx={{
              //margin: "5px 5px 0px 5px",
              component: "div",
              textAlign: "center",
              fontFamily: 'Aclonica',

              '@media (min-width: 770px)': {
                fontSize: "clamp(12px, 35px, 2.5rem)",
              },

              '@media (max-width: 769px)': {
                fontSize: "clamp(12px, 35px, 1.5rem)",
              },
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}>
              $1
            </Text></Paper>
        </Grid>


        <span>&nbsp;</span>


        <Container sx={{ maxWidth: "95%" }}>
          <SimpleGrid
            breakpoints={[
              { minWidth: 761, cols: 2, spacing: 'md' },
              { maxWidth: 1200, cols: 1, spacing: 'sm' },
            ]}>
            <Group sx={{ maxWidth: "750px" }}>
              <img src={TokenChart} alt="Token Chart" className="mainImage" />
            </Group>
            <Group sx={{ maxWidth: "750px" }}>
              <TokenTable />
            </Group>
          </SimpleGrid>
        </Container>
      </Fade>

      <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

      <Fade duration={2000}>
        <Title className="overview" align="center" sx={{
          fontSize: "clamp(25px, 35px, 1rem)",
          color: "white",

        }}>
          WIND Token Distribution
        </Title>
      </Fade>

      <Fade duration={2000}>
        <Text align="center" sx={{
          margin: '2rem 0 2rem',
          fontSize: "clamp(12px, 30px, 0.9rem)",
          fontWeight: 'bold',
          color: "white",
        }}>
          A launch sale value of 1 WIND = 0.10 USD.<br />
          The WIND token supply is minted on limited bases in proportion to the value of the assets we produce. <br />
          Each NFT asset will mint a vested amount of WIND according to the current average WIND price and yacht model price at the time of minting. <br />
          Each NFT has a built in vesting period, releasing WIND tokens continuously over 10 years at a rate 12% APR.
        </Text>
      </Fade>

      <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

      <Footer />

    </div>





  )
};