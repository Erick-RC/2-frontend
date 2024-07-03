import React from 'react';
import { Navbar } from '../components/Dashboard/Navbar';
import { AsideOptions } from '../components/Dashboard/AsideOptions';
import { NewTestBtn } from '../components/Dashboard/NewTestBtn';

const Dashboard = () => {
    return (
        <>
            {/* Page inspiration https://flowbite.com/docs/components/sidebar/ */}
            {/* Navbar */}
            <Navbar/>
            {/* Aside */}
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-gradient-to-b from-custom-MainSky to-emerald-100 flex flex-col">
                    <AsideOptions/>
                    <NewTestBtn/>
                    <img className="h-auto mt-4 rounded-lg shadow-xl border-4 border-teal-800" src="./asideImage.PNG" alt="Test image" />
                </div>
            </aside>
            
            {/* Container */}
            
            <div className="p-4  sm:ml-64">
                {/* Contenido principal aquí */}
            </div>
        </>
    )
}

export default Dashboard;
