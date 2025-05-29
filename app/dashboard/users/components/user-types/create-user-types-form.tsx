"use client";
import {
	CreateUserTypesSchema,
	TCreateUserTypesFormValues,
	UserTypesFormState,
} from "@/lib/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUserType } from "@/lib/actions/user-type";

export default function CreateUserTypesForm() {
	const [errors, setErrors] = useState<UserTypesFormState["fieldErrors"]>({});
	const [isPending, startTransition] = useTransition();
	const form = useForm<TCreateUserTypesFormValues>({
		resolver: zodResolver(CreateUserTypesSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	function onSubmit(values: TCreateUserTypesFormValues) {
		console.log(values);

		startTransition(async () => {
			const result = await createUserType(values);

			if (result.fieldErrors) {
				setErrors(result.fieldErrors);
				toast.success("Input missing field(s).");
			} else if (result.message) {
				setErrors({});
				toast.success(result.message);
			}
		});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your name"
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your description"
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">
					{isPending ? "Creating..." : "Create"}
				</Button>
			</form>
		</Form>
	);
}
