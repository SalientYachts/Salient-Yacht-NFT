import * as React from "react";
import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useForceUpdate } from "@mantine/hooks";
//import AsyncStorage from "@react-native-community/async-storage";

// // create context
// const UserContext = createContext();

// const UserContextProvider = ({ children }) => {
//   // the value that will be given to the context
//   const [authUser, setAuthUser] = useState(null);
//   const [authUsername, setauthUsername] = useState(null);
//   const [ref_id, setref_id] = useState(null);

//   // fetch a user from a fake backend API
//   useEffect(() => {
//     axios.get('/authuser').then((response) => {
//         setAuthUser(response.data.authUser)
//         setauthUsername(response.data.authUsername)
//         setref_id(response.data.ref_id)
//     });
//   }, []);

//   return (
//     // the Provider gives access to the context to its children
//     <UserContext.Provider value={authUser}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserContextProvider };















type contextProps = {
  children: React.ReactNode
}





export const authContext: any = createContext({});

const token = localStorage.getItem('SYtoken');


export const AuthProvider = ({ children }: contextProps) => {

  const [auth, setAuth] = useState(false);

  const API_URL = "https://app.salientyachts.com"
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }


  useEffect(() => {
    axios.get(`${API_URL}/authuser`
    , { headers: headers }).then((response) => {
      setAuth(response.data.authUser)
      localStorage.setItem('user_id', response.data.user_id)
      console.log('LoggedIn :', response.data.authUser)
    });
  }, []);



  return (
    <authContext.Provider value={{ auth, setAuth,  }}>
      {children}
    </authContext.Provider>
  )
}

