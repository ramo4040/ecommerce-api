import "./style.css";
import Link from "next/link";

export const PrivacyTermsText = () => {
  return (
    <p id="terms-privacy-text">
      By continuing, you acknowledge that you have read and agree to Chronicle's{" "}
      <Link href={{ pathname: "/terms" }}>Terms & Conditions</Link> and{" "}
      <Link href={{ pathname: "/privacy" }}>Privacy Policy</Link>.
    </p>
  );
};
