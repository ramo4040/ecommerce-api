import Link from "next/link";
import { GoogleBtn } from "@/components/google-btn";
import { PrivacyTermsText } from "@/components/privacy-text";
import { Button } from "@/components/ui/button";
import { AuthTab, useAuthModalStore } from "@/entities/auth";

export const IndexAuthWidget = () => {
  const { pushTab } = useAuthModalStore();

  return (
    <>
      <h1 className="title">Your shopping, in stunning clarity.</h1>
      <p className="description">
        Quality guaranteed. hassle-free
        <br />
        returns guaranteed.
      </p>

      <div className="actions">
        <GoogleBtn />
        <Button variant="outline" asChild>
          <Link href={{ pathname: "/auth/register" }}>Register</Link>
        </Button>
        <p className="link-item">
          Already a user ?{" "}
          <Link
            href={{ pathname: "/auth/login" }}
            onClick={() => {
              pushTab(AuthTab.Login);
            }}
          >
            Login here
          </Link>
        </p>
      </div>

      <PrivacyTermsText />
    </>
  );
};
