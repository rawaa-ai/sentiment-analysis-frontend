import axios from 'axios'

const backend_url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem("token");

export const login = async(username, password) => {
    const response = await axios.post(
        `${backend_url}api/v1/login/access-token`,
        new URLSearchParams({ username, password }),
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    );
    localStorage.setItem("token", response.data.access_token);
};

export const register = async(firstname, lastname, email, password) => {
    try {
        const response = await axios.post(
            `${backend_url}api/v1/users/register`, {
                firstname,
                lastname,
                email,
                password
            },
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log('response:', response.data);
        return response.data;
    } catch (error) {
        throw new Error ("Registration failed: " + error.response?.data?.detail || error.message);
    }
}

export const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const response = await axios.get(`${backend_url}api/v1/users/check`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.status === 200;
    } catch {
        return false;
    }
};