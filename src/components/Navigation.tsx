"use client";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import NavigationLink from "./NavigationLink";
import { Button } from "antd";
import { signOut, useSession } from "next-auth/react";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const { data: session, status } = useSession()
  const logout = () => {
    signOut();
  };

  return (
    <div className="bg-slate-850">
      <nav className="container flex justify-between p-2 text-white">
        <div>
          <NavigationLink href="/">{t("home")}</NavigationLink>
          <NavigationLink href="/pathnames">{t("pathnames")}</NavigationLink>
        </div>
        <div className="flex justify-center items-center">
          <LocaleSwitcher />
          {session &&<Button onClick={logout}>Logout</Button>}
        </div>
      </nav>
    </div>
  );
}
