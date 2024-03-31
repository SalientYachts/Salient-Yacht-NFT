import * as React from 'react';

import { Paper, Table, ScrollArea } from '@mantine/core'



const rows = [
  { name: 'Membership NFTs', percentage: "25%", amount: "2'500'000", duration: "50% for 1 Year" },
  { name: 'Private Sale', percentage: "8%", amount: "800'000", duration: "3 Months" },
  { name: 'Public Sale', percentage: "15%", amount: "1'500'000", duration: "..." },
  { name: 'Team', percentage: "10%", amount: "1'000'000", duration: "10 Years" },
  { name: 'Staking Rewards', percentage: "35%", amount: "3'500'000", duration: "..." },
  { name: 'Liquidity', percentage: "4%", amount: "400'000", duration: "5 Years" },
  { name: 'NFT Bonus', percentage: "3%", amount: "300'000", duration: "Initial 5 Yachts" },

];



export default function TokenTable() {
  return (
    <Paper withBorder p="md" pb={30} mt={20} radius="xl" sx={{
      boxShadow: "1px -1px 12px 3px #0cfbf8", opacity: '0.85',
      position: 'relative', backgroundColor: '#292b30', width: '100%',
    }}>
      <ScrollArea sx={{
        '@media (min-width: 770px)': {
          height: 310
        },

        '@media (max-width: 769px)': {
          height: 440
        },
      }} type="auto" offsetScrollbars scrollbarSize={14}>
        <Table highlightOnHover >
          <thead>
            <tr style={{
              backgroundColor: "black",
            }}>
              <th style={{ textAlign: "center", }}>Activity</th>
              <th style={{ textAlign: "center", }}>Allocation</th>
              <th style={{ textAlign: "center", }}>SYP</th>
              <th style={{ textAlign: "center", }}>Vesting Period</th>

            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td >
                  {row.name}
                </td>
                <td style={{ textAlign: "center", }}>{row.percentage}</td>
                <td align="right">{row.amount}</td>
                <td style={{ textAlign: "center", }}>{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
