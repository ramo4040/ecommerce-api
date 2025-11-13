import { PasswordInput } from "@/components/input-password";
import "../style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  AuthTab,
  authApi,
  loginDtoSchema,
  useAuthModalStore,
} from "@/entities/auth";
import type { LoginDto } from "@/entities/auth/types/types";

export const LoginWithEmailWidget = () => {
  const { register, handleSubmit, formState } = useForm<LoginDto>({
    resolver: zodResolver(loginDtoSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { pushTab } = useAuthModalStore();
  const { isPending, mutate } = authApi.login();
  const onSubmit: SubmitHandler<LoginDto> = (data) => mutate(data);

  return (
    <>
      <form id="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <Input {...register("email")} placeholder="Email" />
              <FieldError
                errors={[{ message: formState.errors.email?.message || "" }]}
              />
            </Field>

            <Field>
              <PasswordInput
                {...register("password")}
                id="password"
                error={formState.errors.password?.message}
              />

              <FieldError
                errors={[{ message: formState.errors.password?.message || "" }]}
              />
            </Field>

            <Field>
              <Button size="lg" type="submit" disabled={isPending}>
                {isPending && <Spinner />}
                Log In
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <Button
        onClick={() => {
          pushTab(AuthTab.ForgotPassword);
        }}
        variant="link"
        className="link-item"
      >
        Forgot password?
      </Button>
    </>
  );
};
