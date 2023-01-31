import { useState, useEffect, useContext } from "react";
import { CandidateCard } from "./CandidateCard";
import { UserContext } from "../../context/UserContext";

const Voting = ({ state }) => {
  const { voter, setVoter } = useContext(UserContext);

  const [candidates, setCandidates] = useState([
    // {
    //   candidateName: "nisal",
    //   partyName: "BJP",
    //   partySymbol: "BJP",
    //   stateCode: 10,
    //   constituencyCode: 10,
    // },
    // {
    //   candidateName: "nisal",
    //   partyName: "BJP",
    //   partySymbol: "BJP",
    //   stateCode: 10,
    //   constituencyCode: 10,
    // },
    // {
    //   candidateName: "nisal",
    //   partyName: "BJP",
    //   partySymbol: "BJP",
    //   stateCode: 10,
    //   constituencyCode: 10,
    // },
    // {
    //   candidateName: "nisal",
    //   partyName: "BJP",
    //   partySymbol: "BJP",
    //   stateCode: 10,
    //   constituencyCode: 10,
    // },
  ]);
  const { contract } = state;

  useEffect(() => {
    const ShowCandidates = async () => {
      const candidates = await contract.getAllCandidates();
      setCandidates(candidates);
    };
    contract && ShowCandidates();
  }, [contract]);

  // const vote = async () => {
  //   const vote = await contract.vote(
  //     // candidateCitizen,
  //     // voterCitizen,
  //     Date.now()
  //   );
  //   console.log("User Voted Successfully!");
  // };

  return (
    <div>
      {!voter.voted ? (
        candidates.map((candidate) => (
          <CandidateCard
            key={Math.random()}
            candidateCitizenNo={candidate.candidateCitizenNo}
            name={candidate.candidateName}
            partyName={candidate.partyName}
            partySymbol={candidate.partyFlag}
            state={state}
          />
        ))
      ) : (
        <div
          className="voted-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            background: "#10ffb4",
          }}
        >
          <div className="voted-card">You have already Voted!!</div>
          <p className="voted-to">{`Voted casted to ${voter.votedTo}`}</p>
        </div>
      )}
    </div>
  );
};
export default Voting;
