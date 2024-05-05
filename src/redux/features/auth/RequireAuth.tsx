"use client";
import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

interface RequireAuthProps {
	children: React.ReactNode;
}
const RequireAuth = ({ children }: RequireAuthProps) => {
	// * initialize router
	const router = useRouter();
	const { isAuthenticated }= useAppSelector(
		(state) => state.auth
	);
	useEffect(()=>{
		// need is loading so that in the case one is not authenticated we dont display the page for some time then redirect them
		if (!isAuthenticated) {
			router.push("/auth/login");
		}
	})

	return <>{children} </>;
};

export default RequireAuth;
