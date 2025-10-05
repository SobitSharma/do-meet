import { AuthOptions, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import {DrizzleAdapter} from "@auth/drizzle-adapter"
import { db } from "@/index";
import { accounts, users } from "@/db/schema";

const authOptions:AuthOptions = {
    adapter:DrizzleAdapter(db, {
        usersTable:users,
        accountsTable:accounts,
    }),
    providers:[
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID || '',
            clientSecret:process.env.GOOGLE_CLIENT_SECRET || '',
        })
    ],
    session:{strategy:'jwt'},
    secret:process.env.NEXTAUTH_SECRET
}

const getSession = ()=> getServerSession(authOptions);
export {authOptions, getSession}