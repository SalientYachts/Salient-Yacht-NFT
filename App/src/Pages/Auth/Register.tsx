

import { Anchor, Box, Container, Text, Group, Button, Progress, Paper, LoadingOverlay, TextInput, Title, PasswordInput, Center, } from '@mantine/core';
import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useInputState } from '@mantine/hooks'
import axios from 'axios';
import { CgProfile } from 'react-icons/cg'
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa'
import { Link as RouterLink, useNavigate, } from 'react-router-dom';
import Swal from 'sweetalert2'


const delay = (ms: number) => new Promise(
  resolve => setTimeout(resolve, ms)
);

const API_URL = "https://app.salientyachts.com"



const emailRegex = /\S+@\S+\.\S+/

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






export default function Register() {

  const [loading, setLoading]: any = useState(true)
  const [errors]: any = useState();
  const [value, setValue]: any = useInputState('');
  let navigate = useNavigate()

  const [ref_inv, setRef_inv]: any = useState('');
  const [ref_invInput, setRef_invInput]: any = useState('');
  const [src_inv, setSrc_inv]: any = useState('');
  const ref_idSaved = localStorage.getItem('ref_id');
  const sourceSaved = localStorage.getItem('source');

  useEffect(() => {
    setRef_inv(ref_idSaved)
    setSrc_inv(sourceSaved)
    setLoading(false)
  }, []);

  const [processing, setprocessing] = useState(false);

  const errRef = useRef();

  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    ref_id: '',
    source: '',

  })

  useEffect(() => {
    setData({ ...data, source: src_inv })
  }, [])


  const strength = getStrength(value);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)} />
  ));

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={
          value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));


  useEffect(() => {
    setValidEmail(emailRegex.test(data.email));
  }, [data.email])

  useEffect(() => {
    if (strength >= 100) {
      setValidPwd(true);
    }
    setValidMatch(value === data.confirmPassword);
  }, [value, data.confirmPassword])

  useEffect(() => {
    setErrMsg('');
  }, [data.username, value, data.confirmPassword])



  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setprocessing(true);
    if (ref_inv == '' || ref_inv == null || ref_inv == undefined) {
      setData(data.ref_id = ref_invInput)
    } else {
      setData(data.ref_id = ref_inv)
    }
    setData(data.source = src_inv)
    setData(data.password = value)

    try {

      const response = await axios.post(
        `${API_URL}/authregister`
        , data
        //, { headers: headers }
      )

      if (response.data.success === true) {
        //setErrMsg(response.data.successmessage);
        //registerMoralis();
        console.log('main account regestered');
        Swal.fire({
          icon: 'success',
          title: 'Sweet!',
          text: 'You are on your way to owning shares in a Yacht and your own Broker',
          footer: 'You have been Registered!',
          timer: 4000,
          timerProgressBar: true,
        })
        //setErrMsg('Registration Success linked with Web3');
        console.log('Registration Success linked with Web3');
        setSuccess(true);
      }


    } catch (err) {
      if (!err?.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No Server Response',
          footer: 'Please try again!'
        })
        //setErrMsg('No Server Response');

      } else if (err.response?.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Username / Email already Taken',
          footer: 'Please try again!'
        })
        //setErrMsg('Username Taken');
        //  console.log(err.response);
      } else if (err.response?.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You Are Already Logged In',
          footer: 'Please try again!'
        })
        //setErrMsg('You Are Already Logged In');
        //  console.log(err.response);
      } else if (err.response?.status === 422) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Registration Failed...' + err.response.data.errors[0].message + ' ' + err.response.data.errors[0].field + ' ' + 'is already in use',
          footer: 'Please try again!'
        })
        //setErrMsg('Registration Failed...' + err.response.data.errors[0].message + ' ' + err.response.data.errors[0].field + ' ' + 'is already in use');
        //   console.log(err.response);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Registration Failed',
          footer: 'Please try again!'
        })
        //setErrMsg('Registration Failed')
      }
      setprocessing(false)
    }
  }

  // async function registerMoralis() {

  //   const user = new Moralis.User();
  //   user.set("username", data.username);
  //   user.set("password", data.password);
  //   user.set("email", data.email);

  //   const username = data.username
  //   const password = data.password
  //   const email = data.email

  //   try {
  //     await user.signUp();
  //     console.log('Registration with Web3');
  //     linkMoralis()
  //     // Hooray! Let them use the app now.
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: "Error: " + error.code + " " + error.message,
  //       footer: 'Please try again!'
  //     })
  //     // Show the error message somewhere and let the user try again.
  //     //alert("Error: " + error.code + " " + error.message);
  //     console.log("Error: " + error.code + " " + error.message)

  //     //setErrMsg('Registration Failed')
  //     setprocessing(false)
  //   }
  // }

  // async function linkMoralis() {
  //   try {
  //     const response = await axios.post(
  //       '/web3connect', data
  //     )
  //     setprocessing(false)
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Sweet!',
  //       text: 'You are on your way to owning to your own Yacht and Brokerage',
  //       footer: 'You are Registered & linked with Web3',
  //       timer: 4000,
  //       timerProgressBar: true,
  //     })
  //     //setErrMsg('Registration Success linked with Web3');
  //     console.log('Registration Success linked with Web3');

  //   } catch (error) {
  //     if (!error?.response) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'No Server Response',
  //         footer: 'Please try again!'
  //       })
  //       console.log('No Server Response');
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: error?.response,
  //         footer: 'Please try again!'
  //       })
  //       console.log(error?.response);
  //     }
  //     setprocessing(false)
  //   }
  // }

  useEffect(() => {
    if (success) {
      const f = async function makeRequest() {
        await delay(5000);
      }
      navigate("/login")
    }

  })




  const DiffIcon2 = validEmail ? FaCheck : FaTimes;
  const DiffIcon3 = validPwd ? FaCheck : FaTimes;
  const DiffIcon4 = validMatch ? FaCheck : FaTimes;

  return (
    <>
      <Container sx={{ maxWidth: 'none', position: 'relative' }} >
        <LoadingOverlay visible={loading} overlayBlur={2} overlayOpacity={95} radius="xl" zIndex={999} />
        {/* @ts-ignore */}
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>



        <Container size={420} p={0} >
          <Title className="overview"
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            Register
          </Title>

          <Paper withBorder shadow="md" px={30} pb={30} pt={15} mt={3} radius="md">
            <Text color="dimmed" size="sm" align="center" mb={15} >
              Already have an account?{' '}
              <Anchor
                component={RouterLink} to={"/login"} >
                Login
              </Anchor>
            </Text>
            <form autoComplete="new-password" >
              <TextInput sx={{ autoComplete: "off" }}
                label="Username"
                icon={<FaInfoCircle size={14} color="green" />}
                placeholder="YachtsForME"
                required
                maxLength={22}
                autoComplete="false"
                onChange={e => setData({ ...data, username: e.target.value })}
                value={data.username}
              />

              <TextInput sx={{ autoComplete: "off" }}
                label="Email"
                icon={<DiffIcon2 size={14} color={validEmail ? "green" : "red"} />}
                placeholder="you@email.com"
                required
                autoComplete="false"
                mt="md"
                error={emailFocus && !validEmail ? `
                    Must be a valid email address.` : ''}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                onChange={e => setData({ ...data, email: e.target.value })}
                value={data.email}
              />

              <div>
                <PasswordInput
                  mt="md"
                  onChange={e => setValue(e.target.value)}
                  value={value}
                  placeholder="Your password"
                  label="Password"
                  required
                  icon={<DiffIcon3 size={14} color={validPwd ? "green" : "red"} />}
                  autoComplete='false'
                />

                <Group spacing={5} grow mt="xs" mb="md">
                  {bars}
                </Group>

                <PasswordRequirement label="Has at least 6 characters"
                  meets={value.length > 5} />
                {checks}
              </div>


              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm password"
                mt="md"
                icon={<DiffIcon4 size={14} color={validMatch ? "green" : "red"} />}
                onChange={e => setData({ ...data, confirmPassword: e.target.value })}
                value={data.confirmPassword}
                // onChange={(e) => setconfirmPassword(e.target.value)}
                // value={confirmPassword}
                required
                error={matchFocus && !validMatch ? `
                    Must match the first password input field.` : ''}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />


              {errors?.username && <Text color='red.400'>{errors?.username}</Text>}
              < TextInput style={{
                display: (ref_inv == '' || ref_inv == null || ref_inv == 123456) ? 'block' : 'none'
              }}
                label="Reference ID" placeholder="123456" mt="md"
                value={ref_invInput}
                onChange={e => setRef_invInput(e.target.value)}
              // required={true}
              />

              <Box mt={10} sx={{ display: !validEmail || !validPwd || !validMatch ? 'block' : 'none', textAlign: 'center' }} >
                Complete the form to enable Register Button
              </Box>
              <Button
                fullWidth
                mt={!validEmail || !validPwd || !validMatch ? 10 : 25}
                disabled={!validEmail || !validPwd || !validMatch ? true : false}
                onClick={(e: any) => handleSubmit(e)}
                loading={processing}
                color='purple'
                leftIcon={<CgProfile size={14} />}
              >
                Register for Free
              </Button>
              <p >
                By signing up you agree to our{" "}
                <Anchor
                component={RouterLink} to={"/login"} >
                Terms of Service
              </Anchor>
              </p>

            </form>

          </Paper>
        </Container>

      </Container >

    </>
  )
}
