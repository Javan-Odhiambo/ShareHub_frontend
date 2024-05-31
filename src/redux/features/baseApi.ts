import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl: string = "http://localhost:8000"

import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout , setAuth} from "./auth/authSlice";
import { Mutex } from "async-mutex";


const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl: baseUrl,
	credentials: "include",
});
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {

	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
	
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{
                        url:"/auth/jwt/refresh/",
                        method:"POST"
                    },
					api,
					extraOptions
				);
				if (refreshResult.data) {
                    api.dispatch(setAuth());
			
					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				
				release();
			}
		} else {
			
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
    endpoints:(builder)=>({}),
	tagTypes: ['INNOVATIONS', 'SINGLE_INNOVATION', 'BOOKMARK', 'LIKE', 'COMMENTS','PROFILE', "DRAFTS"],
})