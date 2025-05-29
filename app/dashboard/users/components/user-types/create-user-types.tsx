import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/app/ui/button';
import { PlusIcon } from 'lucide-react';
import CreateUserTypesForm from './create-user-types-form';

export default function CreateUserTypes() {
  return (
    <Dialog>
			<DialogTrigger asChild>
				<Button type="button">
					<PlusIcon />
				Create User Type
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new user type</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>

				<CreateUserTypesForm />
			</DialogContent>
		</Dialog>
  )
}
