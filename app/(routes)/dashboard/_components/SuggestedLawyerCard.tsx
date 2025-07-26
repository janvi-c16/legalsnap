import React from 'react'
import Image from 'next/image'
import { lawyerAgent } from './LawyerAgentCard'

type props = {
    lawyerAgent: lawyerAgent,
    setSelectedLawyer: (lawyer: lawyerAgent) => void,
    selectedLawyer: lawyerAgent | null
}
function SuggestedLawyerCard({ lawyerAgent, setSelectedLawyer, selectedLawyer }: props) {
    return (
        <div 
            className={`flex flex-col items-center border rounded-2xl mt-2 cursor-pointer shadow-sm p-5 transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:border-blue-500 hover:bg-blue-50/50 ${
                selectedLawyer?.id === lawyerAgent.id 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-400'
            }`} 
            onClick={() => setSelectedLawyer(lawyerAgent)}
        >
            <Image src={lawyerAgent.image} alt={lawyerAgent.specialist} width={70} height={70} className='w-[50px] h-[50px] rounded-4xl object-cover' />
            <h2 className='font-bold text-sm text-center'>{lawyerAgent.specialist}</h2>
            <p className='text-xs text-center line-clamp-2'>{lawyerAgent.description}</p>
        </div>
    )
}

export default SuggestedLawyerCard