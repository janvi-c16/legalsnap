import React from "react";
import HistoryList from "./_components/HistoryList";
import LawyerAgentList from "./_components/LawyerAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";

function Dashboard() {
    return (<div>
        <div className='flex justify-between'>
            <h2 className='font-bold text-2xl'>My Dashboard</h2>
            <AddNewSessionDialog />
        </div>
        <HistoryList />
        <LawyerAgentList />
    </div>)
}

export default Dashboard