import { useState, useEffect } from "react";
const ShowCandidates = ({ state }) => {
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

  return (
    <div>
      <p style={{ textAlign: "center", marginTop: "20px" }}>Candidates</p>

      <div
        className="container-fluid"
        style={{ width: "100%" }}
        key={Math.random()}
      >
        <table>
          <tr>
            <th
              style={{
                // backgroundColor: "#96D4D4",
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
                // backgroundColor: "#96D4D4",
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
                // backgroundColor: "#96D4D4",
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
                // backgroundColor: "#96D4D4",
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
                // backgroundColor: "#96D4D4",
                border: "1px solid white",
                borderCollapse: "collapse",
                padding: "7px",
                width: "400px",
              }}
            >
              Constituency No.
            </th>
            <th
              style={{
                // backgroundColor: "#96D4D4",
                border: "1px solid white",
                borderCollapse: "collapse",
                padding: "7px",
                width: "400px",
              }}
            >
              Total Vote
            </th>
          </tr>
          {candidates.map((candidate) => (
            <tr>
              <td
                style={{
                  backgroundColor: "#042a6e",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "400px",
                }}
              >
                {candidate.candidateName}
              </td>
              <td
                style={{
                  backgroundColor: "#042a6e",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "400px",
                }}
              >
                {candidate.partyName}
              </td>
              <td
                style={{
                  backgroundColor: "#042a6e",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "400px",
                }}
              >
                {candidate.partyFlag}
              </td>
              <td
                style={{
                  backgroundColor: "#042a6e",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "400px",
                }}
              >
                {candidate.stateCode}
              </td>
              <td
                style={{
                  backgroundColor: "#042a6e",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "400px",
                }}
              >
                {candidate.constituencyCode}
              </td>
              <td
                style={{
                  backgroundColor: "#042a6e",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "400px",
                }}
              >
                {candidate.voteCount.toString()}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default ShowCandidates;
