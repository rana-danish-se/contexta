'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { checkAuthStatus, logout as logoutAPI } from '../lib/auth';

// Auth context
const AuthContext = createContext();

// Auth actions
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null,
      };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
        
        const { isAuthenticated, user } = await checkAuthStatus();
        
        if (isAuthenticated && user) {
          dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user });
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_USER, payload: null });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Failed to check authentication status' });
      }
    };

    checkAuth();
  }, []);

  // Login function (called after successful API login)
  const login = (userData) => {
    dispatch({ type: AUTH_ACTIONS.SET_USER, payload: userData });
  };

  // Logout function
  const logout = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      
      const result = await logoutAPI();
      
      if (result.success) {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
        // Clear any stored data
        localStorage.removeItem('verificationEmail');
        // Redirect to login page
        window.location.href = '/auth/login';
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: result.message || 'Logout failed' });
      }
    } catch (error) {
      console.error('Logout failed:', error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Network error during logout' });
    }
  };

  // Update user data
  const updateUser = (userData) => {
    dispatch({ type: AUTH_ACTIONS.SET_USER, payload: { ...state.user, ...userData } });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Refresh auth status (useful for token refresh scenarios)
  const refreshAuth = async () => {
    try {
      const { isAuthenticated, user } = await checkAuthStatus();
      
      if (isAuthenticated && user) {
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user });
        return true;
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: null });
        return false;
      }
    } catch (error) {
      console.error('Auth refresh failed:', error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Failed to refresh authentication' });
      return false;
    }
  };

  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    
    // Actions
    login,
    logout,
    updateUser,
    clearError,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// HOC for protected routes
export const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
      return null;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// Hook for route protection
export const useRequireAuth = (redirectTo = '/auth/login') => {
  const { isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, loading, redirectTo]);
  
  return { isAuthenticated, loading };
};