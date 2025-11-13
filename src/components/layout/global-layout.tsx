import { Link, Outlet } from "react-router";
import Logo from "@/assets/logo.png";
import DefaultAvatar from "@/assets/default-avatar.jpg";
import { SunIcon } from "lucide-react";

export default function GlobalLayout() {
  return (
    <div className="min-h-[100vh] flex-col">
      <header className="-15 border-b">
        <div className="m-auto flex h-full w-full max-w-175 flex-1 justify-between px-4">
          <Link className="flex items-center gap-2" to={"/"}>
            <img
              className="h-5"
              src={Logo}
              alt="한입 로그의 로고, 메시지 말풍선을 형상화한 모형이다."
            />
            <div className="font-bold">한입 로그</div>
          </Link>
          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <img className="h-6" src={DefaultAvatar} alt="" />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-175 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">
        @winterlood
      </footer>
    </div>
  );
}
