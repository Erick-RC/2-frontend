import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteVideo, fetchVideoById } from "../../api/fetchVideos";

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const { data, isError, isLoading } = useQuery({
        queryKey: ['video', id],
        queryFn: () => fetchVideoById(id),
    });

    const deleteVideoMutation = useMutation({
        mutationFn: deleteVideo,
        onSuccess: () => {
            alert('Video eliminado');
            navigate('/videos');
        },
        onError: () => alert('Error al eliminar el video'),
    });

    if (isError) {
        navigate('/videos');
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3a868f] to-[#71c7d1]">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-100">
                <div className="text-red-600 text-xl font-semibold">No se encontraron datos</div>
            </div>
        );
    }

    const handleDeleteVideo = async () => {
        const respuesta = confirm('¿Deseas eliminar el video?');
        if (!respuesta) return;

        await deleteVideoMutation.mutateAsync(data._id);
    };

    return (
        <main className="min-h-screen bg-gradient-to-r from-[#3a868f] to-[#71c7d1] py-12 px-4 sm:px-6 lg:px-8">
            <Link
                to='/videos'
                className="fixed top-5 left-5 bg-white text-[#3a868f] py-2 px-4 rounded-full shadow-lg hover:bg-[#3a868f] hover:text-white transition duration-300"
            >
                ← Volver
            </Link>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <section className="p-8">
                    <video
                        src={`http://localhost:3000/videos/content/${id}`}
                        controls
                        autoPlay
                        className="w-full rounded-lg shadow-md mb-8"
                    ></video>
                    <h1 className="text-3xl font-bold mb-2 text-[#3a868f]">{data.title}</h1>
                    <p className="text-lg text-gray-700 mb-8">
                        Usuario: <span className="font-semibold">{data.user.name} {data.user.lastname}</span>
                    </p>
                    <div className="flex justify-end items-center gap-4">
                        <button 
                            className="px-6 py-3 bg-[#3a868f] hover:bg-[#2c666d] text-white rounded-full font-bold shadow-md transition duration-300"
                            onClick={() => navigate(`/videos/edit/${data._id}`)}
                        >
                            Editar
                        </button>
                        <button 
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold shadow-md transition duration-300"
                            onClick={handleDeleteVideo}
                        >
                            Eliminar
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Detail;