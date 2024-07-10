import axiosApi from "./axiosApi";


export const fetchVideos = async (userId) => {
    const url = userId ? `/videos?user=${userId}` : '/videos';
    const response = await axiosApi.get(url);
    return response.data;
  };

export const fetchVideoById = async (id) => {
    const res = await axiosApi.get(`/videos/${id}`);
    return res.data;
};

export const postVideo = async (data) => {
    const res = await axiosApi.post('/videos', data);
    return res.data;
};

export const deleteVideo = async (id) => {
    const res = await axiosApi.delete(`/videos/${id}`);
    return res.data;
};

export const updateVideo = async ({ id, data }) => {
    const res = await axiosApi.put(`/videos/${id}`, data);
    return res.data;
};