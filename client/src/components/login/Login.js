import { ethers } from "ethers";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = ({ state, account }) => {
  const nav = useNavigate();
  const { voter, setVoter } = useContext(UserContext);

  const [error, setError] = useState(null);

  const { contract } = state;
  const [loginForm, setLoginForm] = useState({
    citizen: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  const login = async (event) => {
    event.preventDefault();
    try {
      const citizen = document.querySelector("#citizen").value;
      console.log(citizen, account[0], contract);

      // const amount = { value: ethers.utils.parseEther("0.001") };
      let {
        voterCitizenNo,
        voterName,
        age,
        stateCode,
        constituencyCode,
        voted,
        isAlive,
        votedTo,
      } = await contract.login(citizen, account[0]);
      //   await voter.wait();
      // voterCitizenNo = parseInt(voterCitizenNo.toString());
      console.log(
        voterCitizenNo,
        voterName,
        age,
        stateCode,
        constituencyCode,
        voted,
        isAlive,
        votedTo
      );
      // voterCitizenNo = voterCitizenNo.toString();
      setVoter({
        voterCitizenNo,
        voterName,
        age,
        stateCode,
        constituencyCode,
        voted,
        isAlive,
        votedTo,
        loggedIn: true,
      });
      console.log("-----------", voter);
      alert("Voter has been Logged In!!");
      nav("/voting");
    } catch (err) {
      console.log(err);
      alert("Credential invalid!!, Citizen and Account address doesn't match");
    }
    // await transaction.wait();
  };
  return (
    <>
      <div
        className="container-md form shadow-lg p-4"
        style={{ width: "50%", marginTop: "25px" }}
      >
        <h3 className="text-center"> Please Login to Vote!!</h3>
        <form onSubmit={login}>
          <div className="mb-3">
            <label className="form-label ">CitizenNo.</label>
            <input
              name="citizen"
              value={loginForm.citizen}
              type="number"
              className="form-control"
              id="citizen"
              onChange={onChangeHandler}
              placeholder="Enter Your Citizen No."
            />
          </div>

          {/* button */}
          <button type="submit" className="button" disabled={!state.contract}>
            LOGIN
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
