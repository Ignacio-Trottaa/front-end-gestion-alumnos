import React, { useState } from "react";
import axios from 'axios';

export default function IAsideBar({ closeSidebar }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    // Función para hacer la consulta a la API
    async function query(data) {
        try {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407',
                data,
                {
                    headers: {
                        Authorization: 'Bearer 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',
                        'Content-Type': 'application/json',
                        'x-wait-for-model': 'true',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    // Manejador del botón "Enviar"
    const handleSend = () => {
        if (inputValue.trim()) {
            const newMessage = { question: inputValue, response: 'Esperando respuesta...' };
            setMessages([...messages, newMessage]);

            // Llamada a la API
            query({ inputs: inputValue }).then((response) => {
                const generatedText = response[0]?.generated_text || 'Sin respuesta'; // Extraemos el texto generado
                const updatedMessages = [...messages, { question: inputValue, response: generatedText }]; // Usamos solo el texto
                setMessages(updatedMessages); // Actualizamos el estado con la respuesta
                setInputValue(""); // Limpiar el input después de enviar
            }).catch((error) => {
                console.error('Error durante la consulta:', error);
            });
        }
    };

    return (
        <div className="w-72 h-full bg-[#0670B7] text-[#ecf0f1] fixed top-0 right-0 flex flex-col shadow-[2px_0_5px_rgba(0, 0, 0, 0.1)] z-20">
            <div className="flex-grow overflow-y-auto">
                <div className="flex p-3">
                    <h2>ChatBOT</h2>
                    <button onClick={closeSidebar} className="text-white bg-red-500 p-1 rounded ml-auto">
                        <i><ion-icon name="close"></ion-icon></i>
                    </button>
                </div>
                <div className="mt-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <div className="bg-[#005c99] p-2 rounded mb-1 mx-5">
                                <strong>Pregunta:</strong> {msg.question}
                            </div>
                            <div className="bg-[#004a7c] p-2 rounded mx-5">
                                <strong>Respuesta:</strong> {msg.response}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-2 mt-auto mx-5">
                <textarea
                    name="pregunta"
                    id="pregunta"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Habla con ChatBot"
                    autoComplete="off"
                    className="p-2 w-full rounded text-black outline-none border-2 border-blue-200 focus:border-blue-600 resize-none"
                />
                <button onClick={handleSend} className="bg-white text-black p-2 rounded m-5">
                    <i><ion-icon name="send"></ion-icon></i>
                </button>
            </div>
        </div>
    );
}
