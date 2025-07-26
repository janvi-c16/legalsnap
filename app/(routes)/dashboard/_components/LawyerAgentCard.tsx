import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export type lawyerAgent = {
    id: number;
    specialist: string;
    description: string;
    image: string;
    agentPrompt: string;
    subscriptionRequired: boolean;
  };

type props = {
    lawyerAgent: lawyerAgent
}

function LawyerAgentCard({lawyerAgent}:props) {
    return(
        <div className="flex flex-col justify-between items-center w-[260px] h-[410px] bg-white border border-gray-200 rounded-2xl shadow-md p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.03]">
            <Image src={lawyerAgent.image} alt={lawyerAgent.specialist} width={200} height={150} className="w-full h-[150px] object-contain rounded-xl mb-2"/>
            <div className="flex-1 w-full flex flex-col items-center">
                <h2 className="font-bold mt-1 text-lg text-center min-h-[48px]">{lawyerAgent.specialist}</h2>
                <p className="text-gray-700 text-center mt-1 mb-2 break-words w-full">{lawyerAgent.description}</p>
            </div>
            <Button className='w-full mt-2'>Consult</Button>
        </div>
    )
}

export default LawyerAgentCard