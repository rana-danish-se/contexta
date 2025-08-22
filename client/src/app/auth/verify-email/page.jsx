'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../../../components/auth/AuthLayout';
import Button from '../../../components/ui/Button';
import { verifyOTP, resendOTP } from '../../../lib/auth';

const VerifyEmailPage = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);
  const router = useRouter();

  useEffect(() => {
    const verificationEmail = localStorage.getItem('verificationEmail');
    if (!verificationEmail) {
      router.push('/auth/signup');
      return;
    }
    setEmail(verificationEmail);
    inputRefs.current[0]?.focus();
  }, [router]);

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Clear error when user starts typing
    if (error) setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOTP.every(digit => digit !== '') && newOTP.join('').length === 6) {
      handleVerifyOTP(newOTP.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Handle paste
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOTP = pasteData.split('').concat(['', '', '', '', '', '']).slice(0, 6);
    setOTP(newOTP);
    
    // Focus last filled input or submit if complete
    const lastIndex = Math.min(pasteData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();

    if (pasteData.length === 6) {
      handleVerifyOTP(pasteData);
    }
  };

  const handleVerifyOTP = async (otpCode = null) => {
    const otpToVerify = otpCode || otp.join('');
    
    if (otpToVerify.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await verifyOTP({ email, otp: otpToVerify });
      
      if (result.success) {
        // Clear stored email
        localStorage.removeItem('verificationEmail');
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError(result.message || 'Invalid OTP. Please try again.');
        // Clear OTP inputs
        setOTP(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setError(error.message||'Network error. Please try again.');
      setOTP(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setResendLoading(true);
    setError('');

    try {
      const result = await resendOTP({ email });
      
      if (result.success) {
        // Start cooldown
        setResendCooldown(120);
        const timer = setInterval(() => {
          setResendCooldown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(result.message || 'Failed to resend OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle={`We've sent a 6-digit code to ${email}`}
    >
      <div className="space-y-8">
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

        {/* OTP Input */}
        <div className="space-y-4">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`
                  w-12 h-14 text-center text-xl font-bold
                  bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl
                  text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                  transition-all duration-300 hover:bg-white/10
                  ${error ? 'border-red-500/50' : ''}
                  ${digit ? 'border-purple-500/30 bg-purple-500/10' : ''}
                `}
                disabled={loading}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>

          <p className="text-center text-sm text-gray-400">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* Verify button */}
        <Button
          onClick={() => handleVerifyOTP()}
          size="lg"
          loading={loading}
          className="w-full"
          disabled={otp.join('').length !== 6}
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </Button>

        {/* Resend section */}
        <div className="text-center space-y-4">
          <p className="text-gray-400 text-sm">
            Didn't receive the code?
          </p>
          
          <Button
            variant="ghost"
            onClick={handleResendOTP}
            loading={resendLoading}
            disabled={resendCooldown > 0}
          >
            {resendCooldown > 0 
              ? `Resend in ${resendCooldown}s`
              : resendLoading 
                ? 'Sending...' 
                : 'Resend Code'
            }
          </Button>
        </div>

        {/* Success animation (when verified) */}
        {loading && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex justify-center"
          >
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </motion.div>
        )}

        {/* Change email */}
        <div className="text-center border-t border-gray-600 pt-6">
          <button
            type="button"
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
            onClick={() => {
              localStorage.removeItem('verificationEmail');
              router.push('/auth/signup');
            }}
            disabled={loading}
          >
            Wrong email? Change it
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;