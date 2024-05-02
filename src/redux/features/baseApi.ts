import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl: string = "https://localhost:8000"

import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout , setToken} from "./auth/authSlice";
import { Mutex } from "async-mutex";


const mutex = new Mutex();
const baseQuery = fetchBaseQuery({ baseUrl: baseUrl });
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
                        url:"/jwt/refresh/",
                        method:"POST"
                    },
					api,
					extraOptions
				);
				if (refreshResult.data) {
                    api.dispatch(setToken(refreshResult.data));
					// TODO when testing add a console.log to see how refreshResult.data looks like
					//console.log(refreshResult.data)
			
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
    endpoints:(build)=>({})
})