import { lusitana } from "@/app/ui/fonts";
import React from "react";
import { DataTable } from "../components/user-types/data-table";
import CreateUserTypes from "../components/user-types/create-user-types";
import { columns } from "../components/user-types/columns";
import { prisma } from "@/lib/prisma";
import { fetchUserTypes } from "@/lib/data/user-types";

export default async function page() {
	const userTypes = await fetchUserTypes();

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${lusitana.className} text-2xl`}>User Types</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<div></div>
				<CreateUserTypes />
			</div>
			<DataTable columns={columns} data={userTypes} />
			<div className="mt-5 flex w-full justify-center"></div>
		</div>
	);
}
