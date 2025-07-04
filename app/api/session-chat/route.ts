import { db } from "@/config/db"
import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { SessionChatTable } from "@/config/schema"
import { desc, eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
    const { notes, selectedLawyer } = await req.json()
    const user = await currentUser()
    try {
        const sessionId = uuidv4()
        const result = await db.insert(SessionChatTable).values({
            sessionId: sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            notes: notes,
            selectedLawyer: selectedLawyer,
            createdOn: (new Date()).toString()
        }).returning(); // Return the inserted row(s)
        return NextResponse.json(result[0])
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url)
    const sessionId = searchParams.get("sessionId")
    const user = await currentUser()
    if (sessionId == 'all') {
        const result = await db.select().from(SessionChatTable)
            //@ts-ignore
            .where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(SessionChatTable.id))

        return NextResponse.json(result);
    }
    else {
        const result = await db.select().from(SessionChatTable)
            //@ts-ignore
            .where(eq(SessionChatTable.sessionId, sessionId));

        return NextResponse.json(result[0]);
    }
}