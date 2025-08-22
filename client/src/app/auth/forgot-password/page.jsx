'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../../../components/auth/AuthLayout';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { forgotPassword } from '../../../lib/auth';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setLoading(true);
    setError('');

    try {
      const result = await forgotPassword({ email });
      
      if (result.success) {
        setEmailSent(true);
      } else {
        setError(result.message || 'Failed to send reset email');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent you a password reset link"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white">Email Sent!</h3>
            <p className="text-gray-400">
              We've sent a password reset link to <span className="text-white font-medium">{email}</span>
            </p>
            <p className="text-sm text-gray-500">
              The link will expire in 30 minutes for security reasons.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <Button
              size="lg"
              className="w-full"
              onClick={() => window.open('https://gmail.com', '_blank')}
            >
              Open Email App
            </Button>

            <Button
              variant="ghost"
              onClick={() => router.push('/auth/login')}
            >
              Back to Login
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="border-t border-gray-600 pt-6 space-y-4"
          >
            <p className="text-sm text-gray-400">Didn't receive the email?</p>
            <Button
              variant="ghost"
              onClick={() => setEmailSent(false)}
              className="text-purple-400 hover:text-purple-300"
            >
              Try a different email address
            </Button>
          </motion.div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a password reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"
          >
            <p className="text-red-400 text-sm text-center">{error}</p>
          </motion.div>
        )}

        {/* Email input */}
        <Input
          type="email"
          label="Email Address"
          value={email}
          onChange={handleChange}
          error={error && !email.trim() ? error : ''}
          icon={<EnvelopeIcon className="w-5 h-5" />}
          disabled={loading}
          autoFocus
        />

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"
        >
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-blue-400 text-sm font-medium">How it works</p>
              <p className="text-blue-300 text-sm">
                We'll send you a secure link to reset your password. The link expires in 30 minutes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          loading={loading}
          className="w-full"
          disabled={!email.trim()}
        >
          Send Reset Link
        </Button>

        {/* Back to login */}
        <div className="text-center border-t border-gray-600 pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push('/auth/login')}
            disabled={loading}
          >
            ← Back to Login
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;