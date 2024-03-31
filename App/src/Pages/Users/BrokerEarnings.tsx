
import axios from 'axios';
import * as React from 'react'
import { useState, useEffect, useContext, } from 'react';
import { Box, Container, Text, Group, Paper, LoadingOverlay, Button, Title, Table, Pagination, UnstyledButton, NumberInput, Select, Divider, ScrollArea, } from '@mantine/core';
import Footer from '../Info/Footer';
import  moment from 'moment';
import { useForceUpdate } from '@mantine/hooks';
import { authContext } from '../../context/UserContext';
import { Sailboat } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai';


const styles: any = {
    balanceText: {
        width: '90%',
        margin: '0 auto 13px',
        fontFamily: "Raleway",
        fontSize: '17px',
        fontWeight: '700',
        lineHeight: '20px',
        color: '#000',
        display: 'flex',
        justifyContent: 'space-between',

    },
    emptyRecords: {
        fontFamily: "Raleway",
        fontSize: '20px',
        fontWeight: '400',
        lineHeight: '23px',
        textAlign: 'center',
        color: '#868686',
    },
    description: {
        flexGrow: '1',
        color: '#000',
        cursor: 'pointer'
    },

}

const API_URL = "https://app.salientyachts.com"



export default function WalletTransactions() {

    const forceUpdate = useForceUpdate();
    const [loading, setLoading] = useState(true)

    const [totalEarnings, setTotalEarnings] = useState<number>();
    const [records, setRecords]: any = useState([])
    const [paidToDate, setPaidToDate] = useState<number>()
    let balance: number


    useEffect(() => {

        forceUpdate()
        const token = localStorage.getItem('SYtoken');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        axios.get(`${API_URL}/getRecords`
            , { headers: headers }).then((response) => {

                setTotalEarnings(response.data.totalEarnings)
                setRecords(response.data.records)
                setPaidToDate(response.data.paidToDate)

                setLoading(false)

            });


    }, []);

    balance = 0
    for (const record of records) {
        if (record.type === "Income")
            balance += parseFloat(record.amount)
        else
            balance -= parseFloat(record.amount)
    }



    const columns = [
        // {
        //     id: 'orderdate',
        //     label: 'Date',
        //     minWidth: 150,
        // },
        {
            id: 'ref_id',
            label: 'Affiliate ID',
            minWidth: 115,
        },
        {
            id: 'level',
            label: 'Level',
            minWidth: 60,
        },
        {
            id: 'nftname',
            label: 'NFT Name',
            minWidth: 80,
        },
        {
            id: 'txid',
            label: 'TX ID',
            minWidth: 100,
        },
        {
            id: 'amount',
            label: 'Amount',
            minWidth: 100,
        },
    ];


    const getEllipsisTxt = (str: string, n = 6) => {
        if (str) {
            return `${str.substr(0, n)}.....${str.substr(str.length - n, str.length)}`;
        }
        return "";
    };

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage]: any = useState(10);
    const pageCount = records ? Math.ceil(records.length / rowsPerPage) : 0;


    const { auth }: any = useContext(authContext);

    return (

        <Container px={0} mx={0} sx={{ maxWidth: 'none', }} >
            {auth == true ?
                <Box sx={{ width: 'full', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Title order={1} color="white" align="center" className="overview" sx={{  fontSize: "clamp(25px, 35px, 1rem)", }}>
                        Broker Earnings from Affiliate Sales
                    </Title>

                    <Container mt={10} px={0} mx={0}
                        sx={{ position: 'relative', width: '100%', }} >

                        <Paper withBorder p="md" pb={30} mt={20} radius="xl" sx={{
                            boxShadow: "1px -1px 12px 3px #0cfbf8", opacity: '0.85',
                            position: 'relative', backgroundColor: '#292b30',
                        }}>
                            <LoadingOverlay visible={loading} overlayBlur={2} radius="xl" zIndex={999} />


                            {/* Page start */}

                            <Group sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', }} >


                                {/* PROFILE WALLET BALANCE */}

                                <Group sx={{ gap: '2px', display: 'flex', flexDirection: 'column', }}>
                                    <Text mb={10} color="dimmed" transform="uppercase" weight={700} size="xs" >
                                        TOTAL EARNINGS TO DATE
                                    </Text>
                                    <UnstyledButton px={30}
                                        sx={{
                                            //margin: '0.5rem 0 0.5rem',
                                            width: '-webkit-fill-available !important',
                                            height: "70px",
                                            fontSize: '2rem',
                                            color: '#ffffff',
                                            borderRadius: '40px',
                                            background:
                                                'linear-gradient(90deg, rgb(241, 198, 255) -16.66%, rgb(189, 10, 248) 24.05%, rgb(54, 92, 252) 99.31%), rgba(255, 255, 255, 0.25)', '&:hover': {
                                                    transform: 'scale(1.2)',
                                                },
                                        }}>
                                        ${totalEarnings?.toFixed(2)}
                                    </UnstyledButton>
                                </Group>

                                {/* TRANSACTION TABLE BALANCE */}

                                <Group sx={{ gap: '2px', display: 'flex', flexDirection: 'column', }}>
                                    <Text mb={10} color="dimmed" transform="uppercase" weight={700} size="xs" >
                                        Balance Due
                                    </Text>
                                    <UnstyledButton px={30}
                                        sx={{
                                            //margin: '0.5rem 0 0.5rem',
                                            width: '-webkit-fill-available !important',
                                            height: "70px",
                                            fontSize: '2rem',
                                            color: '#ffffff',
                                            borderRadius: '40px',
                                            background:
                                                'linear-gradient(90deg, rgb(241, 198, 255) -16.66%, rgb(189, 10, 248) 24.05%, rgb(54, 92, 252) 99.31%), rgba(255, 255, 255, 0.25)', '&:hover': {
                                                    transform: 'scale(1.2)',
                                                },
                                        }}>
                                        ${balance.toFixed(2)}
                                    </UnstyledButton>
                                </Group>

                                {/* TOTAL PAID OUT */}

                                <Group sx={{ gap: '2px', display: 'flex', flexDirection: 'column', }}>
                                    <Text mb={10} color="dimmed" transform="uppercase" weight={700} size="xs" >
                                        PAID EARNINGS TO DATE
                                    </Text>
                                    <UnstyledButton px={30}
                                        sx={{
                                            //margin: '0.5rem 0 0.5rem',
                                            width: '-webkit-fill-available !important',
                                            height: "70px",
                                            fontSize: '2rem',
                                            color: '#ffffff',
                                            borderRadius: '40px',
                                            background:
                                                'linear-gradient(90deg, rgb(241, 198, 255) -16.66%, rgb(189, 10, 248) 24.05%, rgb(54, 92, 252) 99.31%), rgba(255, 255, 255, 0.25)', '&:hover': {
                                                    transform: 'scale(1.2)',
                                                },
                                        }}>
                                        ${paidToDate?.toFixed(2)}
                                    </UnstyledButton>
                                </Group>

                            </Group>
                        </Paper>


                        <Paper withBorder p="md" pb={30} mt={20} radius="xl" sx={{
                            boxShadow: "1px -1px 12px 3px #0cfbf8", opacity: '0.85',
                            position: 'relative', backgroundColor: '#292b30',
                        }}>
                            <Title order={3} mb={0} >
                                Your Broker Transactions (Earnings and Payouts)
                            </Title>
                            <Text mb={0} color='gray.500'>
                                This is a list of all your transactions
                            </Text>
                            <LoadingOverlay visible={loading} overlayBlur={2} radius="xl" zIndex={999} />


                            {/* TRANSACTION HISTORY */}

                            {records.length === 0 ?
                                <p style={styles.emptyRecords}>No Data to Display</p>
                                :
                                <>
                                    <ScrollArea offsetScrollbars scrollbarSize={14} type="always"
                                styles={(theme) => ({
                                    height: '580px',
                                    scrollbar: {
                                        '&, &:hover': {
                                            background:
                                                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                        },

                                        '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                                            backgroundColor: theme.colors.red[6],
                                        },

                                        '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
                                            backgroundColor: theme.colors.blue[6],
                                        },
                                    },

                                    corner: {
                                        opacity: 1,
                                        background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                    },
                                })}>
                                        <Table highlightOnHover >
                                            <thead>
                                                <tr style={{
                                                    backgroundColor: "black",
                                                }}>
                                                    {columns.map((column) => (
                                                        <th
                                                            key={column.id}
                                                            style={{ textAlign: "center", minWidth: column.minWidth }}
                                                        >
                                                            {column.label}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {records
                                                    .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
                                                    .map((record: any, index: React.Key) => {
                                                        return (
                                                            <tr role="checkbox" tabIndex={-1} key={index}>

                                                                {/* <td style={{ textAlign: "center", }}>
                                                                    {moment(record.orderdate).format('LLL')}
                                                                </td> */}
                                                                <td style={{ textAlign: "center", }}>
                                                                    {record.ref_id}
                                                                </td>
                                                                <td style={{ textAlign: "center", }}>
                                                                    {record.level}
                                                                </td>
                                                                <td style={{ textAlign: "center", }}>
                                                                    {record.nftname}
                                                                </td>
                                                                <td style={{ textAlign: "center", }}>
                                                                    {getEllipsisTxt(record.txid, 7)}
                                                                </td>

                                                                <td style={{ textAlign: "center", }}>

                                                                    {record.type === 'Income' ?
                                                                        <Button style={{
                                                                            width: "130px",
                                                                            padding: '5px',
                                                                            marginTop: '5px',
                                                                            marginBottom: '5px',
                                                                            color: 'white',
                                                                            borderRadius: '40px',
                                                                            backgroundColor: '#107e0eb3',
                                                                            //boxShadow: '0 0px 15px #107e0eb3',
                                                                        }}>
                                                                            {record.amount.toFixed(2)}
                                                                        </Button>

                                                                        :

                                                                        <Button style={{
                                                                            width: "130px",
                                                                            padding: '5px',
                                                                            marginTop: '5px',
                                                                            marginBottom: '5px',
                                                                            fontWeight: '500',
                                                                            color: 'white',
                                                                            borderRadius: '40px',
                                                                            backgroundColor: '#C70000',
                                                                            //boxShadow: '0 0px 15px #C70000',
                                                                        }}>
                                                                            {record.amount.toFixed(2)}
                                                                        </Button>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                        <Group>
                                            <Select
                                                style={{ width: "140px" }}
                                                size='sm'
                                                value={rowsPerPage}
                                                onChange={setRowsPerPage}
                                                data={[
                                                    //@ts-ignore
                                                    { value: 10, label: 'Show 10 Rows' },
                                                    //@ts-ignore
                                                    { value: 20, label: 'Show 20 Rows' },
                                                    //@ts-ignore
                                                    { value: 30, label: 'Show 30 Rows' },
                                                    //@ts-ignore
                                                    { value: 40, label: 'Show 40 Rows' },
                                                ]}
                                            />

                                            <Text data-mantine-composable>
                                                Go to page:{" "}
                                                <NumberInput
                                                    defaultValue={1}
                                                    onChange={(val) => {
                                                        const pageSelect = val ? Number(val) : 0;
                                                        setPage(pageSelect);
                                                    }}
                                                    style={{ width: "100px", display: "inline-flex" }}
                                                />
                                            </Text>
                                            <Pagination
                                                page={page}
                                                onChange={setPage}
                                                total={pageCount}
                                                boundaries={1}
                                                initialPage={0}
                                            />
                                        </Group>

                                    </ScrollArea>
                                </>
                            }
                        </Paper>
                        {/* Page End */}
                    </Container>
                </Box >
                :

                <div style={{ justifyContent: 'center' }}>
                    <p style={{ textAlignLast: 'center' }}>Please login or Register below</p>
                    <Button component={Link} to={"/login"}
                        sx={(theme) => ({
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                            marginTop: '5px',
                            marginBottom: '15px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'flex',
                            width: '200px',
                            flexDirection: 'column',
                        })} >
                        <AiOutlineLogin size={24} style={{ marginRight: 8 }} />
                        <span>Login</span>
                    </Button>

                    <Button component={Link} to={"/register"}
                        sx={(theme) => ({
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                            marginTop: '5px',
                            marginBottom: '15px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'flex',
                            width: '200px',
                            flexDirection: 'column',
                        })} >
                        <Sailboat size={24} style={{ marginRight: 8 }} />
                        <span>Register</span>
                    </Button>

                    <Divider size="md" color="#000000" my={20} sx={{ width: '100%', }} />

                </div>
            }
            <Footer />

        </Container >

    )
}
