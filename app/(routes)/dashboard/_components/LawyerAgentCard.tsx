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
        <div>
            <Image src={lawyerAgent.image} alt={lawyerAgent.specialist} width={200} height={300} className="w-full h-[250px] object-cover rounded-xl"/>
            <h2 className="font-bold mt-1">
                {lawyerAgent.specialist}
            </h2>
            <p>
                {lawyerAgent.description}
            </p>
            <Button className='w-full mt-2'>Consult</Button>
        </div>
    )
}

export default LawyerAgentCard