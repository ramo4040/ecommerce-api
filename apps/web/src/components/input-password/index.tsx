import "./style.css";
import { Eye, EyeClosed } from "lucide-react";
import { type ComponentProps, type FC, useState } from "react";
import { Input } from "../ui/input";

export const PasswordInput: FC<
  ComponentProps<"input"> & { error?: string }
> = ({ error, ...rest }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div id="password-field">
      <Input
        type={passwordVisible ? "text" : "password"}
        placeholder="password"
        {...rest}
      />
      {passwordVisible ? (
        <EyeClosed onClick={() => setPasswordVisible(!passwordVisible)} />
      ) : (
        <Eye onClick={() => setPasswordVisible(!passwordVisible)} />
      )}
    </div>
  );
};
