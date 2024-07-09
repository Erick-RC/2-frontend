import axiosApi from "./axiosApi";

export const fetchVideos = async () => {
    const res = await axiosApi.get('/videos');
    return res.data;
};

export const fetchVideoById = async (id) => {
    const res = await axiosApi.get(`/videos/${id}`);
    return res.data;
};

export const postVideo = async (data) => {
    const res = await axiosApi.post('/videos', data)
    return res.data;
}