'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '@/app/lib/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        // Successful login
        router.push('/jobs');
        router.refresh(); // Refresh session/cookie state
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Log In to MaltaJobPro
          </h1>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-slate-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-slate-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <p className="text-center text-slate-400 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-secondary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
