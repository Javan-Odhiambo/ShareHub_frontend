"use client";
import React, { useEffect } from "react";
import { useUsersActivationMutation } from "@/redux/features/users/usersApiSlice";

interface Params {
	uid: string;
	token: string;
}

const ActivationPage = (params: Params) => {
	// retrieve uid and token from params
	const { uid, token } = params;
	// initialize usereset password mutation
	const [activateAccount, { isLoading }] = useUsersActivationMutation();
    useEffect(() =>{

        // making request to activate account
        const requestDetails = {
			uid: uid,
			token: token,
		};
		activateAccount(requestDetails)
			.unwrap()
			.then(
			// todo redirect and toast notification
            )
			.catch((error) => console.log(error));
    },[])
		
	return (
		<div>
			{/*// todo implement spinner */}
			<h1 className="text-xl font-semibold text-center mt-32">
				Kindly wait as we activate your account...
			</h1>
		</div>
	);
};

export default ActivationPage;
