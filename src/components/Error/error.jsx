import React , {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewError(){
    const navigate = useNavigate();
    const location = useLocation();
    const {codigo,error,mensaje} = location.state || {};
    console.log(error)
    console.log(mensaje)
    async function backToPage(){
        if(window.history.length>1){
            navigate(-1)
        }else{
            navigate("/")
        }
    }

    return(
        <div className="w-full h-full fixed">
            <section className="w-full h-full bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-white">{codigo}</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{error}</p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{mensaje}</p>
                        <button onClick={backToPage} className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Volver a página anterior</button>
                    </div>   
                </div>
            </section>
        </div>
    )
}