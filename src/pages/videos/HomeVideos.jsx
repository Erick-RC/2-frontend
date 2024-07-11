import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchVideos } from '../../api/fetchVideos';
import { Link } from 'react-router-dom';
import { UserContext } from '../../services/UserContext';

function HomeVideos() {
    const { user, loading } = useContext(UserContext);
    
    const { data, error, isLoading } = useQuery({
        queryKey: ['videos', user?._id],
        queryFn: () => fetchVideos(user?._id),
        enabled: !!user,
    });
    
    if (loading || isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-red-100">
            <div className="text-red-600 text-xl font-semibold">Error: {error.message}</div>
        </div>
    );
    
    return (
        <main className="min-h-screen bg-gradient-to-r from-[#3a868f] to-[#71c7d1] py-12 px-4 sm:px-6 lg:px-8">
            <Link
                to='/dashboard'
                className="fixed top-5 left-5 bg-white text-blue-600 py-2 px-4 rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
            >
                ← Volver
            </Link>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Mis Videos</h1>
                    <Link 
                        className="bg-white text-blue-600 hover:bg-blue-100 transition-colors rounded-full py-2 px-6 shadow-lg" 
                        to="/videos/create"
                    >
                        + Crear Videos
                    </Link>
                </div>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data && data.length === 0 && (
                        <p className="col-span-full text-center text-white text-xl">No hay videos disponibles</p>
                    )}
                    {data && data.map(video => (
                        <Link key={video._id} to={`/videos/${video._id}`} className="group">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                                <div className="p-6 flex flex-col justify-between h-full">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h2>
                                        <p className="text-sm text-gray-600">{video.user.name} {video.user.lastname}</p>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <span className="text-blue-600 group-hover:text-blue-800">Ver Video →</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        </main>
    );
}

export default HomeVideos;