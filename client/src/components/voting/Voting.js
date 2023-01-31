import { useState, useEffect } from "react";
import { CandidateCard } from "./CandidateCard";
const Voting = ({ state }) => {
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

  const vote = async () => {
    const vote = await contract.vote(
      // candidateCitizen,
      // voterCitizen,
      Date.now()
    );
    console.log("User Voted Successfully!");
  };

  return (
    <div>
      {/* <table>
          <tr>
            <th
              style={{
                backgroundColor: "#96D4D4",
                border: "1px solid white",
                borderCollapse: "collapse",
                padding: "7px",
                width: "400px",
              }}
            >
              Name
            </th>
            <th
              style={{
                backgroundColor: "#96D4D4",
                border: "1px solid white",
                borderCollapse: "collapse",
                padding: "7px",
                width: "400px",
              }}
            >
              PartyName
            </th>
            <th
              style={{
                backgroundColor: "#96D4D4",
                border: "1px solid white",
                borderCollapse: "collapse",
                padding: "7px",
                width: "400px",
              }}
            >
              Party Symbol
            </th>
            <th
              style={{
                backgroundColor: "#96D4D4",
                border: "1px solid white",
                borderCollapse: "collapse",
                padding: "7px",
                width: "400px",
              }}
            >
              State No.
            </th>
            <th
              style={{
                backgroundColor: "#96D4D4",
                border: "1px solid white",
                borderCollapse: "collapse",
                padding: "7px",
                width: "400px",
              }}
            >
              Constituency No.
            </th>
          </tr> */}
      {candidates.map((candidate) => (
        // <tr>
        //   <td
        //     style={{
        //       backgroundColor: "#96D4D4",
        //       border: "1px solid white",
        //       borderCollapse: "collapse",
        //       padding: "7px",
        //       width: "400px",
        //     }}
        //   >
        //     {candidate.candidateName}
        //   </td>
        //   <td
        //     style={{
        //       backgroundColor: "#96D4D4",
        //       border: "1px solid white",
        //       borderCollapse: "collapse",
        //       padding: "7px",
        //       width: "400px",
        //     }}
        //   >
        //     {candidate.partyName}
        //   </td>
        //   <td
        //     style={{
        //       backgroundColor: "#96D4D4",
        //       border: "1px solid white",
        //       borderCollapse: "collapse",
        //       padding: "7px",
        //       width: "400px",
        //     }}
        //   >
        //     {candidate.partyFlag}
        //   </td>
        //   <td
        //     style={{
        //       backgroundColor: "#96D4D4",
        //       border: "1px solid white",
        //       borderCollapse: "collapse",
        //       padding: "7px",
        //       width: "400px",
        //     }}
        //   >
        //     {candidate.stateCode}
        //   </td>
        //   <td
        //     style={{
        //       backgroundColor: "#96D4D4",
        //       border: "1px solid white",
        //       borderCollapse: "collapse",
        //       padding: "7px",
        //       width: "400px",
        //     }}
        //   >
        //     {candidate.constituencyCode}
        //   </td>
        // </tr>
        <CandidateCard
          key={Math.random()}
          candidateCitizenNo={candidate.candidateCitizenNo}
          name={candidate.candidateName}
          partyName={candidate.partyName}
          partySymbol={candidate.partyFlag}
          state={state}
        />
      ))}
      {/* </table> */}

      <button onClick={vote}></button>
    </div>
  );
};
export default Voting;
