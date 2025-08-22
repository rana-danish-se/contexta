'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import AuthLayout from '../../../components/auth/AuthLayout';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { signup } from '../../../lib/auth';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        'Password must contain uppercase, lowercase, and number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const result = await signup(formData);
      if (result.success) {
        localStorage.setItem('verificationEmail', formData.email);
        router.push('/auth/verify-email');
      } else {
        setErrors({ general: result.message || 'Signup failed' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Contexta to organize your bookmarks smarter"
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
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={<UserIcon className="w-5 h-5" />}
          disabled={loading}
        />

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
                formData.password.length >= 6,
                /[A-Z]/.test(formData.password),
                /[a-z]/.test(formData.password),
                /\d/.test(formData.password),
              ].map((valid, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                    valid ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          loading={loading}
          className="w-full cursor-pointer"
        >
          {loading ? 'Processing ....' : 'Create Account'}
        </Button>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-slate-900 text-gray-400">
              Already have an account?
            </span>
          </div>
        </div>

        {/* Login link */}
        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="w-full cursor-pointer"
          onClick={() => router.push('/auth/login')}
          disabled={loading}
        >
          Sign In Instead
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
