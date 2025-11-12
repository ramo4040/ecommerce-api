import z from "zod";

export const userValidationSchema = z.object({
  email: z.string().email({ pattern: z.regexes.rfc5322Email }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const loginDtoSchema = userValidationSchema.extend({});
