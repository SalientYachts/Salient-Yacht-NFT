import axios from 'axios'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, Container, Paper, LoadingOverlay, useMantineTheme, Title, ScrollArea, Button, Divider, } from '@mantine/core';
import Footer from '../Info/Footer'
import UsersList from '../../Components/UserPanel/Dashboard/UsersList'
import UsersLevels from '../../Components/UserPanel/Dashboard/UserLevels'
import { useForceUpdate } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { Sailboat } from 'tabler-icons-react';
import { AiOutlineLogin } from 'react-icons/ai';
import { authContext } from '../../context/UserContext';



const API_URL = "https://app.salientyachts.com"



export default function MyNetwork() {

    const [loading, setLoading] = useState(true)
    const forceUpdate = useForceUpdate();
    const [childUsers, setChildUsers]: any = useState();
    const [levels, setLevels] = useState();
    const [user, setUser]: any = useState();

    useEffect(() => {

        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        axios.get(`${API_URL}/my_network`
            , { headers: headers }).then((response) => {

                setChildUsers(response.data.childUsers)
                setLevels(response.data.levels)
                setUser(response.data.user)

                setLoading(false)

            });
    }, []);


    const { auth }: any = React.useContext(authContext);

    const theme = useMantineTheme();

    return (
        <Container px={0} mx={0} sx={{ maxWidth: 'none', }} >
            {auth == true ?
                <Box sx={{ width: 'full', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Title order={1} color="white" align="center" className="overview" sx={{ margin: '0rem 0 0.5rem' }}>
                        My Network
                    </Title>

                    <Container mt={10} px={0} mx={0}
                        sx={{ position: 'relative', 
                        '@media (min-width: 1150px)': {
                            width: '780px'
                        },
                        '@media (max-width: 1149px)': {
                            width: '100%',
                        }, }} >

                        <Paper withBorder p="md" pb={30} mt={20} radius="xl" sx={{
                            boxShadow: "1px -1px 12px 3px #0cfbf8", opacity: '0.85',
                            position: 'relative', backgroundColor: '#292b30',
                        }}>
                            <LoadingOverlay visible={loading} overlayBlur={2} radius="xl" zIndex={999} />
                       
                            <ScrollArea offsetScrollbars scrollbarSize={14}
                                sx={{
                                    
                                }} >
                                {loading == false ?
                                    <UsersLevels levels={levels} user={user} />
                                    : <p>please wait...</p>
                                }
                            </ScrollArea>
                        </Paper>


                        <Paper withBorder p="md" pb={30} mt={20} radius="xl" sx={{
                            boxShadow: "1px -1px 12px 3px #0cfbf8", opacity: '0.85',
                            position: 'relative', backgroundColor: '#292b30',
                        }}>
                            <LoadingOverlay visible={loading} overlayBlur={2} radius="xl" zIndex={999} />
                       
                            <ScrollArea offsetScrollbars scrollbarSize={14} type="always"
                                styles={(theme) => ({
                                    height: '580px',
                                    scrollbar: {
                                        '&, &:hover': {
                                            background:
                                                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                        },

                                        '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                                            backgroundColor: theme.colors.red[6],
                                        },

                                        '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
                                            backgroundColor: theme.colors.blue[6],
                                        },
                                    },

                                    corner: {
                                        opacity: 1,
                                        background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                    },
                                })}>
                                {loading == false ?
                                    <UsersList userList={childUsers} />
                                    : <p>please wait...</p>
                                }
                            </ScrollArea>
                        </Paper>
                    </Container >
                </Box >
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

            <Footer />
        </Container >

    )
}

