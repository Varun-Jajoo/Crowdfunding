import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import { useState ,useEffect} from 'react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // const [nextnft ,setnextnft] = useState(0)
  const [completed,setcompleted]=useState(false)
  const { contract } = useContract('0xD7974C55b27869A279E4a30f4Aa02336524eA117');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const [currentIndex, setCurrentIndex] = useState(0);
  const address = useAddress();
  const connect = useMetamask();
  const[createReceipt,setcreatereceipt] = useState(null)
  useEffect(() => {
    if (createReceipt !== null) {
      console.log("Receipt data:", createReceipt);
    }
  }, [createReceipt]);
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.target,
					new Date(form.deadline).getTime(), // deadline,
					form.image,
				],
			});

      console.log("contract call success", data)
     setcreatereceipt(data.receipt)

    } catch (error) {
      console.log("contract call failure", error)
    }
  }
const [pid ,setPid] = useState(0)
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaign');

    const parsedCampaigns = campaigns.map((campaign, i) => {
        const parsedCampaign = {
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: undefined,
            deadline: undefined,
            amountCollected: undefined,
            image: campaign.image,
            pId: i,
            completed:completed
        };
          setPid(i)
        // Check if campaign.target is defined before attempting to format it
        if (campaign.target !== undefined) {
            parsedCampaign.target = ethers.utils.formatEther(campaign.target.toString());
        }

        // Check if campaign.deadline is defined before attempting to access its properties
        if (campaign.deadline !== undefined && campaign.deadline !== null) {
            parsedCampaign.deadline = campaign.deadline.toNumber();
        }

        // Check if campaign.amountCollected is defined before attempting to format it
        if (campaign.amountCollected !== undefined) {
            parsedCampaign.amountCollected = ethers.utils.formatEther(campaign.amountCollected.toString());
        }

        return parsedCampaign;
    });

    return parsedCampaigns;
}


  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }



  const generateDonationReceipt = async (campaignId, donationIndex) => {
    try {
      const receipt = await contract.call('getTransactionReceipt', [campaignId, donationIndex]);
      console.log("Donation Receipt:", receipt);
      // Here you can handle the receipt data as needed (e.g., display it on UI, save to state, etc.)
    } catch (error) {
      console.error("Error fetching donation receipt:", error);
    }
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        generateDonationReceipt,
        currentIndex,
        completed,
        setcompleted,
      pid,
     
        setCurrentIndex,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);