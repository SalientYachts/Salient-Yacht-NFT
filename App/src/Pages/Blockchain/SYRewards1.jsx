// import * as React from 'react';
// import { useState, useEffect } from "react";
// import { SALIENT_YACHT_NFT_ADDR, SALIENT_YACHT_NFT_ABI, SALIENT_YAGHT_STREAM_ABI } from "../../constants";
// import {  Button } from "antd";
// import { useMoralis } from "react-moralis";


// const styles = {
//   fontH: { 
//     color: "#1fc7d3",
//   },
// }

// function SYRewards() {
//   const [expanded, setExpanded] = useState('');
//   const { Moralis } = useMoralis();

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   let [obj, ] = useState({});
//   const [streamContractAddr, setStreamContractAddr] = useState();
//   const [userStreams, setUserStreams] = useState([]);
//   //const [withdrawalAmt, setWithdrawalAmt] = useState();
//   const [streamsData, ] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true)
//   const [streamBalance, setStreamBalance] = useState('')
//   //const [currentNftPrice, setCurrentNftPrice] = useState(0);
//   const [, updateState] = useState();
//   const forceUpdate = React.useCallback(() => updateState({}), []);


//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const getAllStreamsData = async () => {
//     console.log("----> userStreams(length): " + userStreams.length);
//     if (userStreams.length > 0) {
//       for (let i = 0; i < userStreams.length; i++) {
//         const aStream = userStreams[i];
//         const aStreamData = await Moralis.executeFunction({
//           functionName: 'getStream',
//           params: {
//             streamId: aStream
//           },
//           ...streamContractOptions
//         });
//         console.log("-----> aStreamData: " + JSON.stringify(aStreamData));
//         streamsData.push(aStreamData);
//       }
//     }
//   };
  

//   const handleChange = (panel) => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//     if (panel === 'panel1') {
//       if (userStreams.length === 0) {
//         getRewardStreams()
//       }
//     }
//   };

//   const updateCheckBalance = (row, rowIndex) => {
//     if (row.remainingBalance == null) {
//       return <Button onClick={() => {
//         getClaimable(row.streamId, rowIndex)
//         getStreamData(row.streamId, rowIndex)
//       }}>Get Balances</Button>
//     }
//     else {
//       return null
//     }
//   }

//   const getStreamData = async (streamId, index) => {
//     console.log("-----> selectedStreamData: " + streamId);
//     const aStreamData = await Moralis.executeFunction({
//       functionName: 'getStream',
//       params: {
//         streamId: streamId
//       },
//       ...streamContractOptions
//     });
//     console.log("-----> aStreamData: " + JSON.stringify(aStreamData));
//     let oldRow = tableData;
//     oldRow[index].remainingBalance = parseFloat(Moralis.Units.FromWei(aStreamData.remainingBalance,).toFixed(6))
//     setTableData(oldRow)
//     forceUpdate()
//   }

//   const getClaimable = async (streamId, index) => {
//     console.log("-----> selectedStream: " + streamId);
//     const currentUser = Moralis.User.current();
//     const streamBalance = await Moralis.executeFunction({
//       functionName: 'balanceOf',
//       params: {
//         streamId: streamId,
//         who: currentUser.get("ethAddress")
//       },
//       ...streamContractOptions
//     });
//     console.log("----> streamBalance: " + streamBalance);
//     let oldRow = tableData;
//     oldRow[index].Claimable = parseFloat(Moralis.Units.FromWei(streamBalance,).toFixed(6))
//     setTableData(oldRow)
//     forceUpdate()
//   }

//   const getAllBalances = () => {
//     tableData.forEach((el, index) => {
//       getClaimable(el.streamId, index)
//       getStreamData(el.streamId, index)
//     })
//   }

//   const nftContractOptions = {
//     contractAddress: SALIENT_YACHT_NFT_ADDR,
//     abi: SALIENT_YACHT_NFT_ABI,
//   };

//   const streamContractOptions = {
//     contractAddress: streamContractAddr,
//     abi: SALIENT_YAGHT_STREAM_ABI,
//   };

//   const streamContractOptions_2 = {
//     chain: "0xa869",
//     address: streamContractAddr,
//     abi: SALIENT_YAGHT_STREAM_ABI,
//   };

//   const getBalanceofStreams = async () => {
//     console.log("----> userStreams(length): " + userStreams.length);
//     console.log("----> userStreams: " + JSON.stringify(userStreams));
//     const currentUser = Moralis.User.current();
//     console.log("----> currentUser.get('ethAddress'): " + currentUser.get("ethAddress"));
//     if (userStreams.length > 0) {
//       const userStreamsIdList = userStreams.map(Number);
//       console.log("-----> userStreamsIdList: " + JSON.stringify(userStreamsIdList));
//       // executeFunction
//       // runContractFunction

//       const balaceOfStreams = await Moralis.executeFunction({
//         functionName: 'balanceOfStreams',
//         params: {
//           streamIdList: userStreams,
//           who: currentUser.get("ethAddress")
//         },
//         ...streamContractOptions
//       });
//       setStreamBalance(balaceOfStreams);

      
//       console.log("----> balaceOfStreams: " + JSON.stringify(balaceOfStreams));
//     }
//   }

//   const getRewardStreams = async () => {
//     //get the stream contract address
//     const rewardAddress = await Moralis.executeFunction({ functionName: 'streamContract', params: {}, ...nftContractOptions });
//     console.log("----> rewardAddress = ", rewardAddress);
//     setStreamContractAddr(rewardAddress);

//     //query Moralis's event table RewardStreamCreatedEvent to get the list of streams for the current user
//     const currentUser = Moralis.User.current();
//     console.log("-----> currentUser.ethAddress: ", currentUser.get("ethAddress"));

//     const streamEvtTbl = Moralis.Object.extend("SYONEStreamCreatedVTwo");
//     const query = new Moralis.Query(streamEvtTbl);
//     query.equalTo("recipient", currentUser.get("ethAddress").toLowerCase());
//     query.equalTo("sender", SALIENT_YACHT_NFT_ADDR.toLowerCase());
//     const qtyResult = await query.find();
//     console.log("qtyResult ", qtyResult);
//     console.log("Successfully retrieved ", qtyResult.length, " Stream records.");
//     console.log('object.id - nftTokenId - streamId - startTime - stopTime - ratePerSecond');
//     let arr = [];
//     let tempUserStream = []
//     for (let i = 0; i < qtyResult.length; i++) {
//       const object = qtyResult[i];
//       console.log(object.id, ' - ', object.get('nftTokenId'), ' - ', object.get('streamId'), ' - ', object.get('startTime'), ' - ', object.get('stopTime'), ' - ', object.get('ratePerSecond'),);
//       obj = {
//         nftTokenId: object.get('nftTokenId'),
//         streamId: object.get('streamId'),
//         startTime: new Date(object.get('startTime') * 1000).toLocaleString('en-US', { year: "numeric", month: "2-digit", day: "numeric" }),
//         stopTime: new Date(object.get('stopTime') * 1000).toLocaleString('en-US', { year: "numeric", month: "2-digit", day: "numeric" }),
//         ratePerSecond: parseFloat(Moralis.Units.FromWei(object.get('ratePerSecond') * 60 * 60 * 24,).toFixed(6)),
//         remainingBalance: null,
//         Claimable: null
//       }
//       arr.push(obj);
//       tempUserStream.push(object.get('streamId'));
//     }
//     setUserStreams(tempUserStream)
//     setTableData(arr)
//     console.log("-----> userStreams: " + JSON.stringify(userStreams));
//     console.log(arr);
//     setLoading(false);
//   }

//   const claimAll = async () => {
//     console.log("----> userStreams(length): " + userStreams.length);
//     console.log("----> userStreams: " + JSON.stringify(userStreams));
//     const currentUser = Moralis.User.current();
//     console.log("----> currentUser.get('ethAddress'): " + currentUser.get("ethAddress"));
//     if (userStreams.length > 0) {
//       const opResult = await Moralis.executeFunction({
//         functionName: 'withdrawFromStreams',
//         params: {
//           streamIdList: userStreams,
//         },
//         ...streamContractOptions
//       });
//       console.log("----> opResult: " + JSON.stringify(opResult));
//     }
//   }

//   const columns = [
//     {
//       id: 'nftTokenId',
//       label: 'NFT ID',
//       minWidth: 30,
//       align: 'center',
//     },
//     {
//       id: 'streamId',
//       label: 'Stream ID',
//       minWidth: 50,
//       align: 'center',
//     },
//     {
//       id: 'startTime',
//       label: 'Start Time',
//       minWidth: 100,
//       align: 'center',
//     },
//     {
//       id: 'stopTime',
//       label: 'Stop Time',
//       minWidth: 80,
//       align: 'center'
//     },
//     {
//       id: 'ratePerSecond',
//       label: 'Rate Per Day',
//       minWidth: 100,
//       align: 'center'
//     },
//     {
//       id: 'remainingBalance',
//       label: 'NFT WIND Balance',
//       minWidth: 100,
//       align: 'center',
//     },
//     {
//       id: 'loadAll',
//       label: <Button onClick={getAllBalances} >Load All</Button>,
//       maxWidth: 100,
//       align: 'center',
//     },
//     {
//       id: 'Claimable',
//       label: 'Claimable',
//       minWidth: 100,
//       align: 'right',
//     },
//   ];

//   useEffect(() => {
//     if (userStreams.length > 0) {
//       getBalanceofStreams();
//     }
//     console.log("Use Effect Run")
//   }, [userStreams])

//   return (
//     <div style={{ opacity: '0.8' }}>
//       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
//         <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
//           <Typography style={styles.fontH}>Your "Salient One" NFT Yacht Shares</Typography>
//         </AccordionSummary>

//         <AccordionDetails style={styles.fontH}>
//         {loading ? (
//           <CircularProgress color="primary" sx={{ margin: '1rem auto', display: 'block' }} />
//         ) : (
//           <>

//           Total Rewards Available: <Chip sx={{ ml: '1em', p: '0.5em' }} icon={<SavingsTwoToneIcon />} label={parseFloat(Moralis.Units.FromWei(streamBalance,).toFixed(6))} color="success" variant="outlined" />
//           <Button id="claim" variant='outlined' onClick={claimAll} style={{ float: 'right', marginLeft: 'auto', marginRight: '0.8rem', color: '#7346d7', background: 'transparent' }}>Claim All</Button>
//           <Divider size="md" color="#1976d2" sx={{ width: '90%', margin: '1rem' }} />

//           <Paper sx={{ width: '100%', overflow: 'hidden', }}>
            
//                 <TableContainer sx={{ marginTop: '10px', maxHeight: 440, }}>
//                   <Table stickyHeader aria-label="sticky table">
//                     <TableHead>
//                       <TableRow>
//                         {columns.map((column) => (
//                           <TableCell
//                             key={column.id}
//                             align={column.align}
//                             style={{ minWidth: column.minWidth }}
//                           >
//                             {column.label}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {tableData
//                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                         .map((row, rowIndex) => {
//                           return (
//                             <TableRow hover role="checkbox" tabIndex={-1} key={row.nftTokenId}>
//                               <TableCell align='center'>
//                                 {row.nftTokenId}
//                               </TableCell>
//                               <TableCell align='center'>
//                                 {row.streamId}
//                               </TableCell>
//                               <TableCell align='center'>
//                                 {row.startTime}
//                               </TableCell>
//                               <TableCell align='center'>
//                                 {row.stopTime}
//                               </TableCell>
//                               <TableCell align='center'>
//                                 {row.ratePerSecond}
//                               </TableCell>
//                               <TableCell align='center'>
//                                 {row.remainingBalance}
//                               </TableCell>
//                               <TableCell align='center'>
//                                 {updateCheckBalance(row, rowIndex)}
//                               </TableCell>
//                               <TableCell align='center'>
//                                 {row.Claimable}
//                               </TableCell>
//                             </TableRow>
//                           );
//                         })}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <TablePagination
//                   rowsPerPageOptions={[10, 25, 100]}
//                   component="div"
//                   count={userStreams.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
             
           
//           </Paper>
//           </>
//           )}
//         </AccordionDetails>
        
        
//       </Accordion>
//         <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
//         <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
//           <Typography style={styles.fontH}>SYNFT2 Shares</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Coming Soon ...
//           </Typography>
//         </AccordionDetails>
//       </Accordion>

      

//       <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//         <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
//           <Typography style={styles.fontH}>SYNFT2 Shares</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Coming Soon ...
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//     </div >
//   );
// }

// export default SYRewards;