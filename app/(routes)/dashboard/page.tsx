import { Button } from "@/components/ui/button";
import React from "react";
import HistoryList from "./_components/HistoryList";
import LawyerAgentList from "./_components/LawyerAgentList";

function Dashboard() {
    return (<div>
        <div className='flex justify-between'>
            <h2 className='font-bold text-2xl'>My Dashboard</h2>
            <Button>+ Consult with Lawyer</Button>
        </div>
        <HistoryList />
        <LawyerAgentList />
    </div>)
}

export default Dashboard