import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import axios from 'axios';
import React from 'react';
import { useState, useEffect, useRef, useContext, } from 'react';
import { Link as RouterLink, useNavigate, } from 'react-router-dom';

import Swal from 'sweetalert2'
import { authContext } from '../../context/UserContext';





const delay = (ms: number) => new Promise(
  resolve => setTimeout(resolve, ms)
);
const token = localStorage.getItem('SYtoken');
const API_URL = "https://app.salientyachts.com"
var headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}



export default function Login() {

  const errRef = useRef();
  let navigate = useNavigate()
  const { auth, setAuth }: any = useContext(authContext);

  const [errors]: any = useState();

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [processing, setprocessing] = useState(false);

  const [data, setData]: any = useState({
    email: '',
    password: '',
    remember: false,
  })


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setprocessing(true)
    try {
      const response = await axios.post(
        `${API_URL}/authlogin`, data
      )

      if (response.data.error === true) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.errormessage,
          footer: 'Please try again!'
        })
        console.log(response.data.errormessage)
        //console.log(response.data)
        setprocessing(false)
      } else
      if (response.data.success === true) {
        console.log("main login")
        //console.log(response.data)
        setprocessing(false)
        localStorage.setItem('SYtoken', response.data.token.token);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('ref_id', response.data.ref_id);
        Swal.fire({
          icon: 'success',
          title: 'Awesome!',
          text: 'You are signed into your Yacht ownership & Brokerage account',
          footer: response.data.successmessage,
          timer: 4000,
          timerProgressBar: true,
        })
        setSuccess(true);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.errormessage,
          footer:  'Please re-enter your email and password'
        })
        console.log("Login fail:", response.data.errormessage)
        //setErrMsg("Email & Password credentials dont match, please check");
        setprocessing(false)
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

  useEffect(() => {
    if (success) {
      const f = async function makeRequest() {
        await delay(3000);
      }
      setAuth(true)
      navigate("/dashboard")
    }

  })



  return (

    <>
      <Container sx={{ maxWidth: 'none', }} >
        {/* @ts-ignore */}
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        <Container size={420} p={0} >

          <Title className="overview"
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            Welcome back!
          </Title>


          <Paper withBorder shadow="md" px={30} pb={30} pt={15} mt={3} radius="md">
            <Text color="dimmed" size="sm" align="center" mb={15} >
              Do not have an account yet?{' '}
              <Anchor
                component={RouterLink} to={"/register"} >
                Create account
              </Anchor>
            </Text>
            <form >
              <TextInput
                type="email"
                label="Email"
                placeholder="you@email.com"
                required
                onChange={e => setData({ ...data, email: e.target.value })}
                value={data.email}
              />
              {errors?.email && <Text color='red.400'>{errors?.email}</Text>}

              <PasswordInput mt="md"
                label="Password"
                placeholder="Your password"
                required
                onChange={e => setData({ ...data, password: e.target.value })}
                value={data.password}
              />
              {errors?.password && <Text color='red.400'>{errors?.password}</Text>}
              {errors?.login && <Text color='red.400'>{errors?.login}</Text>}

              <Group position="apart" mt="md">
                <Checkbox label="Remember me"
                  onChange={e => setData({ ...data, remember: true })}
                />
                <Anchor component={RouterLink} to={"/ForgotPassword"} >
                  Forgot password?
                </Anchor>
              </Group>
              <Button
                fullWidth
                mt="xl"
                loading={processing}
                onClick={(e: any) => handleSubmit(e)}
              >
                Login
              </Button>
            </form>
          </Paper>

        </Container >
      </Container >
    </>
  )
}
