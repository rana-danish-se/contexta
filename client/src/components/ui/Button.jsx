'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  loading = false, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold rounded-xl 
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
      text-white shadow-lg hover:shadow-xl focus:ring-purple-500
    `,
    secondary: `
      bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
      text-white backdrop-blur-sm focus:ring-purple-500
    `,
    ghost: `
      bg-transparent hover:bg-white/5 text-gray-400 hover:text-white
      focus:ring-purple-500
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm h-10',
    md: 'px-6 py-3 text-base h-12',
    lg: 'px-8 py-4 text-lg h-14',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* Background shimmer effect */}
      <div className="absolute inset-0 -top-10 -left-10 w-10 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-12 transition-transform duration-700 hover:translate-x-full" />
      
      {/* Loading spinner */}
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
        />
      )}
      
      {/* Button content */}
      <span className="relative z-10">
        {loading ? 'Loading...' : children}
      </span>
    </motion.button>
  );
};

export default Button;