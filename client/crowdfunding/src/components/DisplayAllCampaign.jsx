import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
// import FundCard from './FunCard';
import { loader } from '../assets';
import { useStateContext } from '../context';
import DisplayCard from './DisplayCard';

const DisplayAllCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const {completed,setcompleted} = useStateContext();
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">All campaigns</h1>

      <div className="flex w-full flex-wrap mt-[20px] gap-[20px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <DisplayCard 
          key={uuidv4()}
          {...campaign}
          
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayAllCampaigns