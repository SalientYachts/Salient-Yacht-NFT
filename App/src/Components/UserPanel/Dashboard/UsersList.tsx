
import * as React from 'react' 
import { useState, } from 'react'
import moment from 'moment'
import NoDataFound from '../../NoDataFound'
import { Box, Text, Group, Paper, LoadingOverlay, Button, Title, Table, Pagination, UnstyledButton, NumberInput, Select, Container, } from '@mantine/core';






//@ts-ignore
const UsersList: any = ({ userList }) => {

    const [rank, setRank]: any = useState("Standard Broker")

    const rankColors: Record<string, string> = {
        1: '#0288d1',       //Standard Broker
        2: '#388e3c',       //Silver Broker
        3: '#ffca28',       //Golden Broker
        4: '#9575cd',       //Epic Broker
    };

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage]: any = useState(10);
    const pageCount = userList ? Math.ceil(userList.length / rowsPerPage) : 0;

    const columns = [
        {
            id: 'username',
            label: 'Username',
            minWidth: 30,
        },
        // {
        //     id: 'join_date',
        //     label: 'Joined On',
        //     minWidth: 50,
        // },
        {
            id: 'package_id',
            label: 'Broker Rank',
            minWidth: 100,
        },
        {
            id: 'source',
            label: 'Link Source',
            minWidth: 80,
        },
        {
            id: 'ref_id',
            label: 'Affiliate ID',
            minWidth: 100,
        },
    ];




    return (



          <>
                <Title order={2} mb={0}  >
                    Your Affiliate Registrations
                </Title>
                <Text mb={0} color='gray.500'>
                    This is a list of your direct affiliates
                </Text>
                {userList.length ?
                    <>

                        <Table highlightOnHover>
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
                                {userList
                                    .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
                                    .map((user: any, index: React.Key) => {
                                        return (
                                            <tr role="checkbox" tabIndex={-1} key={index}>
                                                <td style={{ textAlign: "center", }}>
                                                    {user.username}
                                                </td>
                                                {/* <td style={{ textAlign: "center", }}>
                                                    {moment(user.join_date).format('ll')}
                                                </td> */}
                                                <td style={{ textAlign: "center", }}>

                                                    {user.package_id == 1 ?  // Standard Broker
                                                        <Button style={{
                                                            width: "130px",
                                                            padding: '5px',
                                                            marginTop: '5px',
                                                            marginBottom: '5px',
                                                            color: 'black',
                                                            borderRadius: '40px',
                                                            backgroundColor: '#0288d1',
                                                            boxShadow: '0 0px 15px #0288d1',
                                                        }}>
                                                            Standard Broker
                                                        </Button>

                                                        : user.package_id == 2 ? //Silver Broker
                                                            <Button style={{
                                                                width: "130px",
                                                                padding: '5px',
                                                                marginTop: '5px',
                                                                marginBottom: '5px',
                                                                fontWeight: '500',
                                                                color: 'black',
                                                                borderRadius: '40px',
                                                                backgroundColor: '#388e3c',
                                                                boxShadow: '0 0px 15px #388e3c',
                                                            }}>
                                                                Silver Broker
                                                            </Button>

                                                            : user.package_id == 3 ? //Golden Broker
                                                                <Button style={{
                                                                    width: "130px",
                                                                    padding: '5px',
                                                                    marginTop: '5px',
                                                                    marginBottom: '5px',
                                                                    fontWeight: '700',
                                                                    color: 'black',
                                                                    borderRadius: '40px',
                                                                    backgroundColor: '#ffca28',
                                                                    boxShadow: '0 0px 15px #ffca28',
                                                                }}>
                                                                    Golden Broker
                                                                </Button>

                                                                : user.package_id == 4 && //Epic Broker
                                                                <Button style={{
                                                                    width: "130px",
                                                                    padding: '5px',
                                                                    marginTop: '5px',
                                                                    marginBottom: '5px',
                                                                    fontWeight: '900',
                                                                    color: 'black',
                                                                    borderRadius: '40px',
                                                                    backgroundColor: '#9575cd',
                                                                    boxShadow: '0 0px 15px #9575cd',
                                                                }}>
                                                                    Epic Broker
                                                                </Button>
                                                    }

                                                </td>
                                                <td style={{ textAlign: "center", }}>
                                                    {user.source}
                                                </td>
                                                <td style={{ textAlign: "center", }}>
                                                    {user.ref_id}
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

                    </>
                    : <NoDataFound />
                }
            </>



    )
}

export default UsersList