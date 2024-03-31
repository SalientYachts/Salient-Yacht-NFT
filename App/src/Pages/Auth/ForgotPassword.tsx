import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
} from '@mantine/core';
import axios from 'axios';
import { FaCheck, FaTimes,  } from 'react-icons/fa'
import * as React from 'react' 
import { useState, useEffect, useRef, } from 'react';
import { Link as RouterLink, useNavigate, } from 'react-router-dom';
import Swal from 'sweetalert2'
import { BsArrowLeftSquare } from 'react-icons/bs';
import { useForceUpdate } from '@mantine/hooks';



const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 26,
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column-reverse',
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            width: '100%',
            textAlign: 'center',
        },
    },
}));


const emailRegex = /\S+@\S+\.\S+/

const API_URL = "https://app.salientyachts.com"


export default function ForgotPassword() {
    
    const forceUpdate = useForceUpdate();
    const { classes } = useStyles();

    const [validEmail, setValidEmail] = useState(false);
    const [processing, setprocessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [data, setData]: any = useState({
        email: '',
    })

    useEffect(() => {
        setValidEmail(emailRegex.test(data.email));
    }, [data.email])


    const handleSubmit = async (e: any) => {
        
        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        e.preventDefault();
        setprocessing(true)
        //console.log(data)
        try {
            const response = await axios.post(
                `${API_URL}/forgotpasswordsend`
                , data
                , { headers: headers })

            if (response.data.error === true) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.errormessage,
                    footer: 'Please try again!'
                })
                console.log(response.data.errormessage)
                setprocessing(false)

            }
            if (response.data.success === true) {
                console.log("Password Reset Sent")
                setprocessing(false);
                setSuccess(true);
            }

        } catch (err) {
            //console.log(err.response.data.errors[0].message);
            //console.log(err.response.data);
            // console.log('Error', err.message);

            if (!err?.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No Server Response',
                    footer: 'Please try again!'
                })
                //setErrMsg('No Server Response');
            }
            else if (err.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.errors[0].message,
                    footer: 'Please try again!'
                })
                //setErrMsg(err.response.data.errors[0].message);
            }
            else if (err.response?.status === 422) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.errors[0].message,
                    footer: 'Please try again!'
                })
                //setErrMsg(err.response.data.errors[0].message);
                // console.log(err.response);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login Failed',
                    footer: 'Please try again!'
                })
                //setErrMsg('Login Failed')
                //  console.log('Error', err.message);
            }
            setprocessing(false)
        }
    }



    const DiffIcon2 = validEmail ? FaCheck : FaTimes;



    return (
        <Container size={460} my={30}>
            <Title className="overview" align="center">
                Forgot your password?
            </Title>
            <Text color="dimmed" size="md" align="center">
                Enter your email to get a reset link
            </Text>

            {success === false ?
                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <TextInput
                        label="Your email"
                        placeholder="you@email.com"
                        icon={<DiffIcon2 size={14} color={validEmail ? "green" : "red"} />}
                        required
                        error={emailFocus && !validEmail ? `
                             Must be a valid email address.` : ''}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailFocus(true)}
                        onChange={e => setData({ ...data, email: e.target.value })}
                        value={data.email}
                    />

                    <Box mt={10} sx={{ display: !validEmail ? 'block' : 'none', textAlign: 'center' }} >
                        Enter your email to enable Reset Button
                    </Box>

                    <Group position="apart" mt="lg" className={classes.controls}>
                        <Anchor color="dimmed" size="sm" className={classes.control}
                            component={RouterLink} to={"/login"}>
                            <Center inline>
                                <BsArrowLeftSquare size={20} />
                                <Box ml={5}>Back to login page</Box>
                            </Center>
                        </Anchor>
                        <Button className={classes.control}
                            onClick={(e: any) => handleSubmit(e)}
                            loading={processing}
                            disabled={!validEmail ? true : false}
                        >
                            Reset password
                        </Button>
                    </Group>
                </Paper>

                :
                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <Box mt={10} >
                        Check your email for a password Reset link.
                    </Box>
                </Paper>
            }
        </Container>
    );
}