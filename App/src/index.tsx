import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/UserContext";
import { FlairProvider } from 'flair-sdk';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThirdwebProvider
        activeChain={activeChain}
        clientId="bf20f3e2e5d78187198b1dd6d8f041e1"
        autoConnect={true}
        sdkOptions={{
          gasless: {
            // By specifying a gasless configuration - all transactions will get forwarded to enable gasless transactions
            openzeppelin: {
              relayerUrl: "<open-zeppelin-relayer-url>", // your OZ Defender relayer URL
              relayerForwarderAddress: "<open-zeppelin-forwarder-address>", // the OZ defender relayer address (defaults to the standard one)
            },
            biconomy: {
              apiId: "biconomy-api-id", // your Biconomy API Id
              apiKey: "biconomy-api-key", // your Biconomy API Key
              deadlineSeconds: 123, // your Biconomy timeout preference
            },
          },
        }}
      >
        <FlairProvider>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
        </FlairProvider>
      </ThirdwebProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
