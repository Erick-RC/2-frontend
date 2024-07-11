import React, { useEffect, useRef, useContext, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserContext } from '../../services/UserContext';
import { fetchVideoById, updateVideo } from '../../api/fetchVideos';
import { useNavigate, useParams, Link } from 'react-router-dom';
import VideoRecorder from '../../components/VideoR/VideoRecorder';
import { fetchUsers } from '../../api/fetchUsers';

function Edit() {
    const { id } = useParams();
    const [isReady, setIsReady] = useState(false);
    const { user, loading } = useContext(UserContext);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const videoMutation = useMutation({
        mutationFn: updateVideo,
        onSuccess: () => {
            alert('Video actualizado');
            navigate('/videos');
        },
        onError: (error) => {
            console.error('Error en la actualización:', error);
        }
    });

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const {
        status,
        mediaBlobUrl,
        previewStream,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording
    } = useReactMediaRecorder({
        video: true,
        onStop: (blobUrl) => {
            console.log('Grabación detenida:', blobUrl);
        },
        onError: (error) => {
            console.error('Error en la grabación:', error);
        }
    });

    const { data: users, isError: usersError } = useQuery({
        queryKey: ['users'], 
        queryFn: fetchUsers,
    });

    const { data: videoActual, isLoading, isError } = useQuery({
        queryKey: ['videoActual', id], 
        queryFn: () => fetchVideoById(id),
        enabled: !!id,
    });

    useEffect(() => {
        if (videoRef.current && previewStream) {
            videoRef.current.srcObject = previewStream;
        }

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [previewStream]);

    if (loading || isLoading || !isReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3a868f] to-[#71c7d1]">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-100">
                <div className="text-red-600 text-xl font-semibold">Error al cargar el video.</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-100">
                <div className="text-red-600 text-xl font-semibold">Por favor, inicia sesión para editar un video.</div>
            </div>
        );
    }

    const putFormVideo = async (e) => {
        e.preventDefault();
        try {
            const resBlob = await fetch(mediaBlobUrl);
            const videoBlob = await resBlob.blob();

            const data = new FormData(e.target);
            data.append('video', videoBlob, 'video-actualizado.mp4');
            await videoMutation.mutateAsync({ id: videoActual._id, data });
        } catch (error) {
            console.error('Error al subir el video:', error);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-r from-[#3a868f] to-[#71c7d1] py-12 px-4 sm:px-6 lg:px-8">
            <Link
                to='/videos'
                className="fixed top-5 left-5 bg-white text-[#3a868f] py-2 px-4 rounded-full shadow-lg hover:bg-[#3a868f] hover:text-white transition duration-300"
            >
                ← Volver
            </Link>
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <form className="p-8" onSubmit={putFormVideo}>
                    <h2 className="text-3xl font-bold text-[#3a868f] mb-6 text-center">Editar Video</h2>
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a868f] focus:border-transparent"
                            type="text"
                            name="title"
                            defaultValue={videoActual?.title}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="user" className="block text-gray-700 text-sm font-bold mb-2">Usuario:</label>
                        <input
                            type="text"
                            value={`${user.name} ${user.lastname}`}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a868f] focus:border-transparent"
                        />
                        <input type="hidden" name="user" value={user._id} />
                    </div>
                    <VideoRecorder
                        status={status}
                        mediaBlobUrl={mediaBlobUrl}
                        startRecording={startRecording}
                        resumeRecording={resumeRecording}
                        pauseRecording={pauseRecording}
                        stopRecording={stopRecording}
                        videoRef={videoRef}
                    />
                    <div className="flex justify-between items-center mt-8">
                        <button
                            className="px-6 py-2 bg-[#3a868f] hover:bg-[#2c666d] text-white font-bold rounded-full transition duration-300 shadow-lg"
                            type="submit"
                        >
                            Guardar Cambios
                        </button>
                        <button
                            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition duration-300 shadow-lg"
                            type="button"
                            onClick={() => navigate('/videos')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Edit;