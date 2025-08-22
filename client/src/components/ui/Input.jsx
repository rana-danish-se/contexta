'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Input = ({ 
  label, 
  error, 
  icon, 
  type = 'text', 
  className = '', 
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="relative mb-6">
      <div className="relative">
        {/* Input field */}
        <input
          type={inputType}
          className={`
            w-full px-4 py-3 pl-12 pr-12 
            bg-white/5 backdrop-blur-sm
            border border-white/10 rounded-xl
            text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
            transition-all duration-300
            hover:bg-white/10
            ${error ? 'border-red-500/50 focus:ring-red-500/50' : ''}
            ${className}
          `}
          placeholder={label}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Left icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Focus ring animation */}
        {isFocused && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-0 rounded-xl border-2 border-purple-500/30 pointer-events-none"
          />
        )}
      </div>

      {/* Floating label */}
      <motion.label
        className={`
          absolute left-12 pointer-events-none transition-all duration-300
          ${isFocused || props.value 
            ? 'top-0 text-xs text-purple-400 bg-slate-900 px-2 -translate-y-1/2' 
            : 'top-1/2 text-gray-400 -translate-y-1/2'
          }
        `}
      >
        {label}
      </motion.label>
    </div>
  );
};

export default Input;
