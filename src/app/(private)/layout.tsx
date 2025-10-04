import Providers from "../providers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <SidebarProvider>
            <AppSidebar/>
            <main>
              <SidebarTrigger/>
              {children}
            </main>
          </SidebarProvider>
  );
}
