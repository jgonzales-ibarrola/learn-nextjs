"use client";
import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	CreateUserSchema,
	TCreateUserFormValues,
	UserFormState,
} from "@/lib/types/users";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { createUser } from "@/lib/actions/users";
import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";

export type CreateUserFormProps = {
	userTypes: Prisma.userTypesGetPayload<{}>[]
}

export default function CreateUserForm({userTypes} : CreateUserFormProps) {
	const [errors, setErrors] = useState<UserFormState["fieldErrors"]>({});
	const [isPending, startTransition] = useTransition();
	const form = useForm<TCreateUserFormValues>({
		resolver: zodResolver(CreateUserSchema),
		defaultValues: {
			name: "",
			email: "",
			user_type_id: '',
			password: "",
		},
	});

	function onSubmit(values: TCreateUserFormValues) {
		console.log(values);

		startTransition(async () => {
			const result = await createUser(values);

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
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your email"
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
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your password"
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
          name="user_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {userTypes.map((type) => {
										const { name, id } = type;

										return (
											<SelectItem key={id} value={id}>
												{name}
											</SelectItem>
										)
									})}
                </SelectContent>
              </Select>
              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

				{errors && (
					<ul>
						{errors.name && (
							<li className="text-red-400/80">{errors.name}</li>
						)}
						{errors.email && (
							<li className="text-red-400/80">{errors.email}</li>
						)}
						{errors.password && (
							<li className="text-red-400/80">
								{errors.password}
							</li>
						)}
					</ul>
				)}

				<Button type="submit">
					{isPending ? "Creating..." : "Create"}
				</Button>
			</form>
		</Form>
	);
}
