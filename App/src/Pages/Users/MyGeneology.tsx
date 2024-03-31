
import * as React from 'react'
import { useState, useEffect, createRef, useContext } from 'react'
import Geneology from '../../Components/UserPanel/Geneology/Geneology';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { AiOutlineDownload, AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { useScreenshot, createFileName } from "use-react-screenshot";
import { Paper, Box, Container, Text, Group, CopyButton, Input, Skeleton, LoadingOverlay, ActionIcon, MantineProvider, Switch, Button, Divider, Title, } from '@mantine/core';

import axios from 'axios';
import { HiClipboardCheck, HiClipboardCopy } from 'react-icons/hi';
import { FiShare2 } from 'react-icons/fi';

import 'regenerator-runtime/runtime'
import { useForceUpdate } from '@mantine/hooks';
import { authContext } from '../../context/UserContext';

import { Sailboat } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai';




const API_URL = "https://app.salientyachts.com"



export default function MyGeneology() {
    const forceUpdate = useForceUpdate();

    const [value, setValue] = useState('')
    const [dataSource, setDataSource]: any = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        axios.get(
            `${API_URL}/my_geneology`
            , { headers: headers })
            .then((response) => {

                setDataSource(response.data.dataSource)
                setValue(`${window?.location.protocol}//${window?.location.hostname}/invite?src=direct&ref=${response.data.dataSource.ref_id}`)

                setLoading(false)
            });

    }, []);

    const { auth }: any = useContext(authContext);
    // const WIDTH = 70;
    // const HEIGHT = 80;
    const screen = useFullScreenHandle();

    //console.log('Updated Data source: ', dataSource)

    const ref = createRef()
    const [, takeScreenShot] = useScreenshot({
        type: "image/jpeg",
        quality: 1.0
    });

   
    const download = (image: string, { name = "geneology", extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
        return
    };

    const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

    useEffect(() => {
        console.log('dataSource: ', screen)
    }, [screen])

    const [enableZoom, setEnableZoom] = useState(true)

    return (

        <Container px={0} mx={0} sx={{ maxWidth: 'none', }}>
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
                {auth == true ?
                    <div>
                        <Box sx={{ width: 'full', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Title order={4} color="white" align="center" className="overview" sx={{ margin: '0rem 0 0.5rem' }}>
                                My Geneology
                            </Title>
                        </Box>

                        <FullScreen handle={screen}>
                            <Paper withBorder p="md" pb={30} mt={20} radius="xl" sx={{
                                boxShadow: "1px -1px 12px 3px #0cfbf8",
                                opacity: '0.85',
                                position: 'relative', backgroundColor: '#292b30',
                            }}>

                                <Box mx={25} sx={{
                                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                                }}>
                                    <Group>
                                        <Text>
                                            Enable Zooming
                                        </Text>

                                        <Switch size="md" color="dark" onLabel="OFF" offLabel="ON"
                                            onChange={() => setEnableZoom(!enableZoom)} />
                                    </Group>

                                    <Group>
                                        <ActionIcon variant="filled" onClick={downloadScreenshot}>
                                            <AiOutlineDownload size={16} />
                                        </ActionIcon>

                                        {screen.active == false
                                            ? <ActionIcon variant="filled" onClick={screen.enter}>
                                                <AiOutlineFullscreen size={16} />
                                            </ActionIcon>
                                            : <ActionIcon variant="filled" onClick={screen.exit}>
                                                <AiOutlineFullscreenExit size={16} />
                                            </ActionIcon>
                                        }
                                    </Group>
                                </Box>

                                <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

                                <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: '80vh', rounded: 'base', shadow: 'base', overflow: 'auto', }} >

                                    <LoadingOverlay visible={loading} overlayBlur={2} radius="xl" zIndex={999} />

                                    <Box sx={{ display: 'contents', position: 'absolute' }} ref={ref as React.RefObject<HTMLDivElement>}>

                                        {dataSource?.children?.length
                                            ? <Geneology enableZoom={enableZoom} dataSource={dataSource} />
                                            : <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                                                <Text sx={{ size: 'xl', fontWeight: 'bold', color: 'gray', }}>
                                                    Your geneology is empty
                                                </Text>
                                                <Text sx={{ size: 'md', color: 'gray', marginBottom: '10px', }}>
                                                    Start sharing your invitation link to make your geneology
                                                </Text>

                                                <Box mb={15} sx={{
                                                    width: '100%', display: 'flex', alignItems: 'center',
                                                    flexDirection: 'row', maxWidth: '850px',
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
                                                            <Button sx={{ marginLeft: '25px', }}
                                                                radius="xl"
                                                                leftIcon={copied ? <HiClipboardCheck size={16} /> : <HiClipboardCopy size={16} />}
                                                                color={copied ? 'teal' : 'blue'} onClick={copy}>
                                                                {copied ? 'Done ' : 'Copy'}

                                                            </Button>
                                                        )}
                                                    </CopyButton>

                                                </Box>

                                            </Box>
                                        }
                                    </Box>
                                </Box>
                            </Paper>
                        </FullScreen>
                    </div>
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
            </MantineProvider>
        </Container >
    )
}
