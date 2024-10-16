import {useState} from 'react';
import React from "react";
import SidebarAdmin from '../layout/SidebarAdmin.jsx';
import { Outlet } from "react-router-dom";
import IAsideBar from "./iaSideBar.jsx";

export default function AdminDashboard() {
    const [viewIA,setViewIA] =useState(false);

    return (
        <div className="flex">
            <SidebarAdmin />
                <div className="ml-64 w-full">
                <Outlet />
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