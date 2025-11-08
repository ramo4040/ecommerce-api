import "../style.css";
import Link from "next/link";
import { PasswordInput } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const RegisterWidget = () => {
  return (
    <>
      <h1 className="title">Let’s Get You Shopping</h1>
      <form id="auth-form">
        <FieldSet>
          <FieldGroup>
            <Field>
              <Input id="username" type="text" placeholder="Username" />
            </Field>

            <Field>
              <Input id="email" type="text" placeholder="Email" />
            </Field>

            <PasswordInput placeholder="Password" />
            <PasswordInput placeholder="Confirm Password" />

            <Field>
              <Button size="lg" type="submit">
                Log In
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <p className="link-item">
        Already a user ?{" "}
        <Link href={{ pathname: "/auth/login" }}>Login here</Link>
      </p>
    </>
  );
};
