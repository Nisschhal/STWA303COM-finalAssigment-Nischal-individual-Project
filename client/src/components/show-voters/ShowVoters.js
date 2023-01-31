import { useState, useEffect } from "react";
const ShowVoters = ({ state }) => {
  const [voters, setvoters] = useState([
    // { name: "nisal", age: 23, stateCode: 10, constituencyCode: 10 },
    // { name: "nisal", age: 23, stateCode: 10, constituencyCode: 10 },
    // { name: "nisal", age: 23, stateCode: 10, constituencyCode: 10 },
    // { name: "nisal", age: 23, stateCode: 10, constituencyCode: 10 },
  ]);
  const { contract } = state;

  useEffect(() => {
    const voterList = async () => {
      const voters = await contract.getAllVoters();
      console.log(voters);
      setvoters(voters);
    };
    contract && voterList();
  }, [contract]);

  return (
    <div>
      <h2 className="text-center ">Voter List</h2>

      {/* {console.log(voters)} */}
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
              Age
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
              Voted
            </th>
          </tr>
          {voters.map((voter) => (
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
                {voter.voterName}
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
                {voter.age}
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
                {voter.stateCode}
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
                {voter.constituencyCode}
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
                {voter.voted ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default ShowVoters;
