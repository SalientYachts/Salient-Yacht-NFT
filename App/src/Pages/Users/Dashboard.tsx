
import axios from 'axios'
import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import ReferralClipboard from '../../Components/UserPanel/Dashboard/ReferralClipboard'
import InvitationClicks from '../../Components/UserPanel/Charts/InvitationClicks'
import InvitationRegistrations from '../../Components/UserPanel/Charts/InvitationRegistrations'
import { createStyles, Progress, Box, Container, Text, Group, Paper, SimpleGrid, ThemeIcon, Badge, LoadingOverlay, Input, MantineProvider, CopyButton, Button, Divider, Title, UnstyledButton } from '@mantine/core';
import { BsBoxArrowInUpRight, BsBoxArrowDownRight, BsBoxArrowInDownRight } from 'react-icons/bs'
import { TbDeviceAnalytics } from 'react-icons/tb';
import Swal from 'sweetalert2'

import Footer from '../Info/Footer'
import { FiShare2 } from 'react-icons/fi'
import { HiClipboardCheck, HiClipboardCopy } from 'react-icons/hi'

import { authContext } from "../../context/UserContext"
import { Link as RouterLink, useNavigate, } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai'
import { Sailboat } from 'tabler-icons-react'
import { useForceUpdate } from '@mantine/hooks'






const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

const API_URL = "https://app.salientyachts.com"




const useStyles = createStyles((theme) => ({
    progressLabel: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        fontSize: theme.fontSizes.sm,
    },

    stats: {
        borderBottom: '3px solid',
        paddingBottom: 5,
    },

    statCount: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.3,
    },

    diff: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        display: 'flex',
        alignItems: 'center',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },
}));



export default function Dashboard() {
    const forceUpdate = useForceUpdate();

    const { auth }: any = useContext(authContext);

    const [loading, setLoading] = useState(true)
    const [updating, setupdating] = useState(false)

    const [authUsername, setAuthUsername]: any = useState();
    const [shareLinks, setShareLinks]: any = useState();
    const [childUsers, setChildUsers]: any = useState();
    const [childdiff, setChilddiff]: any = useState(0);
    const [displaytag1, setdisplaytag1]: any = useState(false);
    const [displaytag2, setdisplaytag2]: any = useState(false);
    const [clicks, setClicks]: any = useState();
    const [clicksdiff, setClicksdiff]: any = useState(0);
    const [value, setValue] = useState('')
    const [ref_id, setRef_id]: any = useState();
    const [clicksByShareLinks, setClicksByShareLinks]: any = useState();

    const source: any = 'direct'

    const [shareLinkName1, setShareLinkName1]: any = useState();
    const [shareLinknumers1, setShareLinknumers1]: any = useState(0);
    const [shareLinkName2, setShareLinkName2]: any = useState();
    const [shareLinknumers2, setShareLinknumers2]: any = useState(0);
    const [shareLinkName3, setShareLinkName3]: any = useState();
    const [shareLinknumers3, setShareLinknumers3]: any = useState(0);

    useEffect(() => {

        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }


        axios.get(`${API_URL}/userdashboard`
            , { headers: headers }).then((response) => {

                setAuthUsername(response.data.authUsername)
                setShareLinks(response.data.userShareLinks)
                setChildUsers(response.data.childUsers)
                setClicks(response.data.clicks)
                setRef_id(response.data.ref_id)
                setClicksByShareLinks(response.data.clicksByShareLinks)

                if ((response.data.clicksByShareLinks.length) > 0) {
                    setShareLinkName1(response.data.clicksByShareLinks[0].source)
                    setShareLinknumers1(response.data.clicksByShareLinks[0].total)
                }

                if ((response.data.clicksByShareLinks.length) > 1) {
                    setdisplaytag1(true)
                    setShareLinkName2(response.data.clicksByShareLinks[1].source)
                    setShareLinknumers2(response.data.clicksByShareLinks[1].total)
                }
                if ((response.data.clicksByShareLinks.length) > 2) {
                    setdisplaytag2(true)
                    setShareLinkName3(response.data.clicksByShareLinks[2].source)
                    setShareLinknumers3(response.data.clicksByShareLinks[2].total)
                }

                setValue(`${window?.location.protocol}//${window?.location.hostname}/invite?src=${source}&ref=${response.data.ref_id}`)

                setLoading(false)

            });
    }, []);

    const [showAdvance, setShowAdvance] = useState(false)
    const [showAdvance2, setShowAdvance2] = useState(false)

    const updateShareLinks = () => {

        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        axios.post(`${API_URL}/update_share_link`
            , { shareLinks }
            , { headers: headers })
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Your changes have been saved!',
            timer: 2000,
            timerProgressBar: true,
        })
        setupdating(false)
    }

    const { classes } = useStyles();
    const DiffIcon = clicksdiff > 0 ? BsBoxArrowInUpRight : BsBoxArrowInDownRight;
    const DiffIcon2 = childdiff > 0 ? BsBoxArrowInUpRight : BsBoxArrowInDownRight;

    const shareLinknumers4: any = (clicks - shareLinknumers3 - shareLinknumers2 - shareLinknumers1)
    const percentL1: number = ((shareLinknumers1 / clicks) * 100)
    const percentL2: number = ((shareLinknumers2 / clicks) * 100)
    const percentL3: number = ((shareLinknumers3 / clicks) * 100)
    const percentL4: number = ((shareLinknumers4 / clicks) * 100)

    let navigate = useNavigate()



    return (
        <Container px={0} mx={0} sx={{ maxWidth: 'none', }} >
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
                            <Title order={4} color="white" align="center" className="overview" mb={10} sx={{ fontSize: "clamp(25px, 35px, 1rem)", }}>
                                Dashboard
                            </Title>

                            <Box sx={{
                                '@media (min-width: 950px)': { display: 'flex', flexDirection: 'row', alignItems: 'center' },
                                '@media (max-width: 949px)': { display: 'flex', flexDirection: 'column', alignItems: 'center' },
                            }}>
                                <Title order={4} color='#00ffff' sx={{ display: 'inline-flex' }} >
                                    Hello
                                </Title>
                                <Text color='white' style={{ alignSelf: 'center', fontWeight: '700', fontSize: '1.3rem', marginRight: '10px', marginLeft: '10px', }} >
                                    {authUsername}!
                                </Text>
                                <Title order={4} color='#00ffff' sx={{ display: 'inline-flex' }}>
                                    Welcome to your Broker dashboard
                                </Title>
                            </Box>

                            <Container mt={10} px={0} mx={0} sx={{ position: 'relative', width: '100%' }} >

                                <Paper withBorder p="md" pb={30} mt={20} radius="xl" sx={{
                                    boxShadow: "1px -1px 12px 3px #0cfbf8", opacity: '0.85',
                                    position: 'relative', backgroundColor: '#292b30',
                                }}>
                                    <LoadingOverlay visible={loading} overlayBlur={2} radius="xl" zIndex={999} />
                                    <Group sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-evenly', }} >

                                        <Group sx={{ gap: '2px', display: 'flex', flexDirection: 'column', }}>
                                            <div>
                                                <Text mb={10} color="dimmed" transform="uppercase" weight={700} size="xs" sx={{textAlign: 'center'}} >
                                                    TOTAL <br/>REFERRAL CLICKS
                                                </Text>
                                                <UnstyledButton px={30}
                                                    sx={{
                                                        //margin: '0.5rem 0 0.5rem',
                                                        width: '-webkit-fill-available !important',
                                                        height: "70px",
                                                        fontSize: '2.5rem',
                                                        textAlign: 'center',
                                                        color: '#ffffff',
                                                        borderRadius: '40px',
                                                        background:
                                                            'linear-gradient(90deg, rgb(241, 198, 255) -16.66%, rgb(189, 10, 248) 24.05%, rgb(54, 92, 252) 99.31%), rgba(255, 255, 255, 0.25)', '&:hover': {
                                                                transform: 'scale(1.2)',
                                                            },
                                                    }}>
                                                    {clicks}
                                                </UnstyledButton>
                                            </div>
                                            <ThemeIcon color="gray" variant="light" size={30} radius="md"
                                                sx={(theme) => ({ color: clicksdiff > 0 ? theme.colors.teal[6] : theme.colors.red[6] })} >
                                                <DiffIcon size={20} stroke={'1.5'} />
                                            </ThemeIcon>

                                            <Text color="dimmed" size="sm" mt={0}>
                                                <Text component="span" color={clicksdiff > 0 ? 'teal' : 'red'} weight={700}>
                                                    {clicksdiff}%
                                                </Text>{' '}
                                                {clicksdiff > 0 ? 'increase' : 'decrease'} compared to last month
                                            </Text>
                                        </Group>

                                        <Group sx={{ gap: '2px', display: 'flex', flexDirection: 'column', }}>
                                            <div>
                                                <Text mb={10} color="dimmed" transform="uppercase" weight={700} size="xs" sx={{textAlign: 'center'}} >
                                                    TOTAL <br/> REGISTRATIONS
                                                </Text>
                                                <UnstyledButton px={30}
                                                    sx={{
                                                        //margin: '0.5rem 0 0.5rem',
                                                        width: '-webkit-fill-available !important',
                                                        height: "70px",
                                                        fontSize: '2.5rem',
                                                        textAlign: 'center',
                                                        color: '#ffffff',
                                                        borderRadius: '40px',
                                                        background:
                                                            'linear-gradient(90deg, rgb(241, 198, 255) -16.66%, rgb(189, 10, 248) 24.05%, rgb(54, 92, 252) 99.31%), rgba(255, 255, 255, 0.25)', '&:hover': {
                                                                transform: 'scale(1.2)',
                                                            },
                                                    }}>
                                                    {childUsers}
                                                </UnstyledButton>
                                            </div>
                                            <ThemeIcon color="gray" variant="light" size={30} radius="md"
                                                sx={(theme) => ({ color: childdiff > 0 ? theme.colors.teal[6] : theme.colors.red[6] })} >
                                                <DiffIcon2 size={20} stroke={'1.5'} />
                                            </ThemeIcon>

                                            <Text color="dimmed" size="sm" mt={0}>
                                                <Text component="span" color={childdiff > 0 ? 'teal' : 'red'} weight={700}>
                                                    {childdiff}%
                                                </Text>{' '}
                                                {childdiff > 0 ? 'increase' : 'decrease'} compared to last month
                                            </Text>
                                        </Group>
                                    </Group>

                                    <Progress
                                        //@ts-ignore
                                        sections={[
                                            //@ts-ignore
                                            { value: percentL1, color: '#2F9E44', label: `${shareLinkName1}` },
                                            { value: percentL2, color: '#FAB005', label: `${shareLinkName2}` },
                                            { value: percentL3, color: 'blue', label: `${shareLinkName3}` },
                                            { value: percentL4, color: 'red', label: 'Others' },
                                        ]}
                                        size={34}
                                        classNames={{ label: classes.progressLabel }}
                                        mt={15}
                                    />
                                    <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'xs', cols: 1 }]} mt="xl">

                                        <Box sx={{ borderBottomColor: '#2F9E44' }} className={classes.stats}>
                                            <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
                                                {shareLinkName1}
                                            </Text>
                                            <Group position="apart" align="flex-end" spacing={0}>
                                                <Text weight={700}>{shareLinknumers1}{" "}Clicks </Text>
                                                <Text color='#2F9E44' weight={700} size="sm" className={classes.statCount}>
                                                    {percentL1.toFixed(1)}%
                                                </Text>
                                            </Group>
                                        </Box>

                                        {displaytag1 === true &&
                                            <>
                                                <Box sx={{ borderBottomColor: '#FAB005' }} className={classes.stats}>
                                                    <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
                                                        {shareLinkName2}
                                                    </Text>
                                                    <Group position="apart" align="flex-end" spacing={0}>
                                                        <Text weight={700}>{shareLinknumers2}{" "}Clicks </Text>
                                                        <Text color='#FAB005' weight={700} size="sm" className={classes.statCount}>
                                                            {percentL2.toFixed(1)}%
                                                        </Text>
                                                    </Group>
                                                </Box>

                                                {displaytag2 === true &&
                                                    <Box sx={{ borderBottomColor: 'blue' }} className={classes.stats}>
                                                        <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
                                                            {shareLinkName3}
                                                        </Text>
                                                        <Group position="apart" align="flex-end" spacing={0}>
                                                            <Text weight={700}>{shareLinknumers3}{" "}Clicks </Text>
                                                            <Text color='blue' weight={700} size="sm" className={classes.statCount}>
                                                                {percentL3.toFixed(1)}%
                                                            </Text>
                                                        </Group>
                                                    </Box>
                                                }

                                                <Box sx={{ borderBottomColor: 'red' }} className={classes.stats}>
                                                    <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
                                                        Others
                                                    </Text>
                                                    <Group position="apart" align="flex-end" spacing={0}>
                                                        <Text weight={700}>{shareLinknumers4}{" "}Clicks </Text>
                                                        <Text color='red' weight={700} size="sm" className={classes.statCount}>
                                                            {percentL4.toFixed(1)}%
                                                        </Text>
                                                    </Group>
                                                </Box>
                                            </>
                                        }

                                    </SimpleGrid>

                                    <Box sx={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                                        justifyContent: 'center', width: '100%', marginTop: '20px'
                                    }}>
                                        <Button onClick={() => setShowAdvance2(!showAdvance2)}>{!showAdvance2 ? 'Show All Share links' : 'Hide All Share links'} </Button>
                                    </Box>


                                    {
                                        showAdvance2 &&
                                        <Container px={0} mx={0} mt={20} sx={{
                                            display: 'flex', alignItems: 'center', flexWrap: 'wrap',
                                            flexDirection: 'row', justifyContent: 'center', width: '100%',
                                        }}>

                                            {clicksByShareLinks.map((link: any, index: any) =>
                                                <Button sx={{
                                                    margin: '10px', color: 'white',
                                                }} >
                                                    <Text key={index} >
                                                        {link.source}:
                                                    </Text>
                                                    <Text ml={2} >
                                                        {link.total}

                                                    </Text>
                                                </Button>
                                            )}

                                        </Container>
                                    }

                                </Paper>
                            </Container>

                        </Box >

                        <Container mt='30px' px={0} mx='auto' sx={{
                            maxWidth: '1200px',
                            width: 'full', display: 'flex', justifyContent: 'space-evenly',
                        }} >


                            <SimpleGrid sx={{ width: '100%' }}
                                cols={2}
                                spacing="lg"
                                breakpoints={[
                                    { maxWidth: 960, cols: 1, spacing: 'sm' },
                                ]}
                            >
                                <Group sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '500px' }} mt='30px'>
                                    <InvitationClicks />
                                </Group>

                                <Group sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '500px' }} mt='30px'>
                                    <InvitationRegistrations />
                                </Group>

                            </SimpleGrid>

                        </Container>

                        <Container px={0} mx='auto' sx={{
                            position: 'relative',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center',
                        }} mt='20px' pt='25px' pb='20px' >
                            <Paper withBorder p="md" radius="xl" sx={{
                                backgroundColor: '#292b30', opacity: '0.85',
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                boxShadow: "1px -1px 12px 3px #0cfbf8",
                            }}>
                                <LoadingOverlay visible={loading} overlayBlur={2} radius="xl" zIndex={999} />

                                <Text mb={2} style={{ fontSize: '1.5rem', fontWeight: 'semibold' }}>
                                    Invitation links
                                </Text>

                                <Text mb={5} color='gray.500'>
                                    Share your affiliate links to promote your Brokerage and earn rewards!
                                </Text>

                                <Box mb={15} sx={{
                                    width: '100%', display: 'flex', alignItems: 'center',
                                    flexDirection: 'row',
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

                                <Button onClick={() => setShowAdvance(!showAdvance)}>{!showAdvance ? 'Show Custom Links' : 'Hide Custom Links'} </Button>

                                {showAdvance && <Container px={0} mx={0} sx={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    justifyContent: 'center', width: '100%',
                                }}>
                                    <Container px={0} mx={0} py={8} sx={{
                                        width: '100%', display: 'flex', justifyContent: 'center',
                                        flexDirection: 'column', alignItems: 'center',
                                    }}>

                                        <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

                                        <Text mb={10} >
                                            Customise your links (must be seperated with comma)
                                        </Text>

                                        <Box sx={{
                                            width: '100%', display: 'flex', alignItems: 'center',
                                            flexDirection: 'column',
                                        }}  >
                                            <Input
                                                value={shareLinks}
                                                onChange={(e: any) => setShareLinks(e.target.value)}
                                                placeholder=''
                                                size="md"
                                                sx={{ width: '100%', backgroundColor: '#000000', border: '2px', }}
                                            />

                                            <Button sx={{
                                                marginTop: '10px', borderRadius: '10px', color: 'whitesmoke',
                                                width: '150px',

                                                background:
                                                    'linear-gradient(90deg, rgb(241, 198, 255) -16.66%, rgb(189, 10, 248) 24.05%, rgb(54, 92, 252) 99.31%), rgba(255, 255, 255, 0.25)', '&:hover': {
                                                        transform: 'scale(1.2)',
                                                    },
                                            }}
                                                loading={updating}
                                                onClick={() => {
                                                    setupdating(true)
                                                    updateShareLinks()
                                                }}

                                            >
                                                Update
                                            </Button>
                                        </Box>

                                        <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

                                    </Container>

                                    {shareLinks.split(',').map((lnk: any, index: any) =>
                                        lnk && <Box key={index} sx={{
                                            width: '100%', display: 'flex', alignItems: 'center',
                                            flexDirection: 'column',
                                        }}>
                                            <Group sx={{ width: '100%', display: 'flex', flexDirection: 'row', }}>
                                                <Button color="success" >
                                                    {lnk}
                                                </Button>

                                                <ReferralClipboard key={index} source={lnk} ref_id={ref_id} />

                                            </Group>
                                        </Box>)
                                    }
                                </Container>
                                }

                            </Paper>
                        </Container >
                    </div>
                    :

                    <div style={{ justifyContent: 'center' }}>
                        <p style={{ textAlignLast: 'center' }}>Please login or Register below</p>
                        <Button component={RouterLink} to={"/login"}
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

                        <Button component={RouterLink} to={"/register"}
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
            </MantineProvider>
        </Container >
    )
}
