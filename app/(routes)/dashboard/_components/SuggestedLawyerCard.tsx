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
        <div className={`flex flex-col items-center border rounded-2xl hover:border-blue-500 cursor-pointer shadow p-5 ${selectedLawyer?.id === lawyerAgent.id && 'border-blue-500'}`} onClick={() => setSelectedLawyer(lawyerAgent)}>
            <Image src={lawyerAgent.image} alt={lawyerAgent.specialist} width={70} height={70} className='w-[50px] h-[50px] rounded-4xl object-cover' />
            <h2 className='font-bold text-sm text-center'>{lawyerAgent.specialist}</h2>
            <p className='text-xs text-center line-clamp-2'>{lawyerAgent.description}</p>
        </div>
    )
}

export default SuggestedLawyerCard