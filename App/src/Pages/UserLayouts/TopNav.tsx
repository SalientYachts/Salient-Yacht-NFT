import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Text, ActionIcon, Stack, Container, Anchor, Box, CopyButton, Input, Button, Group, MantineProvider, } from '@mantine/core';
import logo from '../../Assets/logo.png'
import { BsTextCenter, BsTextLeft } from 'react-icons/bs'
import { useMediaQuery } from '@mantine/hooks';
import { FiShare2 } from 'react-icons/fi';
import { HiClipboardCheck, HiClipboardCopy } from 'react-icons/hi';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../context/UserContext';
import { useForceUpdate } from '@mantine/hooks'




export default function TopNav({ toggleCollapsed, collapsed, }: {
  toggleCollapsed: any;
  collapsed: any;
}) {


  const forceUpdate = useForceUpdate();
  const { auth }: any = useContext(authContext);
  const DiffIcon = collapsed ? BsTextLeft : BsTextCenter;
  const scrollmedia = useMediaQuery('(min-width: 800px)');
  const [value, setValue] = useState('')



  useEffect(() => {
    forceUpdate()
    const ref_id = localStorage.getItem('ref_id');
    setValue(`${window?.location.protocol}//${window?.location.hostname}/invite?src=direct&ref=${ref_id}`)
  }, []);


  return (

    <Container
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        marginTop: '4px',
        marginBottom: '5px',
        maxWidth: 'none',
        display: "flex",
        '@media (max-width: 800px)': { flexDirection: "column" },
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
      })}
    >
      <MantineProvider
        inherit
        theme={{
          components: {
            InputWrapper: {
              styles: (theme) => ({
                label: {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)',
                },
              }),
            },

            Input: {
              styles: (theme) => ({
                input: { borderColor: theme.colors.violet[theme.fn.primaryShade()] },
              }),
            },
          },
        }}
      >

        <Stack sx={{ flexDirection: 'row', alignItems: 'center', }}>

          <ActionIcon color='white' mr={5} onClick={toggleCollapsed}>
            <DiffIcon size={28} stroke={'1.5'} />
          </ActionIcon>

          <Anchor component={RouterLink} to="/" >
            {scrollmedia === true ?
              <img src={logo} alt="Logo" height={90} />
              :
              <img src={logo} alt="Logo" height={70} />
            }
          </Anchor>

          <Text sx={{
            color: "#1fc7d3",
            //color: "#7346d7",
            alignItems: "left",
            fontSize: "1.75rem",
            fontWeight: 'bold',
            marginleft: "0.5rem",
            '@media (max-width: 769px)': {
              fontSize: "24px",
            },
          }}>
            Salient Yachts
            <Text sx={{
              color: "#1fc7d3",
              //color: "#7346d7",
              alignItems: "center",
              fontSize: "1rem",
              fontWeight: 'bold',
              '@media (max-width: 769px)': {
                fontSize: "16px",
              },

            }}>
              Offshore Living
            </Text>
          </Text>

        </Stack>
        {scrollmedia == true &&
          <div>
            {auth == true &&
              <Box sx={{
                display: 'flex', alignItems: 'center',
                flexDirection: 'column',
              }}  >
                <Text mb={2} style={{ fontSize: '1.2rem', fontWeight: 'semibold' }}>
                  Direct Invitation link
                </Text>
                <Group sx={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  flexDirection: 'row', maxWidth: '350px', flexWrap: 'nowrap'
                }}  >
                  <Input value={value}
                    icon={<FiShare2 />}
                    readOnly
                    placeholder=''
                    radius="lg"
                    size="md"
                    sx={{ width: '100%', }}
                  />

                  <CopyButton
                    value={value}
                    timeout={3000}

                  >
                    {({ copied, copy }) => (
                      <Button
                        radius="xl"
                        leftIcon={copied ? <HiClipboardCheck size={16} /> : <HiClipboardCopy size={16} />}
                        color={copied ? 'teal' : 'blue'} onClick={copy}>
                        {copied ? 'Done ' : 'Copy'}

                      </Button>
                    )}
                  </CopyButton>
                </Group>
              </Box>

            }
          </div>
        }

      </MantineProvider>
    </Container >


  );
}