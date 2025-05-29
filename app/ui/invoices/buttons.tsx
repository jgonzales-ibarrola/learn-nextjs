"use client";
import LoadingSpinner from "@/components/loading-spinner";
import { deleteInvoice } from "@/lib/actions/invoice";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function CreateInvoice() {
	return (
		<Link
			href="/dashboard/invoices/create"
			className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		>
			<span className="hidden md:block">Create Invoice</span>{" "}
			<PlusIcon className="h-5 md:ml-4" />
		</Link>
	);
}

export function UpdateInvoice({ id }: { id: string }) {
	return (
		<Link
			href={`/dashboard/invoices/${id}/edit`}
			className="rounded-md border p-2 hover:bg-gray-100"
		>
			<PencilIcon className="w-5" />
		</Link>
	);
}

export function DeleteInvoice({ id }: { id: string }) {
	const [isPending, startTransition] = useTransition();
	const { register, handleSubmit } = useForm<{ id: string }>();

	const onSubmit: SubmitHandler<{ id: string }> = (formData: {
		id: string;
	}) => {
		startTransition(async () => {
			const result = await deleteInvoice(formData.id);

			if (!result.ok) {
				toast.error(result.message);
			} else if (result.ok) {
				toast.success(result.message);
			}
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					className="sr-only"
					defaultValue={id}
					{...register("id")}
				/>
				<button
					type="submit"
					className="rounded-md border p-2 hover:bg-gray-100"
					disabled={isPending}
				>
					<span className="sr-only">Delete</span>
					{isPending ? (
            <span className="w-6 h-5">...</span>
          ) : <TrashIcon className="w-5" />}
				</button>
			</form>
		</>
	);
}
