import { useState } from "react";
import React from "react";
import SidebarAlumno from "../layout/SidebarAlumno.jsx";
import { Outlet } from "react-router-dom";
import IAsideBar from "./iaSideBar.jsx";

export default function EstudianteDashboard() {
    const [viewIA,setViewIA] =useState(false);

    return (
        <div className="flex">
            <SidebarAlumno />
            <div className="ml-64 w-full">
            <div
                    className="fixed inset-0 bg-cover bg-center opacity-50"
                    style={{
                        top: "50%",
                        left: "59%",
                        transform: "translate(-50%, -50%)",
                        height: "100%",
                        opacity: 0.6,
                        backgroundImage: "url('/LogoLeopoldoMarechal.png')",
                        backgroundAttachment: "fixed",
                        filter: "blur(4px)"
                    }}
                ></div>
                <div className="relative z-10">
                    <Outlet />
                </div>
            </div>
            <div className="fixed bottom-4 right-4">
                <button 
                className="p-2 bg-blue-500 text-white rounded-full w-[40px]" 
                onClick={() => setViewIA(!viewIA)}
                >IA</button>
            </div>
            {viewIA && <IAsideBar closeSidebar={() => setViewIA(false)}/>}
        </div>
    );
}
