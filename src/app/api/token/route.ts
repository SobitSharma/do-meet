import {StreamChat} from "stream-chat";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try {
        const {userId} = await request.json();

        const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
        const apiSecret = process.env.STREAM_SECRET_KEY!;

        const serverClient = StreamChat.getInstance(apiKey, apiSecret);
        const token = serverClient.createToken(userId);

        return NextResponse.json({
            token,
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
