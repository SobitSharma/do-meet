# Do-Meet 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-blue.svg)](https://nextjs.org/)
[![Runtime: Bun](https://img.shields.io/badge/Runtime-Bun-purple.svg)](https://bun.sh/)

Do-Meet is a seamless video meeting app designed to simplify online collaboration. Invite participants via email without copying links, create groups for recurring meetings, and collaborate in real-time using a built-in whiteboard. You can also opt for voice + whiteboard sessions without video.

## Features

- **Email-based invites:** Automatically send meeting links to participants via email.  
- **Groups:** Create reusable groups for easy recurring meetings.  
- **Whiteboard Collaboration:** Real-time collaborative whiteboard for discussions.  
- **Voice + Whiteboard Meetings:** Conduct meetings without video if preferred.  
- **Seamless Setup:** Start the app quickly with minimal setup.

## Tech Stack

- **Frontend & Backend:** Next.js  
- **Runtime:** Bun  
- **Collaboration Tools:** WebRTC for video + audio, real-time whiteboard integration  

## Getting Started

1. **Clone the repository**
   ```bash
   git clone repo_url
   cd do-meet

2. **Configure - Create a .env file in root dir**
   ```bash
   GOOGLE_CLIENT_ID= get from google console
   GOOGLE_CLIENT_SECRET= get from google console
   NEXTAUTH_SECRET = example -your random string
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   DATABASE_URL=postgres://postgres:mypassword@localhost:5432/postgres

3. **Configure the DB instance locally**
   ```
   docker pull postgres
   docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres

4. **Run the App**
    ```
    bun run dev


    