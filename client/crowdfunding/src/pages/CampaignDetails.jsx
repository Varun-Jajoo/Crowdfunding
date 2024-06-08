// import React, { useState, useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers';

// import { useStateContext } from '../context';
// import { CountBox, CustomButton, Loader } from '../components';
// import { calculateBarPercentage, daysLeft } from '../utils';
// import { thirdweb } from '../assets';

// const CampaignDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { donate, getDonations, contract, address } = useStateContext();

//   const [isLoading, setIsLoading] = useState(false);
//   const [amount, setAmount] = useState('');
//   const [donators, setDonators] = useState([]);

//   const remainingDays = daysLeft(state.deadline);

//   const fetchDonators = async () => {
//     const data = await getDonations(state.pId);

//     setDonators(data);
//   }

//   useEffect(() => {
//     if(contract) fetchDonators();
//   }, [contract, address])

//   const handleDonate = async () => {
//     setIsLoading(true);

//     await donate(state.pId, amount); 
//     //await generateDonationReceipt(state.pId, amount);
//     navigate('/')
//     setIsLoading(false);
//   }

//   return (
//     <div>
//       {isLoading && <Loader />}

//       <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
//         <div className="flex-1 flex-col">
//           <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
//           <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
//             <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
//             </div>
//           </div>
//         </div>

//         <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
//           <CountBox title="Days Left" value={remainingDays} />
//           <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
//           <CountBox title="Total Backers" value={donators.length} />
//         </div>
//       </div>

//       <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
//         <div className="flex-[2] flex flex-col gap-[40px]">
//           <div>
//             <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

//             <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
//               <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
//                 <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
//               </div>
//               <div>
//                 <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
//                 <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

//               <div className="mt-[20px]">
//                 <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
//               </div>
//           </div>

//           <div>
//             <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>

//               <div className="mt-[20px] flex flex-col gap-4">
//                 {donators.length > 0 ? donators.map((item, index) => (
//                   <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
//                     <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
//                     <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
//                   </div>
//                 )) : (
//                   <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
//                 )}
//               </div>
//           </div>
//         </div>

//         <div className="flex-1">
//           <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>   

//           <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
//             <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
//               Fund the campaign
//             </p>
//             <div className="mt-[30px]">
//               <input 
//                 type="number"
//                 placeholder="ETH 0.1"
//                 step="0.01"
//                 className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//               />

//               <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
//                 <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
//                 <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
//               </div>

//               <CustomButton 
//                 btnType="button"
//                 title="Fund Campaign"
//                 styles="w-full bg-[#8c6dfd]"
//                 handleClick={handleDonate}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CampaignDetails

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { Button, Modal } from "antd";
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import NFT from '../context/NFT';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address, generateDonationReceipt,completed,setcompleted } = useStateContext();
  const [modal2Open, setModal2Open] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [donationReceipt, setDonationReceipt] = useState(null);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  }

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);
 
  useEffect(() => {
   
    if(state.amountCollected>state.target) setcompleted(true)
  }, [])

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % nfts.length);
  };
  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);
    await generateDonationReceipt(state.pId, donators.length);

    setIsLoading(false);
  }
  state.amountCollected = donators.reduce((total, item) => total + parseFloat(item.donation), 0)

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative  h-[5px] bg-[#3a3a43] mt-2 rounded-3xl">
            <div className="absolute h-full bg-[#4acd8d] rounded-3xl" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
                </div>
              )) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">Fund the campaign</p>
            <div className="mt-[30px]">
              <input 
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
              </div>
              <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
             
<button type="button" class=" text-white bg-green-400 w-full rounded-lg mt-2 py-2.5 font-epilogue font-medium text-[16px] leading-[26px]" data-toggle="modal" data-target="#exampleModalCenter">
  Claim Reward
</button>


<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered " role="document">
    <div className="modal-content bg-[#1c1c24]">
      <div class="modal-header">
        <h5 className="modal-title text-white font-epilogue font-bold" id="exampleModalLongTitle" >Congratulations you have Achieved a NGO NFT!!</h5>
        <button type="button" class="close text-white"  data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body  ">
        <NFT/>
      </div>
  
      
    </div>
  </div>
</div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
