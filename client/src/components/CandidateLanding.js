import React from "react";
import Candidate from "./Candidate";
import ShowCandidates from "./show-candidates/ShowCandidates";
import chai from "../chai.png";
import NewCandidate from "./create-candidate/NewCandidate";

import "./candidatelanding.css";

export const CandidateLanding = ({ state, account }) => {
  return (
    <div className="form shadow-lg">
      <h1 className="text-center ">Add Candidate</h1>
      {/* <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p> */}
      <NewCandidate state={state} />
      <ShowCandidates state={state} />
    </div>
  );
};
