import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-600 p-4">
        <h1 className="text-4xl text-white text-center">Campus Leopoldo Marechal</h1>
      </div>
      <div className="flex flex-1 justify-center items-center p-4">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full h-3/4">
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Inicia Sesión</h2>
            
            <form className="space-y-6" onSubmit="">
              <div>
                <label className="block text-sm font-medium text-gray-700">Usuario</label>
                <input  
                type="text" 
                name="usuario"
                id="usuario"
                autoComplete="off"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-600 focus:outline-none"
                placeholder="Usuario"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete='off'
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-600 focus:outline-none"
                  placeholder="********"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Olvidaste tu contraseña?</a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
          <div className="md:w-1/2 hidden md:block">
            <img src="Leopoldo.jpeg" alt="Campus" className="h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
