"use client";
import { useAuthModalStore } from "@/entities/auth";
import "./style.css";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/widgets";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { tab, popTab } = useAuthModalStore();

  return (
    <main id="auth-container">
      {tab.length > 1 && (
        <Button variant="secondary" className="back-btn" onClick={popTab}>
          <ArrowLeftIcon size={14} />
          Back
        </Button>
      )}
      <Logo />
      <div className="auth-card">{children}</div>
    </main>
  );
}
