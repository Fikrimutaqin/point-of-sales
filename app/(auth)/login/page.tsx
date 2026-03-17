// Component: LoginSection
import { LoginSection } from "@/features/auth/components";
import { AuthIsLoginGuard } from "./_guard/AuthIsLoginGuard";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen h-[calc(100vh-64px)]">
      <AuthIsLoginGuard>
        <LoginSection />
      </AuthIsLoginGuard>
    </div>
  );
}
