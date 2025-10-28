// src/components/auth/LoginModal.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/data/mock-users';
import { UserRole } from '@/types/user.types';
import Image from 'next/image';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [highlightEmail, setHighlightEmail] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Check credentials
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) {
      setError('Invalid credentials. Please check your email and password.');
      return;
    }

    // Success: redirect based on role
    setError('');
    onClose();
    switch (user.role) {
      case 'Supervisor':
        router.push('/dashboard');
        break;
      case 'Manager':
        router.push('/manager-dashboard');
        break;
      case 'Client':
        router.push('/client-dashboard');
        break;
    }
  };


  const handleQuickLogin = (role: UserRole) => {
    setError('Please enter username and password'); // show the error message
    setHighlightEmail(true); // turn on highlight
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-8 m-4 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <Image src="/cdl-logo.png" alt="Colombo Dockyard PLC Logo" width={200} height={50} className="mx-auto" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Log in to access your dashboard.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setHighlightEmail(false); // remove highlight when user types
              }}
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-gray-800 ${highlightEmail ? 'border-blue-500 ring-blue-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
            />

          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-2.135-2.135A6.978 6.978 0 0115 12a6.97 6.97 0 01-1.265 3.879"} />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2.5 rounded-md font-semibold hover:bg-blue-900 transition-colors duration-300"
          >
            LOG IN
          </button>
          {error && <p className="text-red-500 text-xs text-center pt-1">{error}</p>}
        </form>

        <div className="mt-6">
          <p className="text-center text-xs font-medium text-gray-400 uppercase">Accessible Users</p>
          <div className="flex justify-center space-x-2 mt-2">
            <button onClick={() => handleQuickLogin('Supervisor')} className="text-xs text-blue-700 hover:underline">Supervisor</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => handleQuickLogin('Manager')} className="text-xs text-blue-700 hover:underline">Manager</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => handleQuickLogin('Client')} className="text-xs text-blue-700 hover:underline">Client</button>
          </div>
        </div>

      </div>
    </div>
  );
}
