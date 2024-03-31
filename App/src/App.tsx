import React from 'react'
import { useState, Suspense, } from 'react';
import { Routes, Route, } from "react-router-dom";
import { Button, AppShell, ColorSchemeProvider, Navbar, Header, Affix, Transition, MantineProvider, Box, ActionIcon, } from '@mantine/core';
import { useHotkeys, useLocalStorage, useWindowScroll, useMediaQuery } from '@mantine/hooks';
import { TbArrowBarToUp, } from 'react-icons/tb';
import TopNav from './Pages/UserLayouts/TopNav';
import SidebarMenu from './Pages/UserLayouts/SidebarMenu';
import './App.css';
import PageNotFound from './Pages/PageNotFound';



const ScrollToTop = React.lazy(() => import('./Components/ScrollToTop'));
const Home = React.lazy(() => import('./Pages/Home'));
const MembershipNFT = React.lazy(() => import('./Pages/Info/MembershipNFT'));
const AllYachts = React.lazy(() => import('./Pages/Info/Yachts/AllYachts'));
const SalientOne = React.lazy(() => import('./Pages/Info/Yachts/salient-one'));
const Salient54 = React.lazy(() => import('./Pages/Info/Yachts/salient54'));
const Salient64c = React.lazy(() => import('./Pages/Info/Yachts/salient64c'));
const Governance = React.lazy(() => import('./Pages/Info/Governance'));
const Tokenomics = React.lazy(() => import('./Pages/Info/Tokenomics'));
const Mauritius = React.lazy(() => import('./Pages/Info/Mauritius'));
const ContactUs = React.lazy(() => import('./Pages/Info/ContactUs'));
const Roadmap = React.lazy(() => import('./Pages/Info/Roadmap'));
const BrokerInfo = React.lazy(() => import('./Pages/Info/BrokerInfo'));
const Demo = React.lazy(() => import('./Pages/Info/Demo'));
const Start = React.lazy(() => import('./Pages/Start'));
const Login = React.lazy(() => import('./Pages/Auth/Login'));
const Dashboard = React.lazy(() => import('./Pages/Users/Dashboard'));
const MyGeneology = React.lazy(() => import('./Pages/Users/MyGeneology'));
const MyNetwork = React.lazy(() => import('./Pages/Users/MyNetwork'));
const Register = React.lazy(() => import('./Pages/Auth/Register'));
const BrokerEarnings = React.lazy(() => import('./Pages/Users/BrokerEarnings'));
const BuyNFT1 = React.lazy(() => import("./Pages/Blockchain/BuyNFT1"));
const ProfilePage = React.lazy(() => import('./Pages/Users/ProfilePage'));
const ForgotPassword = React.lazy(() => import('./Pages/Auth/ForgotPassword'));
const PasswordReset = React.lazy(() => import('./Pages/Auth/PasswordReset'));
//const FiatOnramp = React.lazy(() => import('./Pages/Blockchain/fiatOnramp'));
const CryptoSailing = React.lazy(() => import('./Pages/CryptoSailing/CryptoSailing.jsx'));
const Claimrewards = React.lazy(() => import('./Pages/Blockchain/ClaimRewards'));


export default function App() {


  const [scroll, scrollTo] = useWindowScroll();
  const HeaderHeight = '@media (max-width: 800px)' > '768' ? '100' : '200';
  const scrollmedia = useMediaQuery('(min-width: 700px)');

  const [colorScheme, setColorScheme]: any = useLocalStorage({ key: 'color-scheme', defaultValue: 'dark' });
  const toggleColorScheme = () =>
    setColorScheme((current: string) => (current === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const [collapsed, setCollapsed]: any = useState(false)
  const toggleCollapsed: any = () => {
    setCollapsed(!collapsed);
  };








  return (
    <ScrollToTop>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>

          <AppShell className='appBackground'
            zIndex={9999}
            fixed

            header={
              <Header height={HeaderHeight} sx={{ backgroundColor: '#353535' }}>
                {/* Your Header here */}
                <TopNav toggleCollapsed={toggleCollapsed} collapsed={collapsed} />
              </Header>
            }

            navbar={
              <Navbar mt={16} p="md" hiddenBreakpoint="sm" hidden={!collapsed} width={{ sm: 300, lg: 300 }} >
                <Navbar.Section mx="-xs" px="xs">
                  {/* scrollable content here */}
                  <SidebarMenu toggleCollapsed={toggleCollapsed} />
                </Navbar.Section>
              </Navbar>
            }
          >



            {/* Your application here */}

            <Box >

              <Suspense
                fallback={<h1>Loading the page...</h1>}
              >
                <Routes>

                  <Route path="/" element={<Home />} />
                  <Route element={<Home />} path="/home" />
                  <Route element={<AllYachts />} path="/view-yachts" />
                  <Route element={<CryptoSailing />} path="/CryptoSailing" />
                  <Route element={<MembershipNFT />} path="/membership-nft" />
                  <Route element={<BrokerInfo />} path="/BrokerInfo" />
                  <Route element={<Governance />} path="/governance" />
                  <Route element={<Tokenomics />} path="/tokenomics" />
                  <Route element={<Roadmap />} path="/roadmap" />
                  <Route element={<Mauritius />} path="/island-living" />
                  <Route element={<ContactUs />} path="/contact" />

                  <Route element={<Dashboard />} path="/dashboard" />
                  <Route element={<BuyNFT1 />} path="/buynfts" />
                  <Route element={<Claimrewards />} path="/claimrewards" />
                  <Route element={<BrokerEarnings />} path="/broker-earnings" />
                  <Route element={<MyGeneology />} path="/network-chart" />
                  <Route element={<MyNetwork />} path="/network-stats" />
                  {/* <Route element={<FiatOnramp />} path="/fiatOnramp" /> */}
                  <Route element={<ProfilePage />} path="/profile" />

                  <Route element={<Demo />} path="/demo" />

                  <Route element={<SalientOne />} path="/salientOne" />
                  <Route element={<Salient54 />} path="/Yachts1" />
                  <Route element={<Salient64c />} path="/Yachts2" />
                  <Route element={<Start />} path="/invite" />
                  <Route element={<Start />} path="/start" />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/authlogout" element={<Login />} />
                  <Route path="/ForgotPassword" element={<ForgotPassword />} />
                  <Route path="/passwordreset" element={<PasswordReset />} />



                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </Box>

            {scrollmedia === true ?
              <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                  {(transitionStyles) => (
                    <Button
                      leftIcon={<TbArrowBarToUp />}
                      style={transitionStyles}
                      onClick={() => scrollTo({ y: 0 })}
                    >
                      Scroll to top
                    </Button>
                  )}
                </Transition>
              </Affix>

              :

              <Affix position={{ bottom: 50, right: 10 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                  {(transitionStyles) => (
                    <ActionIcon 
                      style={transitionStyles}
                      size="lg"
                      color="blue"
                      variant="filled"
                      onClick={() => scrollTo({ y: 0 })}
                    >
                    <TbArrowBarToUp />
                    </ActionIcon>
                  )}
                </Transition>
              </Affix>

            }

          </AppShell>

        </MantineProvider>
      </ColorSchemeProvider >
    </ScrollToTop>

  )

}


