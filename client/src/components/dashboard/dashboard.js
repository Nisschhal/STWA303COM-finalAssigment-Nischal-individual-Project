import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { candidateList } from "../../context/CandidateList";
const Dashboard = ({ state }) => {
  const { voter, setVoter } = useContext(UserContext);
  const [candidates, setCandidates] = useState([
    // {
    //   candidateName: "Pushpa Kamal Dahal",
    //   partyName: "CPN (Maoist)",
    //   partySymbol: "BJP",
    //   stateCode: 10,
    //   constituencyCode: 10,
    //   voteCount: 0,
    // },
    // {
    //   candidateName: "Sher Bahadur Deuba",
    //   partyName: "Nepali Congress",
    //   partySymbol:
    //     "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_of_the_Communist_Party_of_Nepal_%28Maoist_Centre%29.png",
    //   stateCode: 10,
    //   constituencyCode: 10,
    //   voteCount: 0,
    // },
    // {
    //   candidateName: "KP Oli",
    //   partyName: "CPN-UML",
    //   partySymbol:
    //     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Flag_of_CPN_%28UML%29.svg/1280px-Flag_of_CPN_%28UML%29.svg.png",
    //   stateCode: 10,
    //   constituencyCode: 10,
    //   voteCount: 0,
    // },
    // {
    //   candidateName: "nisal",
    //   partyName: "BJP",
    //   partySymbol: "BJP",
    //   stateCode: 10,
    //   constituencyCode: 10,
    //   voteCount: 0,
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

  const getWinner = async () => {
    const { candidateName, partyName, partyFlag, voteCount } =
      await contract.getWinner();
    setVoter({ ...voter, winner: candidateName, winningParty: partyName });
  };

  return (
    <div>
      <h1
        class="text-center"
        style={{
          padding: "10px",
          width: "20%",
          margin: "10px auto",
          backgroundColor: "#02e0eb",
          borderRadius: "20px",
        }}
      >
        Candidates
      </h1>

      <div className="container" style={{ width: "100%" }} key={Math.random()}>
        <table>
          <thead>
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

              <th
                style={{
                  backgroundColor: "#96D4D4",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "400px",
                }}
              >
                Total Vote
              </th>
            </tr>
          </thead>

          {candidates.map((candidate) => (
            <tr>
              <td
                style={{
                  backgroundColor: "#96D4D4",
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
                  backgroundColor: "#96D4D4",
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
                  backgroundColor: "#96D4D4",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "200px",
                }}
              >
                <img
                  src={candidate.partyFlag}
                  alt=""
                  width="100px"
                  height={"100px"}
                />
              </td>
              <td
                style={{
                  backgroundColor: "#96D4D4",
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
                  backgroundColor: "#96D4D4",
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
                  backgroundColor: "#96D4D4",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "50px",
                }}
              >
                {candidate.voteCount.toString()}
              </td>
            </tr>
          ))}
        </table>
        <div
          className="winner-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5rem",
          }}
        >
          <img
            src="https://www.harwich-ma.gov/sites/g/files/vyhlif7091/f/styles/news_image/public/news/election-results-clipart-1.jpg?itok=7XGy3pjt"
            alt=""
            width={"100px"}
            height={"100px"}
          />
          <button className="btn-winner btn btn-primary " onClick={getWinner}>
            Get Winner
          </button>
          {true && (
            <div className="winner text-center">
              <h3>{`Winning Party: ${voter.winningParty}`} </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
