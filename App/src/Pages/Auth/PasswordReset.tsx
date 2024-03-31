import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Center,
    Box,
    Input,
    Progress,
    PasswordInput,
    LoadingOverlay,

} from '@mantine/core';
import { useForceUpdate, useInputState } from '@mantine/hooks';
import axios from 'axios';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa'
import * as React from 'react' 
import { useState, useEffect, useRef, } from 'react';
import { Link as RouterLink, useNavigate, } from 'react-router-dom';
import Swal from 'sweetalert2'
import { RiLockPasswordLine } from 'react-icons/ri';








const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);




function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
            <Center inline>
                {meets ? <FaCheck size={14} /> : <FaTimes size={14} />}
                <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

const API_URL = "https://app.salientyachts.com"


export default function ForgotPassword() {


    const forceUpdate = useForceUpdate();
    const [loading, setLoading] = useState(true)
    const [processing, setprocessing] = useState(false);
    const [isEmailSignatureValid, setIsEmailSignatureValid] = useState(false);
    let navigate = useNavigate()

    const [data, setData]: any = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        
        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        axios.get( `${API_URL}/emailresetcheck`
        , { headers: headers }).then((response) => {

            setIsEmailSignatureValid(response.data.isEmailSignatureValid)
            setData({ ...data, email: response.data.email })

            setLoading(false)

        });
    }, []);









    const strength = getStrength(data.password);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(data.password)} />
    ));

    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{ bar: { transitionDuration: '0ms' } }}
                value={
                    data.password.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
                }
                color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
                key={index}
                size={4}
            />
        ));


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
                `${API_URL}/resetPasswordStore`
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
                Swal.fire({
                    icon: 'success',
                    title: 'Nice and Safe!',
                    text: 'Your password has been changed!',
                    footer: 'You can login with your new password',
                    timer: 4000,
                    timerProgressBar: true,
                })
                setprocessing(false);
                await delay(3000);
                navigate("/login")
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
                    text: 'Something went wrong!',
                    footer: 'Please try again!'
                })
                //setErrMsg('Login Failed')
                //  console.log('Error', err.message);
            }
            setprocessing(false)
            await delay(3000);
            navigate("/login")
        }
        await delay(3000);
        navigate("/login")
    }




    return (
        <Container size={460} my={30} sx={{ position: 'relative' }} >
            <LoadingOverlay visible={loading} overlayBlur={2} overlayOpacity={95} radius="xl" zIndex={999} />
            <Title className="overview" align="center">
                Reset Your Password?
            </Title>

            {isEmailSignatureValid === true ?
                <>
                    <Text size="md" align="center">
                        Enter your new password
                    </Text>

                    <Paper withBorder shadow="md" px={30} pb={30} pt={15} mt={3} radius="md">
                        <div>
                            <Input.Wrapper label="Your Email" >
                                <Input
                                    icon={<FaInfoCircle />}
                                    value={data.email}
                                    disabled
                                    mb={15}
                                />
                            </Input.Wrapper>
                            <PasswordInput
                                onChange={e => setData({ ...data, password: e.target.value })}
                                value={data.password}
                                placeholder="Your password"
                                label="Your New Password"
                                required
                                autoComplete='false'
                            />

                            <Group spacing={5} grow mt="xs" mb="md">
                                {bars}
                            </Group>

                            <PasswordRequirement label="Has at least 6 characters"
                                meets={data.password.length > 5} />
                            {checks}
                        </div>
                        <Button
                            fullWidth
                            mt={25}
                            disabled={strength >= 100 ? false : true}
                            onClick={(e: any) => handleSubmit(e)}
                            loading={processing}
                            color='purple'
                            leftIcon={<RiLockPasswordLine size={14} />}
                        >
                            Set New Password
                        </Button>
                    </Paper></>
                :
                <Paper withBorder shadow="md" px={30} pb={30} pt={15} mt={3} radius="md">
                    <Text size="lg" align="center">
                        Sorry! <br />
                        Your Password Reset Link is INVALID or EXPIRED <br />
                        Please try again?
                    </Text>
                </Paper>
            }

        </Container>
    );
}