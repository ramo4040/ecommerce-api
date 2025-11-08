import "./style.css";
import { EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const LoginWithEmailWidget = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <h1 className="title">
        Login into your {process.env.NEXT_PUBLIC_COMPANY_NAME} account
      </h1>
      <form id="login-form">
        <FieldSet>
          <FieldGroup>
            <Field>
              <Input id="email" type="text" placeholder="Email" />
            </Field>
            <Field className="password-field">
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="password"
              />
              <EyeClosed onClick={() => setPasswordVisible(!passwordVisible)} />
            </Field>
            <Field>
              <Button size="lg" type="submit">
                Log In
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <Link href={{ pathname: "/auth/forgot-password" }} className="link-item">
        Forgot password?
      </Link>
    </>
  );
};
