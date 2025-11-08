import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthModalStore } from "@/entities/auth";

export const ForgotPasswordWidget = () => {
  const { popTab } = useAuthModalStore();
  return (
    <>
      <form id="login-form">
        <FieldSet>
          <FieldGroup>
            <Field>
              <Input id="email" type="text" placeholder="Email" />
            </Field>
            <Field>
              <Button size="lg" type="submit">
                Send Reset Link
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <Button variant="link" className="link-item" onClick={popTab}>
        Back to Login
      </Button>
    </>
  );
};
