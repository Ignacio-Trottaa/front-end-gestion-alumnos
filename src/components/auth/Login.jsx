import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-600 p-4">
        <h1 className="text-4xl text-white text-center">Campus Virtual</h1>
      </div>
      <div className="flex flex-1 justify-center items-center p-4">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Campus Login</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Usuario</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="usuario123"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            <img src="https://via.placeholder.com/600x800" alt="Campus" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
