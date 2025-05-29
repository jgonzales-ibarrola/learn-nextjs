import { string, z } from "zod";

export const FormSchema = z.object({
	id: string(),
	name: string().min(1, "name is required"),
	description: string().min(1, "description is required"),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const CreateUserTypesSchema = FormSchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export type TCreateUserTypesFormValues = z.infer<typeof CreateUserTypesSchema>;

export type UserTypesFormState = {
	fieldErrors?: Partial<Record<keyof z.infer<typeof FormSchema>, string>>;
	message?: string;
};
