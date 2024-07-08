import axiosApi from "./axiosApi"

export const fetchVideos = async () => {
    const res = await axiosApi.get('/videos')
    return res.data
}