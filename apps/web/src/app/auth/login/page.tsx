"use client";

import { AuthTab, useAuthModalStore } from "@/entities/auth";
import {
  ForgotPasswordWidget,
  IndexAuthWidget,
  LoginAuthWidget,
  LoginWithEmailWidget,
} from "@/widgets/auth";

export default function LoginPage() {
  const { tab } = useAuthModalStore();
  const currentTab = tab.at(-1);

  return (
    <>
      {currentTab &&
        [
          AuthTab.ForgotPassword,
          AuthTab.Login,
          AuthTab.LoginWithEmail,
        ].includes(currentTab) && (
          <h1 className="title">
            Login into your {process.env.NEXT_PUBLIC_COMPANY_NAME} account
          </h1>
        )}

      {currentTab === AuthTab.Index && <IndexAuthWidget />}
      {currentTab === AuthTab.Login && <LoginAuthWidget />}
      {currentTab === AuthTab.LoginWithEmail && <LoginWithEmailWidget />}
      {currentTab === AuthTab.ForgotPassword && <ForgotPasswordWidget />}
    </>
  );
}
