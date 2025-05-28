"use client";
import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import {
	CheckIcon,
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreateInvoiceFormValues, InvoiceFormState } from "@/lib/types";
import { createInvoice } from "@/lib/actions";

export default function Form({ customers }: { customers: CustomerField[] }) {
	const [errors, setErrors] = useState<InvoiceFormState["fieldErrors"]>();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const { register, handleSubmit } = useForm<CreateInvoiceFormValues>();

	const onSubmit: SubmitHandler<CreateInvoiceFormValues> = (
		formData: CreateInvoiceFormValues
	) => {
		startTransition(async () => {
			const result = await createInvoice(formData);

			if (result.fieldErrors) {
				setErrors(result.fieldErrors);
				toast.error("Fill the missing input(s).");
			} else if (result.message) {
				toast.success(result.message);
				router.push(`/dashboard/invoices`);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* Customer Name */}
				<div className="mb-4">
					<label
						htmlFor="customer"
						className="mb-2 block text-sm font-medium"
					>
						Choose customer
					</label>
					<div className="relative">
						<select
							id="customer"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							defaultValue=""
							{...register("customerId")}
						>
							<option value="" disabled>
								Select a customer
							</option>
							{customers.map((customer) => (
								<option key={customer.id} value={customer.id}>
									{customer.name}
								</option>
							))}
						</select>
						<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
					</div>
				</div>

				{/* Invoice Amount */}
				<div className="mb-4">
					<label
						htmlFor="amount"
						className="mb-2 block text-sm font-medium"
					>
						Choose an amount
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="amount"
								type="number"
								step="0.01"
								placeholder="Enter USD amount"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								{...register("amount")}
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
				</div>

				{/* Invoice Status */}
				<fieldset>
					<legend className="mb-2 block text-sm font-medium">
						Set the invoice status
					</legend>
					<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
						<div className="flex gap-4">
							<div className="flex items-center">
								<input
									id="pending"
									type="radio"
									value="pending"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
									{...register("status")}
								/>
								<label
									htmlFor="pending"
									className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
								>
									Pending <ClockIcon className="h-4 w-4" />
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="paid"
									{...register("status")}
									type="radio"
									value="paid"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label
									htmlFor="paid"
									className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
								>
									Paid <CheckIcon className="h-4 w-4" />
								</label>
							</div>
						</div>
					</div>
				</fieldset>

				{errors && (
					<ul>
						{errors.customerId && (
							<li className="text-red-400/80">
								{errors.customerId}
							</li>
						)}
						{errors.amount && (
							<li className="text-red-400/80">{errors.amount}</li>
						)}
						{errors.status && (
							<li className="text-red-400/80">{errors.status}</li>
						)}
					</ul>
				)}
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/invoices"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">
					{isPending ? "Pending..." : "Create Invoice"}
				</Button>
			</div>
		</form>
	);
}
