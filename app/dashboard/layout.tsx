import React, { ReactNode } from "react";
import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
			<div>
				<SideNav />
			</div>

			<div className="flex-grow p-6 md:overflow-y-auto md:p-12">
				{children}
			</div>
		</div>
	);
}
