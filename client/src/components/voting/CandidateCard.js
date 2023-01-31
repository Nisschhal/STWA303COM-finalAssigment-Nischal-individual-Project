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
      setVoter({ ...voter, voted: true });
    } catch (error) {
      if (error.message.includes("Already voted!"))
        alert("You have already Voted!!");
    }
    // console.log(typeof parsedCandidateNo, typeof parsedVoterCitize);
    console.log(name, candidateCitizenNo, partyName, partySymbol);
  };
  return (
    <>
      {!voted ? (
        <div className="party-group">
          <div className="party-card" style={{ position: "relative" }}>
            <div class="party-container">
              <div className="party-icon">
                <img src={partySymbol} alt="" />
              </div>
              <div className="party-rep">{name}</div>
              <div className="party-name">{partyName}</div>
              {/* <input
              type="radio"
              id={partyName}
              value={partyName}
              name="voted-party"
              checked={voteTo === partyName}
              onChange={partyClicked}
            /> */}

              <button
                className="btn btn-primary"
                onClick={partyClicked}
                // style={{ position: "absolute" }}
              >
                Vote
              </button>
            </div>
          </div>
          {/* <div class="party-container">
        <div className="party-icon">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Flag_of_CPN_%28UML%29.svg/2560px-Flag_of_CPN_%28UML%29.svg.png"
            alt=""
          />
        </div>
        <div className="party-name">Communist Party of Nepal</div>
        <input
          type="radio"
          id="congress"
          value={"congress"}
          name="voted-party"
          checked={voteTo === "congress"}
          onChange={partyClicked}
        />
      </div>
      <div class="party-container">
        <div className="party-icon">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Flag_of_CPN_%28UML%29.svg/2560px-Flag_of_CPN_%28UML%29.svg.png"
            alt=""
          />
        </div>
        <div for="ml" className="party-name">
          Communist Party of Nepal
        </div>
        <input
          type="radio"
          id="ml"
          value={"ml"}
          name="voted-party"
          checked={voteTo === "ml"}
          onChange={partyClicked}
        />
      </div> */}
        </div>
      ) : (
        <div className="voted-container">
          <div className="voted-card">You have already Voted!!</div>
          <p className="voted-to">{`Voted casted to ${voter.winner}`}</p>
        </div>
      )}
    </>
  );
};
