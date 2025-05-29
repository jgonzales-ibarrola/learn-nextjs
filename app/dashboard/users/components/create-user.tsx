import React from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import CreateUserForm from "./create-user-form";
import { Button } from "@/app/ui/button";
import { Prisma } from "@prisma/client";

export type CreateUserProps = {
	userTypes: Prisma.userTypesGetPayload<{}>[]
}

export default function CreateUser({userTypes} : CreateUserProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type="button">
					<PlusIcon />
				Create User
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new user</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>

				<CreateUserForm userTypes={userTypes}/>
			</DialogContent>
		</Dialog>
	);
}
