'use server';
import { prisma } from "@/lib/prisma";
import {
	CreateUserSchema,
	TCreateUserFormValues,
	UserFormState,
} from "../types/users";
import { revalidatePath } from "next/cache";

export async function createUser(
	formData: TCreateUserFormValues
): Promise<UserFormState> {
	const parsed = CreateUserSchema.safeParse(formData);

	if (!parsed.success) {
		const fieldErrors: UserFormState["fieldErrors"] = {};
		console.log("issues", parsed.error.issues);
		for (const issue of parsed.error.issues) {
			const field = issue.path[0] as keyof typeof fieldErrors;
			fieldErrors[field] = issue.message;
		}

		return { fieldErrors };
	}

	const {email, name, password, user_type_id} = parsed.data

	try {
		const newUser = await prisma.users.create({
			data: {
				name,
				email,
				password,
			},
		});

		await prisma.userType.create({
			data: {
				user_id: newUser.id,
				user_type_id
			}
		})

		revalidatePath('/dashboard/users')

		return { message: "Successfully created new user." };
	} catch (error) {
		console.log(error);
		return { message: "Failed to create user." };
	}
}
