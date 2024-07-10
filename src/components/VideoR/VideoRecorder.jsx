import React from "react";

function VideoRecorder({
    mediaBlobUrl,
    videoRef, 
    startRecording, 
    resumeRecording, 
    pauseRecording, 
    stopRecording,
    status,
}) {
    return (
        <>
             {status === 'stopped' && (
                    <video src={mediaBlobUrl} 
                    className="h-[300px] w-full object-cover"
                    controls 
                    autoPlay>
                    </video>    
                )}
                {(status === 'recording' || status === 'paused') && (
                    <video ref={videoRef}
                        className="h-[300px] w-full object-cover"
                        controls
                        autoPlay
                        muted>
                    </video>
                )}
               
                <div className="flex justify-center items-center">
                    {status === 'idle' && (
                        <button 
                            className="w-full bg-[#3a868f] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
                            type="button" 
                            onClick={startRecording}
                        >
                            Iniciar grabación
                        </button>
                    )}
                    {status === 'stopped' && (
                        <button 
                            className="w-full bg-[#3a868f] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
                            type="button" 
                            onClick={startRecording}
                        >
                            Volver a grabar
                        </button>
                    )}       
                    {status === 'paused' && (
                        <button 
                            type="button"
                            className="w-full bg-blue-600 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4" 
                            onClick={resumeRecording} >
                            Reanudar
                        </button>
                    )}
                    {(status === 'recording' || status === 'paused') &&  (
                        <>
                            <button 
                                type="button"
                                className="w-full bg-yellow-600 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4" 
                                onClick={pauseRecording} >
                                Pausar 
                            </button>
                            <button 
                                type="button"
                                className="w-full bg-red-400 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4" 
                                onClick={stopRecording}>
                                Detener 
                            </button>
                        </>
                    )}
                </div>
               
               
        </>
    )
}

export default VideoRecorder