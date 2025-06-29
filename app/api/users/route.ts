import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";


export async function POST(req: NextRequest) {
    const user = await currentUser()
    try {
        //@ts-ignore
        const users = await db.select().from(usersTable).where(eq(usersTable.email, user?.emailAddresses[0].emailAddress))
        if (users.length === 0) {
            const result = await db.insert(usersTable).values({
                //@ts-ignore
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                credits: 10,
            })
                .returning()
            return NextResponse.json(result[0])
        }
        return NextResponse.json(users[0])
    }
    catch (e) {
        return NextResponse.json(e)
    }
}