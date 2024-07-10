import React, { useEffect, useRef, useContext, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserContext } from '../../services/UserContext';
import { fetchVideoById, updateVideo } from '../../api/fetchVideos';
import { useNavigate, useParams } from 'react-router-dom';
import VideoRecorder from '../../components/VideoR/VideoRecorder';
import { fetchUsers } from '../../api/fetchUsers';

function Edit() {
    const { id } = useParams(); // Obtener el id de los parámetros de la URL
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
        enabled: !!id, // Solo ejecutar la consulta si id está disponible
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

    if (isLoading) {
        return <p>CARGANDO....</p>;
    }

    if (isError) {
        return <p>Error al cargar el video.</p>;
    }

    const putFormVideo = async (e) => {
        e.preventDefault();
        try {
            const resBlob = await fetch(mediaBlobUrl);
            const videoBlob = await resBlob.blob();

            const data = new FormData(e.target);
            data.append('video', videoBlob, 'video-neymar.mp4');
            await videoMutation.mutateAsync({ id: videoActual._id, data });
        } catch (error) {
            console.error('Error al subir el video:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        return <div>Por favor, inicia sesión para crear un video.</div>;
    }

    if (!isReady) {
        return <div>Preparando el grabador...</div>;
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8" onSubmit={putFormVideo}>
                <h2 className="text-2xl font-bold text-MainSky mb-6 text-center">Editar Video</h2>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-MainSky focus:border-transparent"
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
                <div className="flex justify-between items-center">
                    <button
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition duration-300"
                        type="submit"
                    >
                        Guardar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300"
                        type="button"
                        onClick={() => navigate('/videos')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </main>
    );
}

export default Edit;
