"use client"
import React, { useState } from "react";
import Image from "next/image";
import AddNewSessionDialog from "./AddNewSessionDialog";
function HistoryList() {
    const [HistoryList, setHistoryList] = useState([])
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
                        History Table
                    </div>
            }
        </div>
    )
}

export default HistoryList