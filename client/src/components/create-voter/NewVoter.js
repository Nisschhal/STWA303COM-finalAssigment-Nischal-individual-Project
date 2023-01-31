import { useState } from "react";
import { voterList } from "../../context/VoterList";
const NewVoter = ({ state, account }) => {
  const { contract } = state;
  const defaultVoter = {
    citizen: "",
    name: "",
    age: "",
    state: "",
    constituency: "",
  };
  const [voterForm, setVoterForm] = useState(defaultVoter);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setVoterForm({
      ...voterForm,
      [e.target.name]: e.target.value,
    });
  };
  const createCandidate = async (event) => {
    event.preventDefault();
    const citizen = document.querySelector("#citizen").value;
    console.log(typeof citizen);
    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    const state = document.querySelector("#state").value;
    const consituency = document.querySelector("#constituency").value;

    console.log(citizen, name, age, state, consituency, account);
    // const amount = { value: ethers.utils.parseEther("0.001") };
    const transaction = await contract.createVoter(
      citizen,
      name,
      age,
      state,
      consituency
    );
    await transaction.wait();
    // setTimeout(() => {
    //   voterList.push({
    //     address: account,
    //     voterCitizenNo: citizen, // voter unique ID
    //     voterName: name,
    //     age: age,
    //     stateCode: state,
    //     constituencyCode: consituency,
    //     voted: false,
    //     isAlive: true,
    //     votedTo: "", // ci
    //   });
    // }, 3000);

    alert("Voter has been created Successfully!!");
    setVoterForm(defaultVoter);
    console.log(voterList);
  };
  return (
    <>
      <div className="form shadow-lg p-4">
        <h1 className="text-center ">Voter Register </h1>

        <form onSubmit={createCandidate}>
          <div className="mb-3">
            <label className="form-label">CitizenNo.</label>
            <input
              name="citizen"
              value={voterForm.citizen}
              type="number"
              className="form-control"
              id="citizen"
              onChange={onChangeHandler}
              placeholder="Enter Your Citizen No."
            />
          </div>
          {/* Voter Name */}
          <div className="mb-3">
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
          </div>
          {/* age */}
          <div className="mb-3">
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
          </div>
          {/* STATE CODE{" "} */}
          <div className="mb-3">
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
          </div>
          {/* CONSTITUENCY CODE */}
          <div className="mb-3">
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
          </div>
          {/* button */}
          <button type="submit" className="button" disabled={!state.contract}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};
export default NewVoter;
