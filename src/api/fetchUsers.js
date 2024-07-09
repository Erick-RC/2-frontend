
import axiosApi from "./axiosApi"

export const fetchUsers = async () => {
    const token = localStorage.getItem('token'); // O donde sea que almacenes tu token
    const res = await axiosApi.get('/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return res.data
}