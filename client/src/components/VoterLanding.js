import React from "react";

import chai from "../chai.png";
import NewVoter from "./create-voter/NewVoter";
import ShowVoters from "./show-voters/ShowVoters";

export const VoterLanding = ({ state, account }) => {
  return (
    <div className="form shadow-lg">
      {/* <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p> */}
      <NewVoter state={state} />
      <ShowVoters state={state} />
    </div>
  );
};
