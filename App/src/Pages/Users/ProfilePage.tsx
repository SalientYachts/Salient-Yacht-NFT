import { Button, Box, Container, Text, Paper, LoadingOverlay, Group, Select, Modal, Title, Divider, ScrollArea, } from '@mantine/core'
import { useForceUpdate } from '@mantine/hooks';
import { useAddress } from '@thirdweb-dev/react';

import axios from 'axios';
import moment from 'moment'
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineLogin } from 'react-icons/ai';
import { FaRegSave } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Sailboat } from 'tabler-icons-react';
import ChangeUsername from '../../Components/UserPanel/Profile/ChangeUsername'
import { authContext } from '../../context/UserContext';




const API_URL = "https://app.salientyachts.com"

export default function ProfilePage() {

    const [loading, setLoading] = useState(true)
    let navigate = useNavigate()
    const forceUpdate = useForceUpdate();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail]: any = useState();
    const [ref_id, setRef_id]: any = useState();
    const [join_date, setJoin_date]: any = useState();
    const [package_id, setPackage_id]: any = useState();
    const [aff_reg_email, setAff_reg_email]: any = useState();
    const [login_email, setLogin_email]: any = useState();
    const [broker_comm_email, setBroker_comm_email]: any = useState();
    const [wallet_address, setWallet_address]: any = useState();

    const address = useAddress()
    const [addressClaim, setaddressClaim] = useState("")

    useEffect(() => {
        if (address) {
            setaddressClaim(address)
        }
    }, [address]);


    const [data, setData]: any = useState({
        aff_reg_email: '',
        login_email: '',
        broker_comm_email: '',
    })

    const [data2, setData2]: any = useState({
        wallet_address: '',
    })

    useEffect(() => {
        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        axios.get(`${API_URL}/profilesettings`
            , { headers: headers }).then((response) => {

                setUsername(response.data.username)
                setEmail(response.data.email)
                setRef_id(response.data.ref_id)
                setJoin_date(response.data.join_date)
                setPackage_id(response.data.package_id)
                setAff_reg_email(response.data.aff_reg_email)
                setLogin_email(response.data.login_email)
                setBroker_comm_email(response.data.broker_comm_email)
                setWallet_address(response.data.wallet_address)

            });
        setLoading(false)
    }, []);

    const [opened, setOpened] = useState<boolean>()
    const [opened2, setOpened2] = useState(false);
    const [processing, setprocessing] = useState(false);

    const handleSubmit2 = async (e2: any) => {
        e2.preventDefault();
        setprocessing(true)
        setData2(data2.wallet_address = addressClaim)

        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }


        try {
            //console.log(data2)
            const response = await axios.post(
                `${API_URL}/changeaddress`
                , data2
                , { headers: headers })

            if (response.data.success === true) {
                console.log("Saved")
                setprocessing(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: 'Your New address has been saved!',
                    timer: 3000,
                    timerProgressBar: true,
                })
                setLoading(true);
                navigate("/dashboard")
            }

        } catch (err) {
            if (!err?.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No Server Response',
                    footer: 'Please try again!'
                })
            }
            else if (err.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.errors[0].message,
                    footer: 'Please try again!'
                })
            }
            else if (err.response?.status === 422) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.errors[0].message,
                    footer: 'Please try again!'
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login Failed',
                    footer: 'Please try again!'
                })
            }
            setprocessing(false)
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setprocessing(true)
        setData(data.aff_reg_email = aff_reg_email)
        setData(data.login_email = login_email)
        setData(data.broker_comm_email = broker_comm_email)

        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }


        try {
            //console.log(data)
            const response = await axios.post(
                `${API_URL}/changemailsetting`
                , data
                , { headers: headers })

            if (response.data.success === true) {
                console.log("Saved")
                setprocessing(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: 'Your email preferences have been saved!',
                    timer: 3000,
                    timerProgressBar: true,
                })
                setLoading(true);
                navigate("/dashboard")
            }

        } catch (err) {
            if (!err?.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No Server Response',
                    footer: 'Please try again!'
                })
            }
            else if (err.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.errors[0].message,
                    footer: 'Please try again!'
                })
            }
            else if (err.response?.status === 422) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.errors[0].message,
                    footer: 'Please try again!'
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login Failed',
                    footer: 'Please try again!'
                })
            }
            setprocessing(false)
        }
    }
    const { auth }: any = useContext(authContext);

    return (


        <Container px={0} mx={0} sx={{ maxWidth: 'none', }} >

            {auth == true ?
                <Box sx={{ width: 'full', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Title order={4} color="white" align="center" className="overview" sx={{ margin: '0rem 0 0.5rem' }}>
                        My Profile
                    </Title>

                    <Container mt={10} px={0} mx={0}
                        sx={{
                            position: 'relative',
                            '@media (min-width: 1070px)': {
                                width: '700px'
                            },
                            '@media (max-width: 1069px)': {
                                width: '100%',
                            },
                        }} >

                        <Paper withBorder p="md" pb={30} mt={20} radius="xl" sx={{
                            '@media (min-width: 1070px)': {
                                width: '700px',
                            },
                            width: '100%',
                            opacity: '0.85',
                            boxShadow: "1px -1px 12px 3px #0cfbf8",
                            position: 'relative', backgroundColor: '#292b30',
                        }}>

                            <LoadingOverlay visible={loading} overlayBlur={2} radius="xl" zIndex={999} />
                            <Box sx={{

                                '@media (min-width: 770px)': {
                                    display: 'flex', flexDirection: 'row',
                                },
                                '@media (max-width: 769px)': {
                                    display: 'flex', flexDirection: 'column',
                                },

                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }} >

                                <Group sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box>
                                        <Text color='#7346d7' underline size="xl" >Your Details</Text>
                                    </Box>

                                    <Box p={5} >
                                        <>
                                            <Modal
                                                opened={opened}
                                                zIndex={999999}
                                                centered
                                                onClose={() => setOpened(false)}
                                                title="Change Username"

                                            >
                                                {/* Modal content */}
                                                <ChangeUsername setOpened={setOpened} setUsername={setUsername} />
                                            </Modal>
                                        </>
                                        <Divider my="xs" label="Your Username" labelPosition="center" size="md" />
                                        <Group position="center">
                                            <Text >{username}</Text>
                                            <Button variant="outline" onClick={() => setOpened(true)}>Change</Button>
                                        </Group>

                                        <Divider mt={20} my="xs" label="Your Email Address" labelPosition="center" size="md" />
                                        <Group position="center">
                                            <Text >{email}</Text>
                                            {/* <Button variant="outline" onClick={() => setOpened2(true)}>Change</Button> */}
                                        </Group>
                                        <Divider my="xs" size="md" />

                                        <>
                                            <Modal
                                                opened={opened2}
                                                zIndex={999999}
                                                centered
                                                onClose={() => setOpened2(false)}
                                                title="Change Reward Wallet"

                                            >
                                                {/* Modal content */}
                                                <Group sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    <Text sx={{ textAlign: 'center' }}>
                                                        Are you sure you want to change  <br />
                                                        your Reward Wallet from: <br />
                                                        {wallet_address}<br />
                                                        to:<br />
                                                        {address}
                                                    </Text>
                                                    <Button
                                                        loading={processing}
                                                        onClick={(e2: any) => handleSubmit2(e2)}>Yes</Button>
                                                </Group>
                                            </Modal>
                                        </>

                                    </Box>
                                </Group>

                                <Group sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box p={2} sx={{ display: 'contents' }} >
                                        <Text color='#7346d7' underline size="xl" >Account details</Text>
                                        <Text >Join Date</Text>
                                        <Text>{moment(join_date).format('l')}</Text>

                                        {package_id == 1 ?  // Standard Broker
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

                                            : package_id == 2 ? //Silver Broker
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

                                                : package_id == 3 ?   // Gold Broker
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

                                                    :    //Epic Broker
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
                                        }
                                        <Group sx={{ display: 'inline-flex', marginTop: '6px', }}>
                                            <Text align="center" size="sm">
                                                Ref:
                                            </Text>
                                            <Text align="center" size="sm">
                                                {ref_id}
                                            </Text>
                                        </Group>
                                    </Box>
                                </Group>
                            </Box>
                            <Divider my="xs" size="md" />

                            <Group sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Text color='#7346d7' underline size="xl" >Wallet Address for Rewards</Text>
                            
                                <Box sx={{ width: '100%' }}>
                           
                                    <ScrollArea offsetScrollbars scrollbarSize={14} type="always"styles={(theme) => ({
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
                                        <Text my={20} px={15} pt={5} pb={10} sx={{ borderStyle: 'outset', textAlign: 'center', }}>
                                            <Divider label="Your Saved Wallet Address" labelPosition="center" mb={5} />
                                            {wallet_address}</Text>
                                        {address ?
                                            <>
                                                <Text sx={{ textAlign: 'center' }}>
                                                    Your Currenly Connected Address is: <br />
                                                    {address}
                                                </Text>
                                            </>
                                            :
                                            <Text>Please Connect your wallet from the account menu</Text>
                                        }
                                    </ScrollArea>
                                </Box>

                                <Button variant="outline" onClick={() => setOpened2(true)}>Save Current Address</Button>

                            </Group>
                        </Paper>
                    </Container>

                    <Box>
                        <Paper withBorder p="md" pb={30} mt={20} radius="xl" sx={{
                            '@media (min-width: 1070px)': {
                                width: '700px',
                            },
                            width: '100%',
                            opacity: '0.85',
                            boxShadow: "1px -1px 12px 3px #0cfbf8",
                            position: 'relative', backgroundColor: '#292b30',
                        }}>

                            <LoadingOverlay visible={loading} overlayBlur={2} radius="xl" zIndex={999} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >



                                <Text color='#7346d7' underline size="xl" >Email Notification Settings</Text>

                                <Box mt={20} sx={{
                                    display: 'flex',
                                    '@media (min-width: 770px)': {
                                        minWidth: '450px',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    },

                                    '@media (max-width: 769px)': {

                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly',
                                    },
                                }} >
                                    <Text>On New Affiliate Registrations</Text>
                                    <Select data={[
                                        { value: 'YES', label: 'YES' },
                                        { value: 'NO', label: 'NO' }
                                    ]} value={aff_reg_email}
                                        onChange={setAff_reg_email}
                                        sx={{
                                            width: '100px',
                                            textAlignLast: 'center',
                                        }}
                                    />
                                </Box>
                                <Box mt={20} sx={{
                                    display: 'flex',
                                    '@media (min-width: 770px)': {
                                        minWidth: '450px',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    },

                                    '@media (max-width: 769px)': {

                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly',
                                    },
                                }} >
                                    <Text>On New Broker Earnings (Commisions)</Text>
                                    <Select data={[
                                        { value: 'YES', label: 'YES' },
                                        { value: 'NO', label: 'NO' }
                                    ]} value={broker_comm_email}
                                        onChange={setBroker_comm_email}
                                        sx={{
                                            width: '100px',
                                            textAlignLast: 'center',
                                        }}
                                    />
                                </Box>
                                <Box mt={20} sx={{
                                    display: 'flex',
                                    '@media (min-width: 770px)': {
                                        minWidth: '450px',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    },

                                    '@media (max-width: 769px)': {

                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly',
                                    },
                                }} >
                                    <Text>On Account Login</Text>
                                    <Select data={[
                                        { value: 'YES', label: 'YES' },
                                        { value: 'NO', label: 'NO' }
                                    ]} value={login_email}
                                        onChange={setLogin_email}
                                        sx={{
                                            width: '100px',
                                            textAlignLast: 'center',
                                        }}
                                    />
                                </Box>
                                <Button
                                    leftIcon={<FaRegSave />}
                                    loading={processing}
                                    onClick={(e: any) => handleSubmit(e)}
                                    sx={{
                                        marginTop: '30px', width: 'fit-content', background:
                                            'linear-gradient(90deg, rgb(241, 198, 255) -16.66%, rgb(189, 10, 248) 24.05%, rgb(54, 92, 252) 99.31%), rgba(255, 255, 255, 0.25)', '&:hover': {
                                                transform: 'scale(1.1)',
                                            },
                                    }}>

                                    Save Changes
                                </Button>
                            </Box>


                        </Paper>

                    </Box>
                </Box>
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
        </Container >
    )
}


