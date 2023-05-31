import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "lib/constants";

export const RegisterSchema = z
  .object({
    username: z.string().min(4).max(10),
    email: z.string().email(),
    password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "Must have at least one uppercase character")
      .regex(new RegExp(".*[a-z].*"), "Must have at least one lowercase character")
      .regex(new RegExp(".*\\d.*"), "Must have at least one number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "Must have at least one special character"
      )
      .min(8, "Must be at least 8 characters in length"),
    confirmPassword: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "Must have at least one uppercase character")
      .regex(new RegExp(".*[a-z].*"), "Must have at least one lowercase character")
      .regex(new RegExp(".*\\d.*"), "Must have at least one number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "Must have at least one special character"
      )
      .min(8, "Must be at least 8 characters in length"),
    policy: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export const loginSchemaValidator = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "Must have at least one uppercase character")
    .regex(new RegExp(".*[a-z].*"), "Must have at least one lowercase character")
    .regex(new RegExp(".*\\d.*"), "Must have at least one number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "Must have at least one special character"
    )
    .min(8, "Must be at least 8 characters in length"),
});
export const courseFormSchemaValidator = z
  .object({
    firstName: z
      .union([z.string().length(0), z.string().min(4)])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    lastName: z
      .union([z.string().length(0), z.string().min(4)])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    currentPassword: z
      .union([z.string().length(0), z.string().min(6)])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    newPassword: z
      .union([z.string().length(0), z.string().min(6)])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    confirmPassword: z
      .union([z.string().length(0), z.string().min(6)])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    profilePicture: z
      .any()
      .optional()
      .refine(
        (files) => files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      ) // this should be greater than or equals (>=) not less that or equals (<=)
      .refine(
        (files) => files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export type LoginSchemaType = z.infer<typeof loginSchemaValidator>;
