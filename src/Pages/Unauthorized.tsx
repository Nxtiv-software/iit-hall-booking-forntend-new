import React from 'react'
import { useAuth } from '../AuthProvider/AuthProvider';

const Unauthorized = () => {
    const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-200 to-slate-100 flex items-center justify-center p-8">
            <div className="bg-white rounded-3xl p-12 shadow-2xl w-full max-w-md text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-4xl bg-gradient-to-br from-red-600 to-red-500 rounded-full text-white">
                    🚫
                </div>
                
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                    Access Denied
                </h1>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                    Sorry, you don't have permission to access this page. 
                    Your current role is <span className="font-semibold text-indigo-600 capitalize">{user?.role?.name || 'Unknown'}</span>.
                </p>
                
                <div className="space-y-3">
                    <a 
                        href="/dashboard"
                        className="block w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                        Go to Dashboard
                    </a>
                    
                    <button
                        onClick={logout}
                        className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
  )
}

export default Unauthorized
