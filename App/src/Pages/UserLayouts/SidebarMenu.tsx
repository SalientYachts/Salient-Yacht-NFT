import * as React from 'react';
import { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate, } from 'react-router-dom';
import { Navbar, SegmentedControl, createStyles, Button, ScrollArea, Divider, Text, Group } from '@mantine/core';
import SidebarFooter from './SidebarFooter.js';
import {
  License,
  Message2,
  Messages,
  Sailboat,
  Settings,
} from 'tabler-icons-react';

import { GoHome, } from 'react-icons/go';
import { GiIsland, GiNewspaper, GiRoad, } from 'react-icons/gi';
import { AiOutlineDashboard, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { RiGovernmentLine } from 'react-icons/ri';
import { BiTransfer } from 'react-icons/bi';
import { TiChartPie } from 'react-icons/ti';
import { MdQueryStats } from 'react-icons/md';
import { ImTree } from 'react-icons/im';
import { TbAffiliate } from 'react-icons/tb';
import { BsCreditCard } from 'react-icons/bs'
import { BsDisplay } from 'react-icons/bs'
import { GrGamepad } from "react-icons/gr"

import axios from 'axios';
import SYWallet from '../Blockchain/SYWallet';
import { authContext } from '../../context/UserContext';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useForceUpdate } from '@mantine/hooks';
import Swal from 'sweetalert2';



const delay = (ms: number) => new Promise(
  resolve => setTimeout(resolve, ms)
);
const API_URL = "https://app.salientyachts.com"





const useStyles = createStyles((theme, _params, getRef) => {
  const icon: any = getRef('icon');

  return {
    navbar: {
      background: 'linear-gradient(180.48deg, rgb(115, 70, 215) -26.15%, rgb(57, 35, 81) 189.84%)',
      padding: '20px',
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: 'whitesmoke',
      padding: "2px 5px",
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: "#343a40",
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        transform: 'scale(1.05)',

        [`& .${icon}`]: {
          color: 'black',
          height: '1.5em',
          width: '1.5em',
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: 'black',
      maxWidth: '24px',
      marginRight: '10px',
      height: '1.5em',
      width: '1.5em',
    },

    linkActive: {
      borderBottom: 'double',
      borderTop: 'double',
      boxShadow: '1px 0px 6px 0px #0cfbf8',
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        },
      },
    },

  };
});


const tabs = {

  general: [
    { link: '/', label: 'Home', icon: GoHome },
    { link: '/view-yachts', label: 'View Yachts', icon: Sailboat },
    
    //{ link: '/membership-nft', label: 'Membership NFTs', icon: Message2 },
    //{ link: '/BrokerInfo', label: 'Broker / Affiliate', icon: TbAffiliate },
    //{ link: '/governance', label: 'Governance', icon: RiGovernmentLine },
    //{ link: '/tokenomics', label: 'Tokenomics', icon: TiChartPie },
    //{ link: '/roadmap', label: 'Roadmap / Goals', icon: GiRoad },
    { link: '/island-living', label: 'Island Living', icon: GiIsland },
    { link: '/CryptoSailing', label: 'Crypto Sailing Game', icon: GrGamepad },
    //{ link: '/test', label: 'test page', icon: Settings },
  ],
  account: [
    { link: '/dashboard', label: 'Dashboard', icon: AiOutlineDashboard },
    { link: '/buynfts', label: 'Buy SY NFTs / Shares', icon: Sailboat },
    { link: '/claimrewards', label: 'Claim NFTs Rewards', icon: Sailboat },
    { link: '/broker-earnings', label: 'Broker Earnings', icon: BiTransfer },
    { link: '/network-stats', label: 'My Network Stats', icon: MdQueryStats },
    { link: '/network-chart', label: 'My Network Chart', icon: ImTree },

    { link: '/profile', label: 'Profile Settings', icon: Settings },
    

  ],
};
const tabs2 = {
  general: [
    { link: "https://salientyachts.medium.com", label: 'Blog / Articles', icon: GiNewspaper },
    { link: "https://docs.salientyachts.com", label: 'Docs / Whitepaper', icon: License },
  ],
  //@ts-ignore
  account: [],
};
const tabs3 = {

  general: [
    { link: '/contact', label: 'Contact Us', icon: Messages },
  ],
  account: [{ link: '/fiatOnramp', label: 'Buy Crypto with Card', icon: BsCreditCard },],
};

const tabs4 = {
  //@ts-ignore
  general: [], 
  account: [
    { link: '/demo', label: 'App Demo', icon: BsDisplay },
  ],
};



export default function SidebarMenu({ toggleCollapsed, }: any) {

  const forceUpdate = useForceUpdate();
  const [processing, setprocessing] = useState(false);
  const { auth, setAuth }: any = useContext(authContext);
  const { authRef }: any = useContext(authContext);

  let navigate = useNavigate()
  const { classes, cx } = useStyles();
  const [section, setSection] = useState('general');
  const [active, setActive]: any = useState('Home');


  const logout = async (e: any) => {
    e.preventDefault();
    setprocessing(true)

    forceUpdate()
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('SYtoken');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    
    try {
      const response = await axios.post(
        `${API_URL}/applogout`
        , {userToken: user_id}
        //, { headers: headers }
      )
  
      if (response.data.success === true) {
        //localStorage.removeItem('SYtoken');
  
        Swal.fire({
          icon: 'success',
          title: 'Good Bye!',
          text: 'You have signed out from your account',
          footer: response.data.successmessage,
          timer: 3000,
          timerProgressBar: true,
        })
        setAuth(false)
        forceUpdate()
        toggleCollapsed()
        const f = async function makeRequest() {
          await delay(2600);
        }
        navigate("/login")
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.errormessage,
          footer: 'Something went wrong?'
        })
        console.log("Logout fail:", response.data.errormessage)
        //setErrMsg("Email & Password credentials dont match, please check");
        setprocessing(false)
        toggleCollapsed()
      }
  
    } catch (err) {
      if (!err?.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No Server Response',
          footer: 'Please try again!'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Logout Failed',
          footer: 'Please refresh and try again!'
        })
      }
    }
    forceUpdate()
    setprocessing(false)
    toggleCollapsed()
  }
  

  const links = tabs[section].map((item: any) => (



    <span
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
        toggleCollapsed()
      }}>
      <Button
        sx={{
          display: "flex !important"
        }}
        fullWidth
        variant="subtle"
        component={RouterLink}
        to={item.link}>
        <item.icon className={classes.linkIcon} />
        <span>{item.label}</span>
      </Button>
    </span>


  ));

  const links2 = tabs2[section].map((item: any) => (

    <span
      className={cx(classes.link,)}
      key={item.label} 
      onClick={(event) => {
        toggleCollapsed()
      }}>
      <Button
        sx={{
          display: "flex !important"
        }}
        fullWidth
        variant="subtle"
        component="a"
        href={item.link} target="_blank" rel="noreferrer">
        <item.icon className={classes.linkIcon} />
        <span>{item.label}</span>
      </Button>
      
    </span>


  ));

  const links3 = tabs3[section].map((item: any) => (

    <span
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
        toggleCollapsed()
      }}>
      <Button
        sx={{
          display: "flex !important"
        }}
        fullWidth
        variant="subtle"
        component={RouterLink}
        to={item.link}>
        <item.icon className={classes.linkIcon}

        />
        <span>{item.label}</span>
      </Button>
    </span>


  ));

  const links4 = tabs4[section].map((item: any) => (

    <span
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
        toggleCollapsed()
      }}>
      <Button
        sx={{
          display: "flex !important"
        }}
        fullWidth
        variant="subtle"
        component={RouterLink}
        to={item.link}>
        <item.icon className={classes.linkIcon}

        />
        <span>{item.label}</span>
      </Button>
    </span>
  ));



  return (
    <Navbar width={{ sm: 300, lg: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section>

        <SegmentedControl
          transitionDuration={1000}
          //transitionTimingFunction="linear"
          transitionTimingFunction="ease"
          value={section}
          onChange={(value: 'account' | 'general') => setSection(value)}
          fullWidth
          data={[
            { label: 'Info', value: 'general' },
            { label: 'Account', value: 'account' },
          ]}

        />

      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea} mt="xl">

        {/* <Button
          onClick={() => {
            toggleDisplay();
          }}>
          <span>Toggle display</span>
        </Button> */}

        {section === "account" ?
          <div>
          {auth == true ?
              <div>
                <Group className='walletconnect' sx={{ justifyContent: 'center' }} >
                  <ConnectWallet  theme="dark" />
                </Group>
                {/* <SYWallet /> */}
                <Divider my={15} size="md" color="#000000" sx={{ width: '100%', }} />
                {links}
                {links2}
                <Divider size="md" color="#000000" my={20} sx={{ width: '100%', }} />
                {links3}
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
                    width: '80%',
                    flexDirection: 'column',
                  })}
                  onClick={() => {
                    toggleCollapsed()
                  }} >
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
                    width: '80%',
                    flexDirection: 'column',
                  })} 
                  onClick={() => {
                    toggleCollapsed()
                  }} >
                  <Sailboat size={24} style={{ marginRight: 8 }} />
                  <span>Register</span>
                </Button>

                <Divider size="md" color="#000000" my={20} sx={{ width: '100%', }} />

                {links4}

              </div>

             } 
          </div>
          :
          <div>
            {links}
            {links2}
            {links3}
          </div>
}






      </Navbar.Section>
      <Divider size="md" color="#000000" mb={10} sx={{ width: '100%', }} />
      <Navbar.Section  >

        {auth == true ?
          <Button component={RouterLink} to={""}
            sx={(theme) => ({
              '&:hover': {
                transform: 'scale(1.1)',
              },
              marginTop: '5px',
              marginBottom: '15px',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              width: '80%',
              flexDirection: 'column',
            })}
            onClick={(e) => logout(e)}
            loading={processing}
          >
            <AiOutlineLogout size={24} style={{ marginRight: 8 }} />
            <span>Logout</span>
          </Button>
          :

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
              width: '80%',
              flexDirection: 'column',
            })} 
            onClick={() => {
              toggleCollapsed()
            }} >

            <AiOutlineLogin size={24} style={{ marginRight: 8 }} />

            <span>Login</span>
          </Button>

        }





        <SidebarFooter />
      </Navbar.Section>
    </Navbar >
  );
}