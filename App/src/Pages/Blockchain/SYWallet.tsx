import * as React from 'react'
import { useEffect, useMemo, useState, } from "react";
import {
    
    useContractMetadata,
    useNetwork,
    useActiveClaimCondition,
    useNFT,
    ThirdwebNftMedia,
    useAddress,
    useMetamask,
    useNetworkMismatch,
    useClaimNFT,
    useDisconnect,
    useMagic,
    MediaRenderer,
    useWalletConnect,
    useCoinbaseWallet,
    useConnect,
} from "@thirdweb-dev/react";


import { Button, Container, Group, Menu, Modal, TextInput, CopyButton, Select, NativeSelect, Image, ThemeIcon } from "@mantine/core";


import MetaMaskIcon from "../../Assets/logos/metamask-fox.svg"
import WalletConnectIcon from "../../Assets/logos/walletconnect-logo.svg"
import CoinbaseIcon from "../../Assets/logos/coinbase-wallet-logo.svg"
import MagicIcon from "../../Assets/logos/magic-logo.svg"
import { BsArrowDownCircle } from "react-icons/bs";
import { FaCheck, FaTimes, FaCopy } from "react-icons/fa";
import { HiClipboardCheck, HiClipboardCopy } from 'react-icons/hi';
//import { useWeb3 } from '../../Components/web3/useWeb3';
import { AiOutlineDisconnect } from 'react-icons/ai';




const emailRegex = /\S+@\S+\.\S+/


export default function SYWallet() {

    const [network, switchNetwork] = useNetwork();

    const address: any = useAddress(); // Hook to grab the currently connected user's address.
    const connectWithMagic = useMagic(); // Hook to connect with Magic Link.
    const connectWithWalletConnect = useWalletConnect();
    const connectWithCoinbaseWallet = useCoinbaseWallet();
    const connectWithMetamask = useMetamask();
    const disconnect = useDisconnect(); // Hook to disconnect from the connected wallet.

    const [email, setEmail] = useState<string>(""); // State to hold the email address the user entered.
    const [validEmail, setValidEmail] = useState(false);
    const [magicOpened, setMagicOpened] = useState(false);
    const DiffIcon2 = validEmail ? FaCheck : FaTimes;

    const getEllipsisTxt = (str: string, n = 6) => {
        if (str) {
            return `${str.substr(0, n)}.....${str.substr(str.length - n, str.length)}`;
        }
        return "";
    };


    useEffect(() => {
        setValidEmail(emailRegex.test(email));
    }, [email])





    return (

        <><Modal
            centered
            opened={magicOpened}
            onClose={() => setMagicOpened(false)}
            title="Connect with Email!"
        >
            {/* Modal content */}
            <TextInput sx={{ autoComplete: "off" }}
                label="Email"
                icon={<DiffIcon2 size={14} color={validEmail ? "green" : "red"} />}
                placeholder="your@email.com"
                required
                autoComplete="false"
                mt="md"
                error={!validEmail ? `
                    Must be a valid email address.` : ''}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <Button mt={20} onClick={() => connectWithMagic({
                 apiKey: "pk_live_869D8538865944E0",
                 email: "user@example.com", })}
                 >Connect with Magic</Button>


        </Modal>

            <Menu
                withArrow
                shadow="md"
                width={240}
                transition="rotate-right" transitionDuration={150}
            >
                <Menu.Target>
                    <Button sx={{ justifyContent: 'space-between', height: '50px', width: '250px', color: 'black', backgroundColor: "#1fc7d3" }}
                        //rightIcon={<BsArrowDownCircle style={{ marginLeft: '5px' }} size={24} />}
                        radius="xl"

                    >

                        <Group
                            sx={{ justifyContent: 'space-between', width: '250px', }}
                        >
                            {/* <Image
                            src={}
                              /> */}

                            {address ? (
                                <p> Your Address: <br /> {getEllipsisTxt(address, 7)}</p>
                            ) : (
                                <p>Connect Wallet</p>
                            )}

                            <BsArrowDownCircle style={{ marginLeft: '5px' }} size={24} />
                        </Group>
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    {address ? (
                        <div>
                            <CopyButton value={address}>
                                {({ copied, copy }) => (
                                    <Button mt={15}
                                        sx={{ width: '230px', }}
                                        color={copied ? 'teal' : 'blue'}
                                        onClick={copy}
                                        radius="xl"
                                        variant='subtle'
                                        leftIcon={copied ? <HiClipboardCheck size={20} /> : <HiClipboardCopy size={20} />}
                                    >
                                        {copied ? 'Copied address' : 'Copy address'}
                                    </Button>
                                )}
                            </CopyButton>

                            <Button mt={15}
                                sx={{ width: '230px', }}
                                color={'blue'}
                                onClick={disconnect}
                                radius="xl"
                                variant='subtle'
                                leftIcon={<AiOutlineDisconnect size={20} />}
                            >
                                Disconnect Wallet
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Menu.Label>Web3 Wallets</Menu.Label>
                            <Menu.Item icon={<img width={35} height={18} src={MetaMaskIcon} />}
                                onClick={() => connectWithMetamask}
                            >
                                MetaMask</Menu.Item>
                            <Menu.Item icon={<img width={35} height={18} src={CoinbaseIcon} />}
                                onClick={() => connectWithCoinbaseWallet}
                            >
                                Coinbase Wallet</Menu.Item>
                            <Menu.Item icon={<img width={35} height={18} src={WalletConnectIcon} />}
                                onClick={() => connectWithWalletConnect}
                            >
                                Wallet Connect</Menu.Item>

                            <Menu.Divider />
                            <Menu.Label>Email Wallet</Menu.Label>
                            <Menu.Item icon={<img width={35} height={18} src={MagicIcon} />}
                                onClick={() => setMagicOpened(true)}
                            >
                                MagicLink</Menu.Item>
                        </div>
                    )}
                </Menu.Dropdown>
            </Menu></>


    )
}