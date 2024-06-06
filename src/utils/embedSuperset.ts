import axios from 'axios';

export const supersetUrl = "http://localhost:8088";
export const supersetApiUrl = supersetUrl + "/api/v1/security";
export const dashboardId = "795981b3-a645-425b-a9ea-fe8970bc30dd";

export async function fetchGuestTokenFromBackend() {
    const access_token = await getToken()
    // Calling guest token
    const guest_token_body = {
        resources: [
            {
                type: "dashboard",
                id: dashboardId,
            },
        ],
        rls: [],
        user: {
            username: "guest",
            first_name: "Guest",
            last_name: "User",
        },
    };

    const guest_token_headers = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
        },
    }; console.log("Access token ", access_token)

    console.log(supersetApiUrl + '/guest_token/')
    console.log(guest_token_body)
    console.log(guest_token_headers)
    return await axios.post(supersetApiUrl + '/guest_token/', guest_token_body, guest_token_headers)
        .then(dt => {
            console.log("guestToken: ", dt.data['token'])
            return dt.data['token']
        })
        .catch(error => console.log(error))
}


export async function getToken() {
    //calling login to get access token
    const login_body = {
        password: "1",
        provider: "db",
        refresh: true,
        username: "guest",
    };

    const login_headers = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    console.log(supersetApiUrl + '/login')
    const { data } = await axios.post(supersetApiUrl + '/login', login_body, login_headers)
    const access_token = data['access_token']
    return access_token

}
