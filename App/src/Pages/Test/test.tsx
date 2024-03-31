
// import * as React from 'react';
// import {
//   useState,
//   useEffect,
//   useContext,
// } from "react";


// import { Box, Button, Paper } from '@mantine/core';
// //import axios from "axios";
// //import Swal from 'sweetalert2';
// import { authContext } from "../../context/UserContext"
// import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';

// import { Link as RouterLink, useNavigate, } from 'react-router-dom';
// import { AiOutlineLogout } from 'react-icons/ai';
// import Swal from 'sweetalert2';
// import { useForceUpdate } from '@mantine/hooks';


// const delay = ms => new Promise(
//   resolve => setTimeout(resolve, ms)
// );

// const API_URL = "https://app.salientyachts.com"
// const user_id = localStorage.getItem('user_id');




// export default function Home() {

//   const forceUpdate = useForceUpdate();
//   const { auth, setAuth }: any = useContext(authContext);
//   const [processing, setprocessing] = useState(false);
//   let navigate = useNavigate()
//   const [resData, setResData]: any = useState()
//   const [searchparams1, setsearchparams1]: any = useSearchParams()
//   const [searchparams2, setsearchparams2]: any = useSearchParams()
//   const ref_id = searchparams1.get('ref');
//   const source = searchparams2.get('src');

//   const [data, setData]: any = useState({
//     userToken: user_id,
//   })

//   useEffect(() => {
//     forceUpdate()
//     const user_id = localStorage.getItem('user_id');
//     const token = localStorage.getItem('SYtoken');
//     var headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }

//     localStorage.setItem('ref_id', ref_id);
//     localStorage.setItem('source', source);
//     setData(user_id)
//   }, [])


//   function postinvite() {
//     setprocessing(true)
//     forceUpdate()
//     const user_id = localStorage.getItem('user_id');
//     const token = localStorage.getItem('SYtoken');
//     var headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }

//     axios.get(`${API_URL}/invite?src=${source}&ref=${ref_id}`
//       //, { headers: headers }
//     ).then((response) => {

//       setResData(response.data)
//       console.log('invite res ID :', response.data)
//       console.log('invite res Name :', response.data.refererName)
//     });
//     setprocessing(false)
//     //functionAfterAxiosRequest()
//     forceUpdate()
//   }

//   const logout = async (e) => {
//     e.preventDefault();
//     setprocessing(true)
//     forceUpdate()
//     const user_id = localStorage.getItem('user_id');
//     const token = localStorage.getItem('SYtoken');
//     var headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//     try {
//       const response = await axios.post(
//         `${API_URL}/applogout`
//         , { userToken: user_id }
//         //, { headers: headers }
//       )

//       if (response.data.success === true) {
//         //localStorage.removeItem('SYtoken');

//         Swal.fire({
//           icon: 'success',
//           title: 'Good Bye!',
//           text: 'You have signed out from your account',
//           footer: response.data.successmessage,
//           timer: 3000,
//           timerProgressBar: true,
//         })
//         setAuth(false)
//         forceUpdate()
//       }
//       else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: response.data.errormessage,
//           footer: 'Something went wrong?'
//         })
//         console.log("Logout fail:", response.data.errormessage)
//         //setErrMsg("Email & Password credentials dont match, please check");
//         setprocessing(false)
//       }

//     } catch (err) {
//       if (!err?.response) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'No Server Response',
//           footer: 'Please try again!'
//         })
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Logout Failed',
//           footer: 'Please refresh and try again!'
//         })
//       }
//     }
//     forceUpdate()
//     setprocessing(false)
//   }


//   async function authcheck() {
//     setprocessing(true)
//     forceUpdate()
//     const user_id = localStorage.getItem('user_id');
//     const token = localStorage.getItem('SYtoken');
//     var headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }

//     const response = await axios.get(`${API_URL}/authuser`, { headers: headers }).then((response) => {
//       console.log(response.data)
//       console.log('LoggedIn :', response.data.authUser)
//     })
//     setprocessing(false)
//     //functionAfterAxiosRequest()
//     forceUpdate()
//   }

//   async function constcheck() {

//     forceUpdate()
//     const user_id = localStorage.getItem('user_id');
//     const token = localStorage.getItem('SYtoken');
//     var headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }

//     console.log('token', token)
//     console.log('user_id', user_id)
//     console.log('ref_id', ref_id)
//     console.log('source', source)
//     console.log('data', data)
//   }

//   // purchase data
//   const [orderData, setOrderData]: any = useState({
//     ref_id: null,
//     nftname: 'SYClub',
//     salevalue: '1.00',
//     noOfNfts: '1',
//     nftType: '0',
//     nftTxnAmount: '0.0123',
//     nftTxnResult: 'hash etc',
//     txid: '0x...',
//     buyerAddress: '0x...',

//   });



//   let orderIDBroker: any

//   const [infoMessage, setInfoMessage]: any = useState('waiting for transaction confirmation...');

//   const [brokerData, setbrokerData]: any = useState({
//     orderIDBroker: orderIDBroker,
//   });

//   async function fakeorder() {

//     forceUpdate()
//     const token = localStorage.getItem('SYtoken');
//     var headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//     console.log(orderData);
//     try {
//       const response = await axios.post(
//         `${API_URL}/store2`
//         , orderData
//         , { headers: headers })

//       if (response.data.success === true) {
//         console.log('NFT Bought!');
//         console.log('New Order ID: ', response.data.newOrderID);
//         orderIDBroker = response.data.newOrderID;
//         setInfoMessage('NFT Bought!');
        
//       }
//       //setOrderIDBroker(response.data.newOrderID) as unknown as number
//       setbrokerData({ ...brokerData.orderIDBroker = orderIDBroker });
//     } catch (error) {
//       console.log("Error: " + error.code + " " + error.message)
//       setprocessing(false)
//     }
//     setInfoMessage('Processing order...');

//     broker_dist();
//   }

//   async function broker_dist() {
//     console.log('New orderIDBroker: ', orderIDBroker);
//     forceUpdate()
//     const token = localStorage.getItem('SYtoken');
//     var headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
   
//     try {
//       const response = await axios.post(
//         `${API_URL}/broker_dist2`
//         , brokerData
//         , { headers: headers })

//       if (response.data.success === true) {
//         console.log('Order has been Confirmed!');
//         setprocessing(false)
//         Swal.fire({
//           icon: 'success',
//           title: 'Awesome!!',
//           text: 'You bought a Salient Yacht NFT!',
//           timer: 4000,
//           timerProgressBar: true,
//         })
//       }
//     } catch (error) {
//       console.log("Error: " + error.code + " " + error.message)
//       setprocessing(false)
//     }
//   }


//   return (

//     <div>
//       <Paper withBorder p="md" radius="xl" sx={{
//         backgroundColor: '#292b30', width: '100%', height: '100%',
//         display: 'flex', flexDirection: 'column', alignItems: 'center',
//         boxShadow: "1px -1px 12px 3px #0cfbf8",
//       }}>


//         {auth === true ?
//           <p> Logged In</p>
//           :
//           <p> Not Auth</p>

//         }

//         <Button
//           mt="xl"
//           loading={processing}
//           onClick={() => postinvite()}
//         >
//           Invite check
//         </Button>

//         <Button
//           mt="xl"
//           loading={processing}
//           onClick={() => constcheck()}
//         >
//           Const checks
//         </Button>

//         <Button
//           mt="xl"
//           loading={processing}
//           onClick={() => authcheck()}
//         >
//           Auth check
//         </Button>


//         <Button
//           mt="xl"
//           loading={processing}
//           onClick={() => fakeorder()}
//         >
//           fake order
//         </Button>


//         <Button component={RouterLink} to={""}
//           sx={(theme) => ({
//             '&:hover': {
//               transform: 'scale(1.1)',
//             },
//             marginTop: '5px',
//             marginBottom: '15px',
//             marginLeft: 'auto',
//             marginRight: 'auto',
//             display: 'flex',
//             width: '80%',
//             flexDirection: 'column',
//           })}
//           onClick={(e) => logout(e)}


//           loading={processing}
//         >
//           <AiOutlineLogout size={24} style={{ marginRight: 8 }} />
//           <span>Logout</span>
//         </Button>














//         <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '600px', }}>




//         </Box>


//       </Paper>


//     </div>
//   )

// }


export {}   // delete if page is used