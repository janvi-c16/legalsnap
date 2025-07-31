"use client"
import React, { useState , useEffect } from "react";
import Image from "next/image";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { lawyerAgent } from "./LawyerAgentCard"


export type SessionDetails = {
    id: number;
    notes: string;
    sessionId: string;
    report: JSON;
    selectedLawyer: lawyerAgent;
    createdAt: string;
}

function HistoryList() {
    const [HistoryList, setHistoryList] = useState<SessionDetails[]>([]);
    useEffect(() => {
        GetHistoryList();
      }, []);
      const GetHistoryList = async () => {
        const result = await axios.get("/api/session-chat?sessionId=all")
        console.log(result.data)
        setHistoryList(result.data)
      }
    return (
        <div className="mt-10">
            {
                HistoryList.length == 0 ?
                    <div className='flex items-center justify-center flex-col p-7 border border-dashed rounded-2xl'>
                        <Image src={'/AI.png'} alt="AiGavel" width={150} height={150} />
                        <h2 className="font-bold text-xl mt-5">No Recent Consultations</h2>
                        <p>Oops! It looks like you haven't consulted any Lawyer yet.</p>
                        <AddNewSessionDialog />
                    </div>
                    :
                    <div>
                        <HistoryTable HistoryList={HistoryList} />
                    </div>
            }
        </div>
    )
}

export default HistoryList