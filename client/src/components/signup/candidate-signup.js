import { ethers } from "ethers";
import { useState } from "react";
import "./candidate-signup.css";
const CandidateSignup = ({ state }) => {
  const { contract } = state;
  const defaultCandidate = {
    citizen: "",
    name: "",
    partyName: "",
    partySymbol: "",
    state: "",
    constituency: "",
  };
  const [candidateForm, setCandidateForm] = useState(defaultCandidate);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setCandidateForm({
      ...candidateForm,
      [e.target.name]: e.target.value,
    });
  };
  const createCandidate = async (event) => {
    event.preventDefault();
    const citizen = document.querySelector("#citizen").value;
    const name = document.querySelector("#name").value;
    const partyName = document.querySelector("#partyName").value;
    const partySymbol = document.querySelector("#partySymbol").value;
    const state = document.querySelector("#state").value;
    const constituency = document.querySelector("#constituency").value;

    console.log(citizen, name, partyName, partySymbol, state, constituency);
    const transaction = await contract.createCandidate(
      citizen,
      name,
      partyName,
      partySymbol,
      state,
      constituency
    );
    await transaction.wait();
    alert("Candidate Has been created Successfully!");
    setCandidateForm(defaultCandidate);
  };
  return (
    <>
      <div className="form shadow-lg">
        <form onSubmit={createCandidate}>
          <div className="mb-3">
            <label className="form-label">Candidate CitizenNo.</label>
            <input
              name="citizen"
              value={candidateForm.citizen}
              type="number"
              className="form-control"
              id="citizen"
              onChange={onChangeHandler}
              placeholder="Enter Your Citizen No."
            />
          </div>
          {/* CANDIDATE Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              value={candidateForm.name}
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
              onChange={onChangeHandler}
            />
          </div>
          {/* PARTY NAME */}
          <div className="mb-3">
            <label className="form-label">Party Name</label>
            <input
              name="partyName"
              value={candidateForm.partyName}
              type="text"
              className="form-control"
              id="partyName"
              placeholder="Enter Party Name"
              onChange={onChangeHandler}
            />
          </div>
          {/* PARTY SYMBOL */}
          <div className="mb-3">
            <label className="form-label">Party Symbol IPFS</label>
            <input
              name="partySymbol"
              value={candidateForm.partySymbol}
              type="text"
              className="form-control"
              id="partySymbol"
              placeholder="Enter Your Party Symbol"
              onChange={onChangeHandler}
            />
          </div>
          {/* STATE CODE */}
          <div className="mb-3">
            <label className="form-label">STATE No.</label>
            <input
              name="state"
              value={candidateForm.state}
              type="number"
              className="form-control"
              id="state"
              placeholder="Enter Your state Area No."
              onChange={onChangeHandler}
            />
          </div>
          {/* CONSTITUENCY CODE */}
          <div className="mb-3">
            <label className="form-label">Constituency Area No.</label>
            <input
              name="constituency"
              value={candidateForm.constituency}
              type="number"
              className="form-control"
              id="constituency"
              placeholder="Enter Your Constituency Area No."
              onChange={onChangeHandler}
            />
          </div>
          {/* button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Register Candidate
          </button>
        </form>
      </div>
    </>
  );
};
export default CandidateSignup;
