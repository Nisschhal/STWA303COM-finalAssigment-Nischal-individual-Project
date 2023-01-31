import { ethers } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = ({ state }) => {
  const nav = useNavigate();
  const { contract } = state;

  //   const [voterForm, setVoterForm] = useState({
  //     citizen: "",
  //     name: "",
  //     age: "",
  //     state: "",
  //     constituency: "",
  //   });

  //   const onChangeHandler = (e) => {
  //     e.preventDefault();
  //     setVoterForm({
  //       ...voterForm,
  //       [e.target.name]: e.target.value,
  //     });
  //   };
  //   const createCandidate = async (event) => {
  //     event.preventDefault();
  //     const citizen = document.querySelector("#citizen").value;
  //     const name = document.querySelector("#name").value;
  //     const age = document.querySelector("#age").value;
  //     const state = document.querySelector("#state").value;
  //     const consituency = document.querySelector("#constituency").value;

  //     console.log(citizen, name, age, state, consituency, contract);
  //     // const amount = { value: ethers.utils.parseEther("0.001") };
  //     const transaction = await contract.createVoter(
  //       citizen,
  //       name,
  //       age,
  //       state,
  //       consituency
  //     );
  //     await transaction.wait();
  //     console.log("Voter has been created Successfully!!");
  //   };
  return (
    <>
      {/* <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={createCandidate}>
          <div className="mb-3">
            <label className="form-label">CitizenNo.</label>
            <input
              name="citizen"
              value={voterForm.citizen}
              type="text"
              className="form-control"
              id="citizen"
              onChange={onChangeHandler}
              placeholder="Enter Your Citizen No."
            />
          </div> */}
      {/* Voter Name */}
      {/* <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              value={voterForm.name}
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
              onChange={onChangeHandler}
            />
          </div> */}
      {/* age */}
      {/* <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              name="age"
              value={voterForm.age}
              type="number"
              className="form-control"
              id="age"
              placeholder="Enter Your Age"
              onChange={onChangeHandler}
            />
          </div> */}
      {/* STATE CODE{" "} */}
      {/* <div className="mb-3">
            <label className="form-label">State No.</label>
            <input
              name="state"
              value={voterForm.state}
              type="number"
              className="form-control"
              id="state"
              placeholder="Enter Your State No."
              onChange={onChangeHandler}
            />
          </div> */}
      {/* CONSTITUENCY CODE */}
      {/* <div className="mb-3">
            <label className="form-label">Your Constituency Area No.</label>
            <input
              name="constituency"
              value={voterForm.constituency}
              type="number"
              className="form-control"
              id="constituency"
              placeholder="Enter Your Constituency Area No."
              onChange={onChangeHandler}
            />
          </div> */}
      {/* button */}
      {/* <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            SIGN UP
          </button>
        </form>
      </div> */}
      <div
        className="sign-up-btns form shadow-lg p-4 d-flex justify-content-center"
        style={{ width: "40%", margin: " auto" }}
      >
        <button
          className="button  p-2 m-4 btn-three"
          onClick={() => nav("/voter-sign-up")}
          disabled={!state.contract}
        >
          Sign up as Voter
        </button>
        <button
          className="button  p-2 m-4 btn-three"
          onClick={() => nav("/candidate-sign-up")}
          disabled={!state.contract}
        >
          Sign up as Candidate
        </button>
      </div>
    </>
  );
};
export default SignUp;
