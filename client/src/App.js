import abi from "./contract/Ballot.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import chai from "./chai.png";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VoterLanding } from "./components/VoterLanding";
import Candidate from "./components/Candidate";
import { CandidateLanding } from "./components/CandidateLanding";
import { Navbar } from "./components/navbar/Navbar";
import Voting from "./components/voting/Voting";
import { UserContext } from "./context/UserContext";
import Login from "./components/login/Login";
import NewVoter from "./components/create-voter/NewVoter";
import Dashboard from "./components/dashboard/dashboard";
import NewCandidate from "./components/create-candidate/NewCandidate";
import SignUp from "./components/signup/Sign-up";
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [voter, setVoter] = useState({
    voterCitizenNo: null,
    voterName: "",
    age: null,
    stateCode: null,
    constituencyCode: null,
    voted: null,
    isAlive: null,
    votedTo: null,
    loggedIn: false,
    winner: "",
    winningParty: "",
    owner: null,
  });
  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x28E6D72435e03Fd379D31548a415E955ab02C222";
 
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);
  // console.log(state);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ voter, setVoter }}>
          <Navbar account={account} state={state} />
          <Routes>
            {/* <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
          <img src={chai} className="img-fluid" alt=".." width="100%" />
          <p
            class="text-muted lead "
            style={{ marginTop: "10px", marginLeft: "5px" }}
          >
            <small>Connected Account - {account}</small>
          </p> */}

            {/* <div className="container"> */}
            <Route
              path="/"
              element={<Dashboard state={state} account={account} />}
            />
            <Route
              path="/login"
              element={<Login state={state} account={account} />}
            />
            <Route
              path="/voters"
              element={<VoterLanding state={state} account={account} />}
            />
            <Route
              path="/candidates"
              element={<CandidateLanding state={state} account={account} />}
            />
            <Route
              path="/voting"
              element={<Voting state={state} account={account} />}
            />
            <Route
              path="/sign-up"
              element={<SignUp state={state} account={account} />}
            />
            <Route
              path="/voter-sign-up"
              element={<NewVoter state={state} account={account} />}
            />
            <Route
              path="/candidate-sign-up"
              element={<NewCandidate state={state} account={account} />}
            />
            {/* </div> */}
            {/* </div> */}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
