'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../../../components/auth/AuthLayout';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { login } from '../../../lib/auth';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await login(formData);
      
      if (result.success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        if (result.requiresVerification) {
          localStorage.setItem('verificationEmail', formData.email);
          router.push('/auth/verify-email');
        } else {
          setErrors({ general: result.message || 'Login failed' });
        }
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your smart bookmark manager"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General error */}
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"
          >
            <p className="text-red-400 text-sm text-center">{errors.general}</p>
          </motion.div>
        )}

        {/* Form fields */}
        <Input
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<EnvelopeIcon className="w-5 h-5" />}
          disabled={loading}
        />

        <Input
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<LockClosedIcon className="w-5 h-5" />}
          disabled={loading}
        />

        {/* Remember me and forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
                disabled={loading}
              />
              <motion.div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                  rememberMe 
                    ? 'bg-purple-600 border-purple-600' 
                    : 'bg-transparent border-gray-400 hover:border-gray-300'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {rememberMe && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}
              </motion.div>
            </div>
            <span className="text-sm text-gray-300">Remember me</span>
          </label>

          <button
            type="button"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
            onClick={() => router.push('/auth/forgot-password')}
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          loading={loading}
          className="w-full"
        >
          Sign In
        </Button>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-slate-900 text-gray-400">Don't have an account?</span>
          </div>
        </div>

        {/* Signup link */}
        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="w-full"
          onClick={() => router.push('/auth/signup')}
          disabled={loading}
        >
          Create New Account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;