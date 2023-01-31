import React, { useState, useContext } from "react";
import "./CandidateCard.css";
import { UserContext } from "../../context/UserContext";
export const CandidateCard = ({
  name,
  candidateCitizenNo,
  partyName,
  partySymbol,
  state,
}) => {
  const { voter, setVoter } = useContext(UserContext);
  const [voted, setVoteTo] = useState(false);

  const { contract } = state;

  const partyClicked = async (e) => {
    // console.log(typeof 123n);
    e.preventDefault();
    // console.log(e.target.value);
    // setVoteTo(e.target.value);
    // const parsedCandidateNo = parseInt(candidateCitizenNo);
    // const parsedVoterCitize = BigNumber(`${voter.voterCitizen}`);
    // const parsedVoterCitize = BigInt(voter.voterCitizen);

    try {
      if (voter.voted) alert("You have already Voted!! \n Thank you!");
      const saveVote = await contract.vote(
        candidateCitizenNo,
        voter.voterCitizenNo
      );
      setVoter({ ...voter, voted: true, votedTo: partyName });
      alert("Vote cast Successfully!");
    } catch (error) {
      if (error.message.includes("Already voted!"))
        alert("You have already Voted!!");
    }
    // console.log(typeof parsedCandidateNo, typeof parsedVoterCitize);
    console.log(name, candidateCitizenNo, partyName, partySymbol);
  };
  return (
    <div className="party-group">
      <div className="party-group">
        <div class="party-container">
          <div class="party-icon">
            <img src={partySymbol} alt="" />
          </div>
          <div class="party-info">
            <div class="party-candidate">{name}</div>
            <div class="party-name">{partyName}</div>
          </div>
          <button class="vote" onClick={partyClicked}>
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};
