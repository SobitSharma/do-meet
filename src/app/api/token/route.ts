import {StreamChat} from "stream-chat";
import { NextResponse } from "next/server";
import { db } from "@/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request:Request){
    try {
        const {userId} = await request.json();
        const [user] = await db.select().from(users).where(
            eq(userId, users.email)
        )

        const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
        const apiSecret = process.env.STREAM_SECRET_KEY!;

        const serverClient = StreamChat.getInstance(apiKey, apiSecret);
        const token = serverClient.createToken(user.id);

        return NextResponse.json({
            token,
            apiUserId:user.id,
            apiKey
        })
    } catch (error) {
        console.error("Error generating Token", error);
        return NextResponse.json(
            {error:"Failed to generate Token"},
            {status:500}
        )
    }
}
