// import { useWeb3 } from "./useWeb3";
// //import { Select, SelectProps, forwardRef } from "@chakra-ui/react";
// import { forwardRef, useMemo } from "react";
// import { ChainId, SUPPORTED_CHAIN_IDS } from "./network";
// import React = require("react");

// import { Select, SelectProps } from "@mantine/core";

// export interface SupportedNetworkSelectProps
//   extends Omit<SelectProps, "children"> {
//   disabledChainIds?: ChainId[];
//   disabledChainIdText?: string;
// }

// export const SupportedNetworkSelect = forwardRef<
//   SupportedNetworkSelectProps,
//   "select"
// >(
//   (
    
//     ref,
//   ) => {
//     const { getNetworkMetadata } = useWeb3();
//     const testnets = useMemo(() => {
//       return SUPPORTED_CHAIN_IDS.map((supportedChain) => {
//         return getNetworkMetadata(supportedChain);
//       }).filter((n) => n.isTestnet);
//     }, [getNetworkMetadata]);

//     const mainnets = useMemo(() => {
//       return SUPPORTED_CHAIN_IDS.map((supportedChain) => {
//         return getNetworkMetadata(supportedChain);
//       }).filter((n) => !n.isTestnet);
//     }, [getNetworkMetadata]);
//     return (
//       <Select  ref={ref}>
//         <option disabled value={-1}>
//           Select Network
//         </option>
//         <optgroup label="Mainnets">
//           {mainnets.map((mn) => (
//             <option
//               key={mn.chainId}
//               value={mn.chainId}
              
//             >
//               {mn.chainName} ({mn.symbol})
//             </option>
//           ))}
//         </optgroup>
//         <optgroup label="Testnets">
//           {testnets.map((tn) => (
//             <option
//               key={tn.chainId}
//               value={tn.chainId}
//             >
//               {tn.chainName} ({tn.symbol})
//             </option>
//           ))}
//         </optgroup>
//       </Select>
//     );
//   },
// );


export {}   // delete if page is used