'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUp } from '@/app/lib/auth';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seeker');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signUp(email, password, {
        full_name: name,
        role: role,
      });
      
      if (error) {
        setError(error.message);
      } else {
        alert('Registration successful! Please check your email for a verification link.');
        router.push('/login');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Create Your Account
          </h1>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-slate-300 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-slate-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-slate-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <div className="mb-6">
                <label className="block text-slate-300 mb-2">I am a...</label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input type="radio" name="role" value="seeker" checked={role === 'seeker'} onChange={() => setRole('seeker')} className="form-radio text-secondary bg-slate-700"/>
                        <span className="ml-2 text-white">Job Seeker</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="role" value="employer" checked={role === 'employer'} onChange={() => setRole('employer')} className="form-radio text-secondary bg-slate-700"/>
                        <span className="ml-2 text-white">Employer</span>
                    </label>
                </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center text-slate-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-secondary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
