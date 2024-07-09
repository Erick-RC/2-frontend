import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "../../api/fetchVideos";
import { Link } from "react-router-dom";

function HomeVideos() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['videos'],
        queryFn: fetchVideos,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-7xl mx-auto p-10 bg-white rounded-lg shadow-lg">
                <div className="flex justify-end mb-6">
                    <Link className="bg-[#3a868f] hover:bg-[#327377] transition-colors rounded-md p-3 text-white shadow-md" to="/videos/create">New Video</Link>
                </div>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {data && data.map(video => (
                        <Link key={video._id} to={`/videos/${video._id}`} className="group">
                            <div className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col justify-between bg-[#e0f4f5] group-hover:bg-[#ccebe6]">
                                <div>
                                    <p className="text-xl font-semibold text-gray-800">{video.title}</p>
                                    <p className="text-sm text-gray-600">{video.user.name} {video.user.lastname}</p>
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
