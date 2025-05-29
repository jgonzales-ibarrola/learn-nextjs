import { string, z } from "zod";

export const FormSchema = z.object({
  id: string(),
  name: string().min(1, 'name is required'),
  email: string().email({message: "input a valid email"}),
  password: string().min(1, 'input your password'),
  user_type_id: string({message: 'type is required'}),
  create_at: z.coerce.date(),
  updated_at: z.coerce.date()
})

export const CreateUserSchema = FormSchema.omit({ id: true, create_at: true, updated_at: true })

export type TCreateUserFormValues = z.infer<typeof CreateUserSchema>;

export type UserFormState = {
	fieldErrors?: Partial<Record<keyof z.infer<typeof CreateUserSchema>, string>>;
	message?: string;
};