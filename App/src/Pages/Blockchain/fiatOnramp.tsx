// import OnramperWidget from "@onramper/widget";
// import * as React from "react";
// import { useContext, useEffect, useState } from "react";
// import {
//   useAddress,
// } from "@thirdweb-dev/react";
// import { Button, Container, Divider } from "@mantine/core";

// import { authContext } from "../../context/UserContext"
// import { Link as RouterLink, useNavigate, } from 'react-router-dom';
// import { AiOutlineLogin } from 'react-icons/ai'
// import { Sailboat } from 'tabler-icons-react'


// export default function fiatOnramp() {


//   const address = useAddress()
//   const [addressClaim, setaddressClaim] = useState("")

//   const { auth }: any = useContext(authContext);


//   useEffect(() => {
//     if (address) {
//       setaddressClaim(address)
//     }
//   }, [address]);



//   return (

//     <Container style={{ display: 'flex', justifyContent: 'center' }} >
//       {auth == true ?
//         <div
//           style={{
//             width: "482px",
//             height: "660px",
//           }}
//         >
//           <OnramperWidget
//             API_KEY="pk_prod_aG0OKtgaewzHdgg07D5IxHEbgPfY0ykzbhKz_RD3_Zc0"
//             color='#31a5ff'
//             defaultAddrs={addressClaim}
//             filters={{
//               onlyCryptos: ["USDC", "ETH",]
//             }}
//             isAddressEditable={true}
//             darkMode={true}
//           />
//         </div>
//         :

//         <div style={{ justifyContent: 'center' }}>
//           <p style={{ textAlignLast: 'center' }}>Please login or Register below</p>
//           <Button component={RouterLink} to={"/login"}
//             sx={(theme) => ({
//               '&:hover': {
//                 transform: 'scale(1.1)',
//               },
//               marginTop: '5px',
//               marginBottom: '15px',
//               marginLeft: 'auto',
//               marginRight: 'auto',
//               display: 'flex',
//               width: '200px',
//               flexDirection: 'column',
//             })} >
//             <AiOutlineLogin size={24} style={{ marginRight: 8 }} />
//             <span>Login</span>
//           </Button>

//           <Button component={RouterLink} to={"/register"}
//             sx={(theme) => ({
//               '&:hover': {
//                 transform: 'scale(1.1)',
//               },
//               marginTop: '5px',
//               marginBottom: '15px',
//               marginLeft: 'auto',
//               marginRight: 'auto',
//               display: 'flex',
//               width: '200px',
//               flexDirection: 'column',
//             })} >
//             <Sailboat size={24} style={{ marginRight: 8 }} />
//             <span>Register</span>
//           </Button>

//           <Divider size="md" color="#000000" my={20} sx={{ width: '100%', }} />

//         </div>

//       }
//     </Container>
//   );
// }


export {}   // delete if page is used