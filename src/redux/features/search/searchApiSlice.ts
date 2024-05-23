import { baseApi } from "../baseApi";
import { TInnovation,TProfile } from "@/lib/types";
const searchApiSlice = baseApi.injectEndpoints({
    overrideExisting:true,
	endpoints: (builder) => ({
        // * search innovations
        searchInnovations: builder.query<{innovations: TInnovation[]}, string>({
            query: (query) => `api/search/${query}`,
        }),
        
        // * search profiles
        searchProfiles: builder.query<{profiles: TProfile[]}, string>({
        query: (query) => `api/search/${query}/`,
        }),
    })
})

export const {
    useSearchInnovationsQuery,
    useSearchProfilesQuery
} = searchApiSlice