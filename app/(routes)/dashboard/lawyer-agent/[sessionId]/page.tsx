"use client"
import { useParams } from 'next/navigation'
import React from 'react'

function LawyerVoiceAgent() {
    const { sessionId } = useParams()
    return(
        <div>
            <h1>Lawyer Voice Agent</h1>
        </div>
    )
}

export default LawyerVoiceAgent