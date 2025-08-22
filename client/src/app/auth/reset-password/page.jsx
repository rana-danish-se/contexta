'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../../../components/auth/AuthLayout';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { resetPassword } from '../../../lib/auth';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      router.push('/auth/forgot-password');
      return;
    }
    setToken(tokenFromUrl);
  }, [searchParams, router]);

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

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await resetPassword({
        token,
        newPassword: formData.password
      });
      
      if (result.success) {
        setResetSuccess(true);
      } else {
        setErrors({ general: result.message || 'Password reset failed' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (resetSuccess) {
    return (
      <AuthLayout
        title="Password Reset Complete"
        subtitle="Your password has been successfully updated"
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
            <h3 className="text-xl font-semibold text-white">All Set!</h3>
            <p className="text-gray-400">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              className="w-full"
              onClick={() => router.push('/auth/login')}
            >
              Sign In Now
            </Button>
          </motion.div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your new password below"
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

        {/* New password input */}
        <Input
          name="password"
          type="password"
          label="New Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<LockClosedIcon className="w-5 h-5" />}
          disabled={loading}
          autoFocus
        />

        {/* Confirm password input */}
        <Input
          name="confirmPassword"
          type="password"
          label="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<LockClosedIcon className="w-5 h-5" />}
          disabled={loading}
        />

        {/* Password strength indicator */}
        {formData.password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            <div className="text-xs text-gray-400">Password strength:</div>
            <div className="flex space-x-1">
              {[
                { test: formData.password.length >= 6, label: '6+ characters' },
                { test: /[A-Z]/.test(formData.password), label: 'Uppercase' },
                { test: /[a-z]/.test(formData.password), label: 'Lowercase' },
                { test: /\d/.test(formData.password), label: 'Number' },
              ].map((requirement, index) => (
                <div key={index} className="flex-1">
                  <div
                    className={`h-2 rounded-full transition-colors duration-300 ${
                      requirement.test ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  />
                  <div className={`text-xs mt-1 transition-colors duration-300 ${
                    requirement.test ? 'text-green-400' : 'text-gray-500'
                  }`}>
                    {requirement.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Password match indicator */}
        {formData.confirmPassword && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center space-x-2 text-sm ${
              formData.password === formData.confirmPassword
                ? 'text-green-400'
                : 'text-red-400'
            }`}
          >
            {formData.password === formData.confirmPassword ? (
              <>
                <CheckCircleIcon className="w-4 h-4" />
                <span>Passwords match</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Passwords don't match</span>
              </>
            )}
          </motion.div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          loading={loading}
          className="w-full"
          disabled={!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
        >
          Reset Password
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

export default ResetPasswordPage;