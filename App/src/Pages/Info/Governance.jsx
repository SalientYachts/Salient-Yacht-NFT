import { Container, Title,   Divider } from '@mantine/core'
import { Fade } from "react-awesome-reveal";

import React from 'react';

const Governance = () => {
    return (

        <div className="mainContainer">
            <Container sx={{maxWidth: 'false'}}>
                <Fade duration={2000}>
                    <div className="flex">

                    </div>
                    <Title order={1}  color="white" align="center" className="overview" sx={{ fontSize: "clamp(25px, 35px, 1rem)", }}>
                        Governance Program
                    </Title>
                </Fade>

                <Fade duration={2000}>
                    <Title order={4} color="white" align="center" sx={{ fontSize: "clamp(16px, 20px, 1rem)", }}>
                        View proposals below where you can vote on future projects or have a say over the yachts and charters <br/>
                        <br/>
                        Coming Soon after TGE / IDO ...
                    </Title>
                </Fade>
                <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

                <Title order={6} color="white" align="center" sx={{ margin: '2rem 0 2rem' }}>
                Our main SYP governance token can be used for voting on company decisions such as building yachts for charter or sale. The buyers of the fractional NFTs can vote on their NFT Yacht for asset specific decisions.<br/>
                <br/>
                The voting will be on matters such as buyout offers, sale offers, short or long terms leasing / charters etc. 
                <br/>
                Only SYP & NFT holders can vote. WIND token has no voting rights towards yacht assets.<br/>
                <br/>
                After our launch sale of SYP, the first order of voting will be whether the next yacht will be built for sale or for fractional yacht ownership. If “Salient One” has not been sold at the time of the vote, the governance program can then vote if this yacht build contract should be changed to fractional ownership for charter.
                </Title>

            </Container>

        </div>

    )
}
export default Governance;