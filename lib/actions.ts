"use server";

import postgres from "postgres";
import { revalidatePath } from "next/cache";
import {
	CreateInvoice,
	CreateInvoiceFormValues,
	InvoiceFormState,
	UpdateInvoice,
	UpdateInvoiceFormValues,
} from "./types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function createInvoice(
	formData: CreateInvoiceFormValues
): Promise<InvoiceFormState> {
	const parsed = CreateInvoice.safeParse(formData);

	if (!parsed.success) {
		const fieldErrors: InvoiceFormState["fieldErrors"] = {};
		console.log("issues", parsed.error.issues);
		for (const issue of parsed.error.issues) {
			const field = issue.path[0] as keyof typeof fieldErrors;
			fieldErrors[field] = issue.message;
		}

		return { fieldErrors };
	}

	const { amount, customerId, status } = parsed.data;

	const amountInCents = amount * 100;
	const date = new Date().toISOString().split("T")[0];

	try {
		await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
		revalidatePath("/dashboard/invoices");
		return { message: "Created new invoice." };
	} catch (error) {
		console.log(error);
		return { message: "Failed creating new invoice." };
	}
}

export async function updateInvoice(
	id: string,
	formData: UpdateInvoiceFormValues
): Promise<InvoiceFormState> {
	const parsed = UpdateInvoice.safeParse(formData);

	if (!parsed.success) {
		const fieldErrors: InvoiceFormState["fieldErrors"] = {};
		console.log("issues", parsed.error.issues);
		for (const issue of parsed.error.issues) {
			const field = issue.path[0] as keyof typeof fieldErrors;
			fieldErrors[field] = issue.message;
		}

		return { fieldErrors };
	}

	const { amount, customerId, status } = parsed.data;

	const amountInCents = amount * 100;

	try {
		await sql`
    UPDATE invoices 
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
		revalidatePath("/dashboard/invoices");
		return { message: "Successfully Updated." };
	} catch (error) {
		console.log("error");
		return { message: "Failed updating an invoice." };
	}
}

export async function deleteInvoice(id: string): Promise<{
	ok: boolean,
	message: string
}> {
	if (!id) {
		return { ok: false, message: "ID not found." };
	}

	try {
		await sql`DELETE FROM invoices WHERE id = ${id}`;
		revalidatePath("/dashboard/invoices");
		return { ok: true, message: "Successfully deleted a todo." };
	} catch (error) {
		console.log(error);
		return { ok: false, message: "Failed to delete a todo." };
	}
}
