
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchVideos } from "../../api/fetchVideos";


function HomeVideos () {
const query = useQuery({queryKey:['videos'], queryFn: fetchVideos})

console.log(query);


return(
    <div className="text-center text-3xl text-cyan-600" >HomeVideos</div>
)
}

export default HomeVideos