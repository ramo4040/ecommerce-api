"use client";

import { AuthTab, useAuthModalStore } from "@/entities/auth";
import "./style.css";
import {
  IndexAuthWidget,
  LoginAuthWidget,
  LoginWithEmailWidget,
} from "@/widgets/auth";

export default function LoginPage() {
  const { tab } = useAuthModalStore();
  const currentTab = tab.at(-1);

  return (
    <div id="login-container">
      {currentTab === AuthTab.Index && <IndexAuthWidget />}
      {currentTab === AuthTab.Login && <LoginAuthWidget />}
      {currentTab === AuthTab.LoginWithEmail && <LoginWithEmailWidget />}
    </div>
  );
}
