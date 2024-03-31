import * as React from 'react';

//import { SALIENT_YACHT_NFT_ADDR, SALIENT_YACHT_NFT_ABI, CHAINLINK_AVAX_USD_ADDR, CHAINLINK_AGGREGATORV3_INTERFACE_ABI } from "../../constants";
import { useState, useEffect, useContext } from "react";

import ImgCommon from '../../Assets/Common.jpg';
import ImgRare from '../../Assets/Rare.jpg';
import ImgUltra from '../../Assets/Ultra.jpg';

import { Accordion, Box, Button, Card, Divider, Group, Loader, Modal, Text, Image, Badge, Slider, Grid } from '@mantine/core';
import BuyClub from './BuyClub';
import BuySportFisherA from './BuySportsFisher';
import { authContext } from '../../context/UserContext';
import { Sailboat } from 'tabler-icons-react';
import { AiOutlineLogin } from 'react-icons/ai';
import { Link } from 'react-router-dom';




export default function SYBuyNFT() {


  const styles = {
    NFT: {
      width: "100%",
      minWidth: '250px',
      maxWidth: "350px",
      resizeMode: 'contain'
    },
  }

  const { auth }: any = useContext(authContext);

  return (


    <Box style={{
      maxWidth: '1300px', opacity: '0.85',

    }}>

      {auth == true ?
        <Accordion variant="separated" chevronPosition="left"  >


          {/* <Accordion.Item value="panel1">
            <Accordion.Control >
              <Text>Buy Salient Yachts Club Membership NFTs (SYC)</Text>
            </Accordion.Control>
            <Accordion.Panel  >
              <BuyClub />

            </Accordion.Panel>
          </Accordion.Item> */}

          <Accordion.Item value="panel2">
            <Accordion.Control >
              <Text>Buy Yacht NFTs for Demo (SYSFA)</Text>
            </Accordion.Control>
            <Accordion.Panel  >
              <BuySportFisherA />

            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="panel3">
            <Accordion.Control
            // onClick={handleChange('panel1')}
            >
              <Text>Buy Salient Yacht NFT Shares (SYNFT1)</Text>
            </Accordion.Control>

            <Accordion.Panel>
            <Text>
              Coming Soon ...
            </Text>
              <Grid sx={{display: 'flex', justifyContent: "space-around"}}>
                <Group mt={50} sx={{

                  '@media (min-width: 1361px)': {
                    width: '350px',
                  },
                  '@media (max-width: 1360px)': {
                    width: '280px',
                  },
                }}>
                  <Card shadow="sm" p="lg" radius="md" withBorder  >
                    <Card.Section>
                      <Image
                        sx={styles.NFT}
                        src={ImgCommon}
                        alt="CommonNFT"
                      />
                    </Card.Section>

                    <Text align='center' component="div">
                      Common NFT
                    </Text>

                    <Text >
                      1 Yacht Share <br /> <br />
                      Includes 2400 WIND <br />
                      Vested over 10 Years<br />
                      0.657098 WIND per Day<br />
                    </Text>

                    <Group mt={15} sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
                      <Badge color="cyan" size="xl" variant="filled">$100 USD</Badge>
                    </Group>
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
                  <Card shadow="sm" p="lg" radius="md" withBorder  >
                    <Card.Section>
                      <Image
                        sx={styles.NFT}
                        src={ImgRare}
                        alt="CommonNFT"
                      />
                    </Card.Section>

                    <Text align='center' component="div">
                      Rare NFT
                    </Text>

                    <Text >
                      10 Yacht Shares <br /> <br />
                      Includes 24 000 WIND <br />
                      Vested over 10 Years<br />
                      6.570977 WIND per Day<br />
                    </Text>

                    <Group mt={15} sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
                      <Badge color="cyan" size="xl" variant="filled">$1000 USD</Badge>
                    </Group>
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
                  <Card shadow="sm" p="lg" radius="md" withBorder  >
                    <Card.Section>
                      <Image
                        sx={styles.NFT}
                        src={ImgUltra}
                        alt="CommonNFT"
                      />
                    </Card.Section>

                    <Text align='center' component="div">
                      Ultra Rare NFT
                    </Text>

                    <Text >
                      100 Yacht Shares <br /> <br />
                      Includes 240 000 WIND <br />
                      Vested over 10 Years<br />
                      65.709768 WIND per Day<br />
                    </Text>

                    <Group mt={15} sx={{ display: 'flex', flexDirection: 'column', AlignItems: "center", JustifyContent: "centre" }}>
                      <Badge color="cyan" size="xl" variant="filled">$10 000 USD</Badge>
                    </Group>
                  </Card>

                </Group>
              </Grid>
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

  );
}

