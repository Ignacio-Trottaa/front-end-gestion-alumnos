import React, { useState, useEffect } from "react";

export default function Materias() {
    const initialData = [
        { time: "18:00 - 19:00", lunes: "", martes: "", miercoles: "", jueves: "", viernes: "" },
        { time: "19:00 - 20:00", lunes: "", martes: "", miercoles: "", jueves: "", viernes: "" },
        { time: "20:00 - 21:00", lunes: "", martes: "", miercoles: "", jueves: "", viernes: "" },
        { time: "21:00 - 22:00", lunes: "", martes: "", miercoles: "", jueves: "", viernes: "" },
    ];

    const loadSchedulesFromLocalStorage = () => {
        const storedSchedules = localStorage.getItem("schedules");
        if (storedSchedules) {
            return JSON.parse(storedSchedules);
        }
        return {
            "1°Año": initialData,
            "2°Año": initialData,
            "3°Año": initialData,
        };
    };

    const [schedules, setSchedules] = useState(loadSchedulesFromLocalStorage());
    const [selectedYear, setSelectedYear] = useState("1°Año");

    const [formData, setFormData] = useState({
        materia: "",
        profesor: "",
        dia: "lunes",
        horaInicio: "18:00",
        horaFin: "19:00",
    });

    // Guardar horarios en localStorage cada vez que cambien
    useEffect(() => {
        localStorage.setItem("schedules", JSON.stringify(schedules));
    }, [schedules]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateRowspan = (startTime, endTime) => {
        const start = parseInt(startTime.split(":")[0]);
        const end = parseInt(endTime.split(":")[0]);
        return end - start;
    };

    const handleAddMateria = () => {
        const { materia, profesor, dia, horaInicio, horaFin } = formData;
        const updatedSchedule = [...schedules[selectedYear]];
        const startIndex = updatedSchedule.findIndex(row => row.time.startsWith(horaInicio));
        const rowspan = calculateRowspan(horaInicio, horaFin);

        // Verificar si el horario está ocupado
        for (let i = startIndex; i < startIndex + rowspan; i++) {
            if (updatedSchedule[i][dia] !== "") {
                alert("El horario ya está ocupado por otra materia.");
                return;
            }
        }

        // Asignar nueva materia y profesor en el rango de horas
        for (let i = startIndex; i < startIndex + rowspan; i++) {
            if (i === startIndex) {
                updatedSchedule[i][dia] = { materia: `${materia} - ${profesor}`, rowspan };
            } else {
                updatedSchedule[i][dia] = null; // Deja las filas siguientes vacías para el rowspan
            }
        }

        setSchedules({
            ...schedules,
            [selectedYear]: updatedSchedule,
        });
    };

    const handleDeleteMateria = (dia, horaInicio) => {
        const updatedSchedule = [...schedules[selectedYear]];
        const startIndex = updatedSchedule.findIndex(row => row.time.startsWith(horaInicio));
        const materiaToDelete = updatedSchedule[startIndex][dia];

        if (!materiaToDelete || !materiaToDelete.materia) return; // Si no hay materia, no se hace nada

        // Limpiar las celdas ocupadas por la materia
        const rowspan = materiaToDelete.rowspan || 1;
        for (let i = startIndex; i < startIndex + rowspan; i++) {
            updatedSchedule[i][dia] = "";
        }

        setSchedules({
            ...schedules,
            [selectedYear]: updatedSchedule,
        });
    };

    return (
        <div className="justify-center text-center">
            <h1 className="p-2 bg-[#0670B7] text-white">Grilla de horarios por año</h1>

            {/* Formulario de ingreso */}
            <div className="p-4">
                <select
                    name="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border p-2 m-2"
                >
                    <option value="1°Año">1°Año</option>
                    <option value="2°Año">2°Año</option>
                    <option value="3°Año">3°Año</option>
                </select>
                <input
                    type="text"
                    name="materia"
                    value={formData.materia}
                    onChange={handleInputChange}
                    placeholder="Materia"
                    className="border p-2 m-2"
                />
                <input
                    type="text"
                    name="profesor"
                    value={formData.profesor}
                    onChange={handleInputChange}
                    placeholder="Profesor"
                    className="border p-2 m-2"
                />
                <select name="dia" value={formData.dia} onChange={handleInputChange} className="border p-2 m-2">
                    <option value="lunes">Lunes</option>
                    <option value="martes">Martes</option>
                    <option value="miercoles">Miércoles</option>
                    <option value="jueves">Jueves</option>
                    <option value="viernes">Viernes</option>
                </select>
                <select name="horaInicio" value={formData.horaInicio} onChange={handleInputChange} className="border p-2 m-2">
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                </select>
                <select name="horaFin" value={formData.horaFin} onChange={handleInputChange} className="border p-2 m-2">
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                    <option value="22:00">22:00</option>
                </select>
                <button onClick={handleAddMateria} className="p-2 bg-blue-500 text-white m-2">Agregar Materia</button>
            </div>

            {/* Tabla por año */}
            <div className="p-4">
                <h2>{selectedYear}</h2>
                <div className="flex justify-center text-center m-3">
                    <table className="border-black border bg-white w-full">
                        <thead>
                            <tr className="border-black border">
                                <td></td>
                                <td className="border-black border">LUNES</td>
                                <td className="border-black border">MARTES</td>
                                <td className="border-black border">MIERCOLES</td>
                                <td className="border-black border">JUEVES</td>
                                <td className="border-black border">VIERNES</td>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules[selectedYear].map((row, index) => (
                                <tr key={index}>
                                    <td className="border-black border">{row.time}</td>
                                    {["lunes", "martes", "miercoles", "jueves", "viernes"].map((day) => (
                                        row[day] && row[day].materia ? (
                                            <td
                                                key={day}
                                                className="border-black border"
                                                rowSpan={row[day].rowspan}
                                            >
                                                {row[day].materia}
                                                <button
                                                    onClick={() => handleDeleteMateria(day, row.time.split(" - ")[0])}
                                                    className="text-red-500 p-1"
                                                >
                                                    <ion-icon name="trash"></ion-icon>
                                                </button>
                                            </td>
                                        ) : row[day] !== null ? (
                                            <td key={day} className="border-black border"></td>
                                        ) : null
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
