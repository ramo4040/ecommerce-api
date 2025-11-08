import { GoogleBtn } from "@/components/google-btn";
import { PrivacyTermsText } from "@/components/privacy-text";
import { Button } from "@/components/ui/button";
import { AuthTab, useAuthModalStore } from "@/entities/auth";

export const LoginAuthWidget = () => {
  const { pushTab } = useAuthModalStore();

  return (
    <>
      <h1 className="title">
        Login into your {process.env.NEXT_PUBLIC_COMPANY_NAME} account
      </h1>
      <div className="actions">
        <GoogleBtn />
        <Button
          variant="ghost"
          onClick={() => {
            pushTab(AuthTab.LoginWithEmail);
          }}
        >
          Login with email
        </Button>
      </div>

      <PrivacyTermsText />
    </>
  );
};
