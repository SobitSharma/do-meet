"use client";

import { CallControls, CallingState, SpeakerLayout, StreamCall, StreamTheme, StreamVideo, StreamVideoClient, StreamVideoParticipant, useCall, useCallStateHooks, type User } from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {toast} from "sonner"
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { SpinnerCustom } from "@/app/components/LoaderShad";

interface MeetingPageProps {
  meetingId:string;
}

export default function MeetingRoom({meetingId}:MeetingPageProps){
  const {data:session} = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const [loading, setloading] = useState(true);
  const hasJoined = useRef(false);

  useEffect(()=>{
    if(!session || hasJoined.current) return;
    const fetchTokenAndInit = async()=> {
      hasJoined.current = true
      try {
        const res = await fetch('/api/token',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({userId:session.user?.email})
        });
        const data = await res.json();
        const token = data.token;

        if(!token){
          toast.error("Token not Recevied from the Server /api/token")
          return;
        }
        console.log("Received Token is this ", token)

        const user:User = {
          id:data.apiUserId,
          name:session.user?.name!,
          image:session.user?.image!
        }

        const streamClient = new StreamVideoClient({
          apiKey:process.env.NEXT_PUBLIC_STREAM_API_KEY!,
          user,
          token
        });

        setClient(streamClient);
        //Join Call
        const streamCall = streamClient.call('default', meetingId);
        await streamCall.join({create:true});
        setCall(streamCall);
        setloading(false);
      } catch (error) {
        console.error(error);
        toast.error("Some Error Occurred in the useEffect !!")
        hasJoined.current = false
      }
    }
    console.log("UseEffect is being Called")
    fetchTokenAndInit();

    //cleanUpfunction
    return()=>{
      const cleanup = async() => {
        try{
          if(call){
            await call.leave()
          }
          if(client){
            await client.disconnectUser();
          }
        } catch(error){
          console.log("CleanUpError", error)
        }
        hasJoined.current = false
      }
    }

  },[session, meetingId]);

  if(loading || !client || !call) return(
    <div className="flexs items-center min-h-screen">
      <SpinnerCustom/>
    </div>
  )
    

  return(
    <div className="h-screen w-full">
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout/>
      </StreamCall>
    </StreamVideo>
    </div>
  )
}

export const MyUILayout = ()=> {
  const call = useCall();
  const {
    useCallCallingState
  } = useCallStateHooks();
  const callingState = useCallCallingState();
  if(callingState != CallingState.JOINED){
    return <div>Loading Call</div>
  }

  return(
    <StreamTheme>
      <SpeakerLayout participantsBarPosition={"bottom"}/>
      <CallControls/>
    </StreamTheme>
  )
}



