import React, { useEffect, useState } from 'react';
import { ThirdwebNftMedia , useNFTs, useContractMetadata, useContract } from '@thirdweb-dev/react';
import { useContext } from 'react';
import { useStateContext } from '../context';
import { FaMedal } from "react-icons/fa";
export default function NFT() {
  const { currentIndex, setCurrentIndex, } = useStateContext();
  const { contract } = useContract("0x0BBc540CB6d816FeFA393dAF85F3bE5E6a06B750");
  const { data: nfts, isLoading } = useNFTs(contract);
  const { data: metadata, isLoading: loadingMetadata } = useContractMetadata(contract);
  const [clicked,setClicked] = useState(false)
  useEffect(() => {
    if (!isLoading && !loadingMetadata && nfts.length > 0) {
      
    }
  }, [isLoading, loadingMetadata]);

  const handleNextClick = () => {
    setTimeout(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % nfts?.length);
        
    },2000)
  };

  return (
    <main className="">

      {!isLoading  ? (
        <div className="gallery flex items-center justify-center rounded-md">
          <div className="flex flex-col rounded-md h-[300px] w-[300px]">
            <ThirdwebNftMedia className=' h-5 w-5 rounded-full object-contain border-dashed border-yellow-400 border-[8px]' metadata={nfts[currentIndex]?.metadata} />
            <div className='text-yellow-200 align-middle m-auto pt-8 flex items-center justify-center text-xl gap-2' styles={{textAlign:'center'}}>{nfts[currentIndex]?.metadata.description} <FaMedal /></div>
            {/* <div className='text-yellow-200 align-middle m-auto pt-8 ' styles={{textAlign:'center'}}>{nfts[currentIndex]?.metadata.properties}</div> */}
          </div>
          
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
      <div className='flex items-center justify-center '>
      <button data-dismiss="modal" onClick={handleNextClick} className='px-4 py-2 mt-[4.5rem] rounded-md text-white bg-green-400'>Add to Collection</button>
      </div></main>
  );
}
