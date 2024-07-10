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
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-xl font-semibold text-MainSky">Cargando información...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-xl font-semibold text-red-500">No se encontraron datos</p>
            </div>
        );
    }

    const handleDeleteVideo = async () => {
        const respuesta = confirm('¿Deseas eliminar el video?');
        if (!respuesta) return;

        await deleteVideoMutation.mutateAsync(data._id);
    };

    return (
        <main className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
            <Link 
                to='/videos' 
                className="absolute top-5 left-5 bg-[#3a868f] hover:bg-opacity-80 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
                Volver
            </Link>
            <section className="mb-8">
                <video
                    src={`http://localhost:3000/videos/content/${id}`}
                    controls
                    autoPlay
                    className="w-full rounded-lg shadow-md"
                ></video>
            </section>
            <section className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-[#3a868f]">{data.title}</h1>
                <p className="text-lg text-gray-700">
                    Usuario: <span className="font-semibold">{data.user.name} {data.user.lastname}</span>
                </p>
            </section>
            <section className="flex justify-end items-center gap-4">
                <button className="px-6 py-3 bg-[#3a868f] hover:bg-opacity-80 text-white rounded-lg font-bold shadow-md transition duration-300"
                onClick={() => navigate(`/videos/edit/${data._id}`)}
                >
                    Editar
                </button>
                <button 
                    className="px-6 py-3 bg-red-500 hover:bg-opacity-80 text-white rounded-lg font-bold shadow-md transition duration-300" 
                    onClick={handleDeleteVideo}
                >
                    Eliminar
                </button>
            </section>
        </main>
    );
}

export default Detail;
