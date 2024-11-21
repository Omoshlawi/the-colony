import { z } from "zod";
import { LoginShema, RegisterSchema } from "../utils";

export type User = {};

export type LoginFormData = z.infer<typeof LoginShema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
