"use client";
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUsersActivationMutation } from "@/redux/features/users/usersApiSlice";
import { useRouter } from "next/navigation";

interface Params {
	uid: string;
	token: string;
}

const ActivationPage = ({ params }:  { params: Params }) => {
	// * retrieve uid and token from params
	const uid = params.uid
	const token  = params.token;

	// * initialize usereset password mutation
	const [activateAccount, { isLoading }] = useUsersActivationMutation();

	// * initilize toast
	const { toast } = useToast();

	// * initialize router
	const router = useRouter();

	useEffect(() => {
		// * making request to activate account
		
		activateAccount({ uid , token})
			.unwrap()
			.then(() => {
				toast({
					title: "Account activation successfull",
					description: "redirecting you to login page",
				});
				// * redirecting to login page
				router.push("/auth/login");
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			{/* // TODO implement spinner based on isLoading received from mutation */}

			<h1 className="text-xl font-semibold text-center mt-32">
				Kindly wait as we activate your account...
			</h1>
		</div>
	);
};

export default ActivationPage;
