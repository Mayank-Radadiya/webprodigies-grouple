import { z } from "zod"

export const SignInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, { message: "Your password must be at least 8 characters long" })
        .max(40, {
            message: "Your password can not be longer then 40 characters long",
        })
        .refine(
            (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
            "password should contain only alphabets and numbers",
        ),
})
