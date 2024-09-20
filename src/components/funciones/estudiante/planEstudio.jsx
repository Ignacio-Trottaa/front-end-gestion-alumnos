import { useState } from "react";
import React from "react";

export default function PlanEstudio() {
  return (
    <div className="p-5">
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5">
          <a href="/PROGRAMA_TEC_SUP_EN_DESARROLLO_DE_SOFTWARE.pdf"
            download="PROGRAMA TEC.SUP.EN DESARROLLO DE SOFTWARE.pdf">
            Descargar plan de estudio
          </a>
        </button>
      </div>
      <table className="w-full border border-black">
        <thead>
          <tr className="text-center font-bold border border-black bg-blue-400">
            <th colSpan={8}>1° AÑO</th>
          </tr>
          <tr>
            <th className="border px-2 py-1 border-black bg-white">Campo General</th>
            <th colSpan={2} className="border px-2 py-1 border-black bg-white">Campo Técnico Específico</th>
            <th colSpan={4} className="border px-2 py-1 border-black bg-white">Campo del fundamento</th>
            <th className="border px-2 py-1 border-black bg-white">Campo de la Práctica</th>
          </tr>
        </thead>
        <tbody className="border-black  bg-white">
          <tr>
            <td className="border px-2 py-1 text-center border-black">Análisis Matemático</td>
            <td className="border px-2 py-1 text-center border-black">Administración y gestión de base de datos</td>
            <td className="border px-2 py-1 text-center border-black">Introducción a la programación</td>
            <td className="border px-2 py-1 text-center border-black">Introducción a las redes de datos</td>
            <td className="border px-2 py-1 text-center border-black">Sistemas Digitales</td>
            <td className='border px-2 py-1 text-center border-black'>Sistemas Operativos</td>
            <td className='border px-2 py-1 text-center border-black'>Laboratorio de Hardware</td>
            <td className='border px-2 py-1 text-center border-black'>Prácticas Profesionalizantes I</td>
          </tr>
          <tr>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">96 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">96 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
          </tr>
        </tbody>
        <tfoot className=' bg-white'>
          <tr>
            <td colSpan={8} className="border px-2 py-1 text-center font-bold border-black">TOTAL HORAS: 576 HS.</td>
          </tr>
        </tfoot>
      </table>

      <table className="w-full border border-black mt-2">
        <thead>
          <tr className="text-center font-bold border border-black bg-blue-400">
            <th colSpan={8}>2° AÑO</th>
          </tr>
          <tr>
            <th colSpan={3} className="border px-2 py-1 border-black bg-white">Campo General</th>
            <th colSpan={3} className="border px-2 py-1 border-black bg-white">Campo Técnico Específico</th>
            <th className="border px-2 py-1 border-black bg-white">Campo del fundamento</th>
            <th className="border px-2 py-1 border-black bg-white">Campo de la Práctica</th>
          </tr>
        </thead>
        <tbody className="border-black  bg-white">
          <tr>
            <td className="border px-2 py-1 text-center border-black">Inglés I  </td>
            <td className="border px-2 py-1 text-center border-black">Desarrollo de aplicativos móviles</td>
            <td className="border px-2 py-1 text-center border-black">Algebra y lógica</td>
            <td className="border px-2 py-1 text-center border-black">Programación</td>
            <td className="border px-2 py-1 text-center border-black">Diseño Web</td>
            <td className='border px-2 py-1 text-center border-black'>Estadística y Probabilidades</td>
            <td className='border px-2 py-1 text-center border-black'>Desarrollo de sistemas Orientado a Objetos</td>
            <td className='border px-2 py-1 text-center border-black'>Prácticas Profesionalizantes II</td>
          </tr>
          <tr>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">96 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">96 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">128 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">96 Hs.</td>
          </tr>
        </tbody>
        <tfoot className=' bg-white'>
          <tr>
            <td colSpan={8} className="border px-2 py-1 text-center font-bold border-black">TOTAL HORAS: 672 HS.</td>
          </tr>
        </tfoot>
      </table>

      <table className="w-full border border-black mt-2">
        <thead>
          <tr className="text-center font-bold border border-black bg-blue-400">
            <th colSpan={8}>3° AÑO</th>
          </tr>
          <tr>
            <th colSpan={2} className="border px-2 py-1 border-black bg-white">Campo General</th>
            <th colSpan={3} className="border px-2 py-1 border-black bg-white">Campo Técnico Específico</th>
            <th className="border px-2 py-1 border-black bg-white">Campo de la Práctica</th>
          </tr>
        </thead>
        <tbody className="border-black  bg-white">
          <tr>
            <td className="border px-2 py-1 text-center border-black">Inglés II</td>
            <td className="border px-2 py-1 text-center border-black">Gestión de Proyectos</td>
            <td className="border px-2 py-1 text-center border-black">Desarrollo de sistemas Web</td>
            <td className="border px-2 py-1 text-center border-black">Ingeniería de Software</td>
            <td className="border px-2 py-1 text-center border-black">Metodología de pruebas de sistemas</td>
            <td className='border px-2 py-1 text-center border-black'>Prácticas Profesionalizantes III</td>
          </tr>
          <tr>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">128 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">128 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">64 Hs.</td>
            <td className="border px-2 py-1 text-center border-black">128 Hs.</td>
          </tr>
        </tbody>
        <tfoot className=' bg-white'>
          <tr>
            <td colSpan={8} className="border px-2 py-1 text-center font-bold border-black">TOTAL HORAS: 576 HS.</td>
          </tr>
          <tr>
            <td colSpan={8} className="border px-2 py-1 text-center font-bold border-black">TOTAL HORAS DEL PLAN: 1824 HS.</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}