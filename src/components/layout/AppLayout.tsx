import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import SOSButton from "./SOSButton";
import ProfileMenu from "./ProfileMenu";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <ProfileMenu />
          <h1 className="font-display font-bold text-lg text-gradient">SafeStride</h1>
          <div className="w-10" />
        </div>
      </header>
      <main className="max-w-lg mx-auto px-4 py-4">
        <Outlet />
      </main>
      <SOSButton />
      <BottomNav />
    </div>
  );
};

export default AppLayout;
