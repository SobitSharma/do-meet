// SERVER COMPONENT
import MeetingRoom from "./MeetingRoom";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;

  return (
    <main className="h-screen">
      <MeetingRoom meetingId={id} />
    </main>
  );
}