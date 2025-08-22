const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// API request wrapper with error handling
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for auth
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Auth API functions
export const signup = async (userData) => {
  try {
    const response = await apiRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Signup failed',
    };
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Login failed',
    };
  }
};

export const verifyOTP = async (verificationData) => {
  try {
    const response = await apiRequest('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(verificationData),
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error.message || 'OTP verification failed',
    };
  }
};

export const resendOTP = async (emailData) => {
  try {
    const response = await apiRequest('/api/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify(emailData),
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to resend OTP',
    };
  }
};

export const forgotPassword = async (emailData) => {
  try {
    const response = await apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(emailData),
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to send reset email',
    };
  }
};

export const resetPassword = async (resetData) => {
  try {
    const response = await apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData),
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Password reset failed',
    };
  }
};

export const logout = async () => {
  try {
    const response = await apiRequest('/api/auth/logout', {
      method: 'POST',
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Logout failed',
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiRequest('/api/auth/me');
    return response;
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to get user data',
    };
  }
};

// Auth context helpers
export const checkAuthStatus = async () => {
  try {
    const response = await getCurrentUser();
    return {
      isAuthenticated: response.success,
      user: response.success ? response.data.user : null,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }
};

// Token refresh handler (automatically handled by cookies)
export const refreshAuthToken = async () => {
  // Token refresh is handled automatically by the backend
  // when using HttpOnly cookies, so this is mainly for
  // triggering auth status checks
  return await checkAuthStatus();
};