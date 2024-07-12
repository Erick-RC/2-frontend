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
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 border-t-2 border-b-2 border-white"></div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-red-100 px-2 sm:px-4">
            <div className="text-red-600 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center">Error: {error.message}</div>
        </div>
    );
    
    return (
        <main className="min-h-screen bg-gradient-to-r from-[#3a868f] to-[#71c7d1] py-4 sm:py-6 md:py-8 lg:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
            <Link
                to='/dashboard'
                className="fixed top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 lg:top-5 lg:left-5 bg-white text-blue-600 py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 rounded-full shadow-lg hover:bg-blue-100 transition duration-300 text-xs sm:text-sm md:text-base"
            >
                ← Volver
            </Link>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-0">Mis Videos</h1>
                    <Link 
                        className="bg-white text-blue-600 hover:bg-blue-100 transition-colors rounded-full py-1.5 px-3 sm:py-2 sm:px-4 md:px-6 shadow-lg text-xs sm:text-sm md:text-base" 
                        to="/videos/create"
                    >
                        + Crear Videos
                    </Link>
                </div>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    {data && data.length === 0 && (
                        <p className="col-span-full text-center text-white text-base sm:text-lg md:text-xl lg:text-2xl">No hay videos disponibles</p>
                    )}
                    {data && data.map(video => (
                        <Link key={video._id} to={`/videos/${video._id}`} className="group">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                                <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col justify-between h-full">
                                    <div>
                                        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{video.title}</h2>
                                        <p className="text-xs sm:text-sm text-gray-600">{video.user.name} {video.user.lastname}</p>
                                    </div>
                                    <div className="mt-2 sm:mt-3 md:mt-4 flex justify-end">
                                        <span className="text-blue-600 group-hover:text-blue-800 text-xs sm:text-sm md:text-base">Ver Video →</span>
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