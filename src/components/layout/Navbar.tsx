'use client'

import Link from 'next/link';
import { supabase } from '@/app/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, LogOut, Briefcase } from 'lucide-react';

const Navbar = () => {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            MaltaJobPro
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/jobs" className="text-white hover:text-purple-300 transition-colors font-medium">
            Jobs
          </Link>
          <Link href="/pricing" className="text-white hover:text-purple-300 transition-colors font-medium">
            Pricing
          </Link>
          <Link href="/dashboard/employer" className="text-white hover:text-purple-300 transition-colors font-medium">
            For Employers
          </Link>
          {user && (
            <Link href="/dashboard/seeker" className="text-white hover:text-purple-300 transition-colors font-medium">
              My Applications
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                {user.email}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="flex items-center gap-2 border-2 border-purple-400/50 text-purple-300 bg-white/5 px-6 py-2 rounded-xl font-semibold hover:bg-purple-500/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </motion.button>
            </>
          ) : (
            <>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-purple-400/50 text-purple-300 bg-white/5 px-6 py-2 rounded-xl font-semibold hover:bg-purple-500/20 transition-all"
                >
                  Log In
                </motion.button>
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg shadow-purple-500/50 hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Sign Up
                </motion.button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          {/* Mobile menu button will go here */}
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
