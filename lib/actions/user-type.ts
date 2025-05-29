"use server";

import { revalidatePath } from "next/cache";
import {
	CreateUserTypesSchema,
	TCreateUserTypesFormValues,
	UserTypesFormState,
} from "../types/user-types";
import { prisma } from "../prisma";

export async function createUserType(formData: TCreateUserTypesFormValues): Promise<UserTypesFormState> {
	const parsed = CreateUserTypesSchema.safeParse(formData);

	if (!parsed.success) {
		const fieldErrors: UserTypesFormState["fieldErrors"] = {};
		console.log("issues", parsed.error.issues);
		for (const issue of parsed.error.issues) {
			const field = issue.path[0] as keyof typeof fieldErrors;
			fieldErrors[field] = issue.message;
		}

		return { fieldErrors };
	}

  try {
    await prisma.userTypes.create({
      data: parsed.data
    })
    revalidatePath('/dashboard/users/user-types')

    return { message: "Successfully Created New User Type."}
  } catch (error) {
    return { message: "Failed to Create New User Type."}
  }
}
