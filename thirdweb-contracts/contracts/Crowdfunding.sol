// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description; 
        uint256 target;
        uint256 deadline;
        uint256 amount;
        string image;
        address[] donators;
        uint256[] donations;

    }
    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaign = 0;
    function createCampaign(address _owner,string memory _title,string memory _description,uint256 _target,uint256 _deadline,string memory _image) public returns (uint256){
        Campaign storage compaign = campaigns[numberOfCampaign];
        require(compaign.deadline<block.timestamp,"Deadline should be in the future");
        compaign.owner = _owner;
        compaign.title = _title;  
        compaign.description = _description;
        compaign.target = _target;
        compaign.deadline = _deadline;
        compaign.amount = 0;
        compaign.image = _image;
        // compaign.donators = new address[](0);
        // compaign.donations = new uint256[](0);
        // campaigns[numberOfCampaign] = compaign;
        numberOfCampaign++;
        return numberOfCampaign-1;
    }
    function donateToCampaign(uint256 _id)public payable{
        uint256 amount1 = msg.value;
        Campaign storage compaign = campaigns[_id];
        // compaign.amount += amount;
        compaign.donators.push(msg.sender);
        compaign.donations.push(amount1);

        (bool sent,) = payable(compaign.owner).call{value: amount1}("");
        if(sent){
            compaign.amount += amount1;
        }
    }
    function getDonators(uint256 _id) view public returns(address[] memory , uint256[] memory){
        return(campaigns[_id].donators,campaigns[_id].donations);
    }
    function getCampaign() public view returns(Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaign);
        for(uint256 i=0;i<numberOfCampaign;i++){
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns; 
    }
}