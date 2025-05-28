import { z } from "zod";

export const FormSchema = z.object({
	id: z.string(),
	customerId: z.string({message: "choose a customer"}).min(1, 'choose a customer'),
	amount: z.coerce.number().min(1, 'amount must be greater than 1'),
	status: z.enum(["pending", "paid"], {
    message: 'choose status'
  }),
	date: z.string(),
});

export const CreateInvoice = FormSchema.omit({ id: true, date: true });
export const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type CreateInvoiceFormValues = z.infer<typeof CreateInvoice>
export type UpdateInvoiceFormValues = z.infer<typeof UpdateInvoice>

export type InvoiceFormState = {
	fieldErrors?: Partial<Record<keyof z.infer<typeof FormSchema>, string>>;
	message?: string;
};