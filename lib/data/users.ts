import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export async function fetchUsers(): Promise<
	Prisma.usersGetPayload<{
		include: {
			userType: {
				include: {
					userTypes: true;
				};
			};
		};
	}>[]
> {
	return await prisma.users.findMany({
		include: {
			userType: {
				include: {
					userTypes: true,
				},
			},
		},
		orderBy: {
			updated_at: "desc"
		}
	});
}
