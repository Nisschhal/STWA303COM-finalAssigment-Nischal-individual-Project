// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ballot {

    // Voter Object
    struct Voter {
          uint256 voterCitizenNo; // voter unique ID
          string voterName;
          uint8 age;
          uint8 stateCode;
          uint8 constituencyCode;
          bool voted;
          bool isAlive;
          uint256 votedTo; // citizen number of the candidate

 }

 // Candidate Object
    struct Candidate {
        // Note: If we can limit the length to a certain number of bytes,
        // we can use one of bytes1 to bytes32 because they are much cheaper
        uint256 candidateCitizenNo;
        string candidateName;
        string partyName;
        string partyFlag;
        uint8 stateCode;
        uint8 constituencyCode;
        uint256 voteCount; // number of accumulated votes
 }

    // OWNER OF THE CONTRACT 
    address public immutable i_electionCommision ;

    // HOLDS ELECTION START TIME  
    uint256 private votingStartTime;

    // HOLDS ELECTION END TIME  
    uint256 private votingEndTime;

    // HOLDS VOTERS OBJECTS
    Voter[] private voters;

    // map all the registered address with their detail voters
    mapping(address => Voter) private addToVoters;

    // HOLDS CANDIDATE OBJECTS
    Candidate[] private candidates;
    // mapping(uint256 => Voter) internal voters;
    // mapping(uint256 => Candidate) internal candidates;

// --------------------- SET OWNER -------------------//
    constructor(){
        i_electionCommision = msg.sender;
        votingStartTime = 1675027560;
        votingEndTime = 1675286760;
    }


/**
     * @dev GET CANDIDATE LIST.
     * @param voterCitizenNo number of the current voter to send the relevent candidates list
     * @return candidatesList_ All the politicians who participate in the election
     */
    function getCandidateList(uint256 voterCitizenNo)
        public
        view
        returns(Candidate[] memory)
    {
        // Get voter via voterCitizenNo
        Voter memory voter_ = voters[getVoterIndexViaCitizenNo(voterCitizenNo)];
        // 
        uint256 _politicianOfMyConstituencyLength = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                voter_.stateCode == candidates[i].stateCode &&
                voter_.constituencyCode == candidates[i].constituencyCode
            ) _politicianOfMyConstituencyLength++;
        }
        // Array container of current Candidates on that voter's state and constituency Area
        Candidate[] memory cc = new Candidate[](
            _politicianOfMyConstituencyLength
        );

        // Get the candidates of the voter's state and constituency Area
        uint256 _index = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                voter_.stateCode == candidates[i].stateCode &&
                voter_.constituencyCode == candidates[i].constituencyCode
            ) {
                cc[_index] = Candidate({
                    candidateCitizenNo: candidates[i].candidateCitizenNo,
                    candidateName: candidates[i].candidateName,
                    partyName: candidates[i].partyName,
                    partyFlag: candidates[i].partyFlag,
                    voteCount: 0,
                    stateCode: candidates[i].stateCode,
                    constituencyCode: candidates[i].constituencyCode
                    

                });
                _index++;
            }
        }
        return cc;
    }











    //// GET CANDIDATE VIA STATE CODE AND CONSTITUENCY CODE ------------------
    /**
     * @dev GET CANDIDATE LIST.
     * @param stateCode_ , constituencyCode_ to send the relevent candidates list of that state or constituency 
     * @return candidatesList_ All the politicians who participate in the election
     */
    function getCandidateListViaCode(uint256 stateCode_, uint256 constituencyCode_)
        public
        view
        returns(Candidate[] memory)
    {
              // 
        uint256 _politicianOfMyConstituencyLength = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                stateCode_ == candidates[i].stateCode &&
                constituencyCode_ == candidates[i].constituencyCode
            ) _politicianOfMyConstituencyLength++;
        }
        // Array container of current Candidates on that voter's state and constituency Area
        Candidate[] memory cc = new Candidate[](
            _politicianOfMyConstituencyLength
        );

        // Get the candidates of the voter's state and constituency Area
        uint256 _index = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                stateCode_ == candidates[i].stateCode &&
                constituencyCode_ == candidates[i].constituencyCode
            ) {
                cc[_index] = Candidate({
                    candidateCitizenNo: candidates[i].candidateCitizenNo,
                    candidateName: candidates[i].candidateName,
                    partyName: candidates[i].partyName,
                    partyFlag: candidates[i].partyFlag,
                    voteCount: 0,
                    stateCode: candidates[i].stateCode,
                    constituencyCode: candidates[i].constituencyCode
                    

                });
                _index++;
            }
        }
        return cc;
    } 


/**
     * @dev Get candidate list.
     * @param voterCitizenNo of the current voter to send the relevant candidates list
     * @return voterEligible_ Whether the voter with provided citizen is eligible or not
     */
     
    function isVoterEligible(uint256 voterCitizenNo)
        public
        view
        returns (bool)
    {
        Voter memory voter_ = voters[getVoterIndexViaCitizenNo(voterCitizenNo)];
        if(voter_.age >= 18 && voter_.isAlive) {
            return true ;
        } 
        revert("Voter is not Elible to vote!!");
       
       
    }

//////////////////// --------------------- VOTING -----------------------


/**
     * @notice To check the voting process is ongoing
     * @param currentTime_ Current epoch time of the voter
     */
    modifier areVotingLinesOpen(uint256 currentTime_) {
        require(currentTime_ >= votingStartTime, "Election time out!");
        require(currentTime_ <= votingEndTime, "Election has not started yet!");
        _;
    }



/**
     * @notice To check if the voter's age is greater than or equal to 18
     * @param voterCitizenNo_ Aadhar number of the current voter
     * @param candidateCitizenNo_ Aadhar number of the candidate
     */
    modifier isEligibleVote(uint256 voterCitizenNo_, uint256 candidateCitizenNo_) {
        // get the voter of given citizenNo.
        Voter storage voter_ = voters[getVoterIndexViaCitizenNo(voterCitizenNo_)];
        // get the candidate of given citizenNo.
        Candidate storage candidate_ = candidates[getCandidateIndexViaCitizenNo(candidateCitizenNo_)];
        require(voter_.age >= 18, "Age needs to be greater thatn 18");
        require(voter_.isAlive, "Voter must be alive");
        require(!voter_.voted, "Already voted!");
        require(
            (candidate_.stateCode == voter_.stateCode &&
                candidate_.constituencyCode == voter_.constituencyCode)
        , "Voter is not in the same as candidate state or constituency Area");
        _;
    }

    
/**
     * @dev Give your vote to candidate.
     * @param candidateCitizenNo_  Number of the candidate
     * @param voterCitizenNo_ Number of the voter to avoid re-entry
     */
    function  vote(
        uint256 candidateCitizenNo_,
        uint256 voterCitizenNo_
    )
        public payable
        isEligibleVote(voterCitizenNo_, candidateCitizenNo_)
    {
        // updating the current voter values
        // Voter storage votingVoter = voters[getVoterIndexViaCitizenNo(voterCitizenNo_)];
        voters[getVoterIndexViaCitizenNo(voterCitizenNo_)].voted = true;
        voters[getVoterIndexViaCitizenNo(voterCitizenNo_)].votedTo = candidateCitizenNo_;

        // Incrementing the votes to the relevant candidate.
        for (uint256 i = 0; i < candidates.length; i++) {
            // we can't iterate via map to find who got most votes,
            // so it has to be updated in array only
            if (candidates[i].candidateCitizenNo == candidateCitizenNo_) {
                candidates[i].voteCount++;
                break;
            }
        }
    }




//////////////////////// -------------------- CREATE CANDIDATE -----------------------------//

     function createCandidate(uint256 candidateCitizenNo,
        string memory candidateName,
        string memory partyName,
        string memory partyFlag,
        uint8 stateCode,
        uint8 constituencyCode
        ) public candidateExits(candidateCitizenNo) {
            candidates.push(Candidate(candidateCitizenNo, candidateName, partyName, partyFlag, stateCode, constituencyCode, 0));
        }

//////////////////////// -------------------- CREATE VOTERS -----------------------------//

     function createVoter(
          uint256 voterCitizenNo_,
          string memory voterName_,
          uint8 age_,
          uint8 stateCode_,
          uint8 constituencyCode_
      
        ) public voterExits(voterCitizenNo_){
            voters.push(Voter(voterCitizenNo_, voterName_, age_, stateCode_, constituencyCode_, false , true, 0x0000000000000000000));
            addToVoters[msg.sender] = Voter(voterCitizenNo_, voterName_, age_, stateCode_, constituencyCode_, false , true, 0x0000000000000000000);
        }

    






        // GET ALL CANDIDATES
        function getAllCandidates() public view returns(Candidate[] memory) {
            return candidates;
        }

        // GET ALL VOTERS
        function getAllVoters() public view returns(Voter[] memory) {
            return voters;
        }



        // GET VOTER VIA CITIZEN NO
        function getVoterIndexViaCitizenNo(uint256 citizenNo_) public view returns(uint256) {
            for (uint256 i = 0; i < voters.length; i++) {
            // we can't iterate via map to find who got most votes,
            // so it has to be updated in array only
                if ((voters[i].voterCitizenNo) ==(citizenNo_)) {
                    return i;
                }
            }
            revert("No Voter with given Citizen No_");
            

        }

        // GET VOTER VIA their address and citizenNo

        function getVoterViaAddress(address voterAddress_) public view returns(Voter memory) {
            return addToVoters[voterAddress_];
        }

        // Login
        function login(uint256 citizenNo_,address voterAddress_) public view returns(Voter memory) {
            if ( citizenNo_ == addToVoters[voterAddress_].voterCitizenNo){
                return addToVoters[voterAddress_];
            } revert("CitizenNo. and Voter Address doesn't match!!");
        }

        // GET CANDIDATE VIA CITIZEN NO
        function getCandidateIndexViaCitizenNo(uint256 citizenNo_) public view returns(uint256)
        {
                        for (uint256 i = 0; i < voters.length; i++) {

            // we can't iterate via map to find who got most votes,
            // so it has to be updated in array only
                if ((candidates[i].candidateCitizenNo) ==(citizenNo_)) {
                    return i;
                    
                }
            }
            
        }

        
        // GET VOTEcoint via citizen
          function getVoteCount(uint256 citizenNo_) public view returns(uint256)
        {
                        for (uint256 i = 0; i < voters.length; i++) {

            // we can't iterate via map to find who got most votes,
            // so it has to be updated in array only
                if ((candidates[i].candidateCitizenNo) ==(citizenNo_)) {
                    return candidates[i].voteCount;
                }
            }
            
        }


        // MODIFER TO CHECK IF CANDIDATE USER WITH GIVEN CITIZEN ALREADY EXISTS!
        modifier candidateExits(uint256 citizenNo_) {
            bool result = true;
            for (uint256 i = 0; i < voters.length; i++) {

            // we can't iterate via map to find who got most votes,
            // so it has to be updated in array only
                    if ((candidates[i].candidateCitizenNo) == (citizenNo_)) {
                        result =  false;
                    }
                }

            require(result, "Candidate with citizen No. already exist!");
            _;
        }

        // MODIFER TO CHECK IF VOTER USER WITH GIVEN CITIZEN ALREADY EXISTS!
        modifier voterExits(uint256 citizenNo_) {
            bool result = true;
            for (uint256 i = 0; i < voters.length; i++) {

            // we can't iterate via map to find who got most votes,
            // so it has to be updated in array only
                    if ((voters[i].voterCitizenNo) == (citizenNo_)) {
                        result =  false;
                        break;
                    }
                }

            require(result, "Voter with citizen No. already exist!");
            _;
        }

    
        
        // voted Check 
        function getWinner() public view returns(Candidate memory) {
            Candidate memory highestVotedTo = candidates[0];
            for (uint256 i = 1; i < candidates.length; i++) {

            // we can't iterate via map to find who got most votes,
            // so it has to be updated in array only
                    if ((candidates[i].voteCount) > (highestVotedTo.voteCount)) {
                        highestVotedTo =  candidates[i];
                    }
                }
                return highestVotedTo;

        }


        
}