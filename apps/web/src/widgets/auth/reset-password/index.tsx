import Link from "next/link";
import { PasswordInput } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";

export const ResetPasswordWidget = () => {
  return (
    <>
      <form id="auth-form">
        <FieldSet>
          <FieldGroup>
            <Field>
              <PasswordInput placeholder="New Password" />
              <PasswordInput placeholder="Confirm New Password" />
            </Field>
            <Field>
              <Button size="lg" type="submit">
                Submit
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <Link className="link-item" href={{ pathname: "/auth/login" }}>
        Back to Login
      </Link>
    </>
  );
};
