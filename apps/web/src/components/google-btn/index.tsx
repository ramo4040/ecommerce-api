import Image from "next/image";
import type { ComponentProps, FC } from "react";
import { Button } from "../ui/button";

export const GoogleBtn: FC<ComponentProps<"button">> = ({ ...rest }) => {
  return (
    <Button variant="default" size="lg" {...rest}>
      <Image
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google image"
        width={16}
        height={14}
      />
      Continue with Google
    </Button>
  );
};
