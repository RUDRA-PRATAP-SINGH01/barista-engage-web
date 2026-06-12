import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { ContentContainer } from "./ContentContainer";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-(--sidebar-width) min-h-screen min-w-0 overflow-x-hidden">
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </main>
    </div>
  );
}
