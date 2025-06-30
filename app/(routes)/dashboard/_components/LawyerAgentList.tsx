import { AILawyerAgents } from '@/shared/list'
import React from "react";
import LawyerAgentCard from './LawyerAgentCard';

function LawyerAgentList() {
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-xl'>AI Specialist Lawyer Agents</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-5'>
                {
                    AILawyerAgents.map((lawyer: any, index) => (
                        <div key={index}>
                            <LawyerAgentCard lawyerAgent={lawyer}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LawyerAgentList