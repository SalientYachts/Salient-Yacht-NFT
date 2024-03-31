
import * as React from 'react'
import { useEffect } from 'react'
import { Box, Text, Title, Table, ScrollArea, } from '@mantine/core';




const UsersLevels: any = ({ levels, user }: {
    levels: any
    user: any
  }) => {



    const l7 = levels.levelSeven
    const l6 = levels.levelSix
    const l5 = levels.levelFive
    const l4 = levels.levelFour
    const l3 = levels.levelThree
    const l2 = levels.levelTwo
    const l1 = levels.levelOne

    const totalusers = l7 + l6 + l5 + l4 + l3 + l2 + l1

    const u7 = user.package.level_seven
    const u6 = user.package.level_six
    const u5 = user.package.level_five
    const u4 = user.package.level_four
    const u3 = user.package.level_three
    const u2 = user.package.level_two
    const u1 = user.package.level_one

    const totalrank = u7 + u6 + u5 + u4 + u3 + u2 + u1

    const totalcomm = (l1 * u1) + (l2 * u2) + (l3 * u3) + (l4 * u4) + (l5 * u5) + (l6 * u6) + (l7 * u7)

    const jobColors: Record<string, string> = {
        1: '#0288d1',       //Standard Broker
        2: '#388e3c',       //Silver Broker
        3: '#ffca28',       //Golden Broker
        4: '#9575cd',       //Epic Broker
    };

    useEffect(() => {
        //console.log('User user.package.level_seven: ', user.package.level_seven)
    }, [])


    return (



        <>

                <Title order={2} mb={0}  >
                    Level statistics
                </Title>
                <Text mb={0} color='gray.500'>
                    A total of your Affiliates (on level 1) and their sub-affiliates per level. <br />
                    Per Level Potential = Affliliates x Rewards
                </Text>
               
                    <Table highlightOnHover>
                        <thead>
                            <tr style={{
                                backgroundColor: "black",
                            }}>
                                <th style={{ textAlign: "center" }}>Level</th>
                                <th style={{ textAlign: "center" }}>Affiliates</th>
                                <th style={{ textAlign: "center" }}>Your Rewards</th>
                                <th style={{ textAlign: "center" }}>Level Potential</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr role="checkbox" tabIndex={-1} >
                                <th align='center'>
                                    Level One
                                </th>
                                <th align='center'>
                                    {levels.levelOne}
                                </th>
                                <th align='center'>
                                    {user.package.level_one}%
                                </th>
                                <th align='center'>
                                    {levels.levelOne * (user.package.level_one)}%
                                </th>
                            </tr>
                            <tr role="checkbox" tabIndex={-1} >
                                <th align='center'>
                                    Level Two
                                </th>
                                <th align='center'>
                                    {levels.levelTwo}
                                </th>
                                <th align='center'>
                                    {user.package.level_two}%
                                </th>
                                <th align='center'>
                                    {levels.levelTwo * (user.package.level_two)}%
                                </th>
                            </tr>
                            <tr role="checkbox" tabIndex={-1} >
                                <th align='center'>
                                    Level Three
                                </th>
                                <th align='center'>
                                    {levels.levelThree}
                                </th>
                                <th align='center'>
                                    {user.package.level_three}%
                                </th>
                                <th align='center'>
                                    {levels.levelThree * (user.package.level_three)}%
                                </th>
                            </tr>
                            <tr role="checkbox" tabIndex={-1} >
                                <th align='center'>
                                    Level Four
                                </th>
                                <th align='center'>
                                    {levels.levelFour}
                                </th>
                                <th align='center'>
                                    {user.package.level_four}%
                                </th>
                                <th align='center'>
                                    {levels.levelFour * (user.package.level_four)}%
                                </th>
                            </tr>
                            <tr role="checkbox" tabIndex={-1} >
                                <th align='center'>
                                    Level Five
                                </th>
                                <th align='center'>
                                    {levels.levelFive}
                                </th>
                                <th align='center'>
                                    {user.package.level_five}%
                                </th>
                                <th align='center'>
                                    {levels.levelFive * (user.package.level_five)}%
                                </th>
                            </tr>
                            <tr role="checkbox" tabIndex={-1} >
                                <th align='center'>
                                    Level Six
                                </th>
                                <th align='center'>
                                    {levels.levelSix}
                                </th>
                                <th align='center'>
                                    {user.package.level_six}%
                                </th>
                                <th align='center'>
                                    {levels.levelSix * (user.package.level_six)}%
                                </th>
                            </tr>
                            <tr role="checkbox" tabIndex={-1} >
                                <th align='center'>
                                    Level Seven
                                </th>
                                <th align='center'>
                                    {levels.levelSeven}
                                </th>
                                <th align='center'>
                                    {user.package.level_seven}%
                                </th>
                                <th align='center'>
                                    {levels.levelSeven * user.package.level_seven}%
                                </th>
                            </tr>
                            <tr role="checkbox" tabIndex={-1} style={{ backgroundColor: 'rgb(0 0 0)' }}>
                                <th align='center'>
                                    Totals
                                </th>
                                <th align='center'>
                                    {totalusers}
                                </th>
                                <th align='center'>
                                    {totalrank}%
                                </th>
                                <th align='center'>
                                    {totalcomm}%
                                </th>
                            </tr>


                        </tbody>
                    </Table>

        </>




    )
}

export default UsersLevels