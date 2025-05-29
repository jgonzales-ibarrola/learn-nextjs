import { lusitana } from "@/app/ui/fonts";
import React from "react";
import { DataTable } from "./components/user-types/data-table";
import { columns } from "./components/user-types/columns";
import Search from "@/app/ui/search";
import CreateUser from "./components/create-user";
import { fetchUserTypes } from "@/lib/data/user-types";
import { fetchUsers } from "@/lib/data/users";

export default async function page() {
	const [userTypes, users] = await Promise.all([
		await fetchUserTypes(),
		await fetchUsers(),
	]);

	const formattedUsers = users.map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		types: user.userType.map(type => type.userTypes.name)
	}));

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Search invoices..." />
				<CreateUser userTypes={userTypes} />
			</div>
			<DataTable columns={columns} data={formattedUsers} />
			<div className="mt-5 flex w-full justify-center"></div>
		</div>
	);
}
