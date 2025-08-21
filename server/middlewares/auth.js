import { 
  verifyAccessToken, 
  verifyRefreshToken, 
  generateTokens, 
  setTokenCookies 
} from '../utils/jwt.js';

import User from '../models/User.js';
// Protect routes middleware
const protect = async (req, res, next) => {
  try {
    let accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      const decoded = verifyAccessToken(accessToken);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. User not found.'
        });
      }

      if (!user.isVerified) {
        return res.status(401).json({
          success: false,
          message: 'Please verify your email to access this resource.'
        });
      }

      req.user = user;
      next();

    } catch (accessError) {
      // Access token expired, try to refresh
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Please login again.'
        });
      }

      try {
        const refreshDecoded = verifyRefreshToken(refreshToken);
        const user = await User.findById(refreshDecoded.id).select('+refreshToken');

        if (!user || user.refreshToken !== refreshToken) {
          return res.status(401).json({
            success: false,
            message: 'Invalid refresh token. Please login again.'
          });
        }

        if (!user.isVerified) {
          return res.status(401).json({
            success: false,
            message: 'Please verify your email to access this resource.'
          });
        }

        // Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user);
        
        // Update refresh token in database
        user.refreshToken = newRefreshToken;
        await user.save();

        // Set new cookies
        setTokenCookies(res, newAccessToken, newRefreshToken);

        req.user = user;
        next();

      } catch (refreshError) {
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token. Please login again.'
        });
      }
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// Optional authentication (for public routes that can be enhanced with user data)
const optionalAuth = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (accessToken) {
      try {
        const decoded = verifyAccessToken(accessToken);
        const user = await User.findById(decoded.id);

        if (user && user.isVerified) {
          req.user = user;
        }
      } catch (error) {
        // Ignore token errors for optional auth
      }
    }

    next();
  } catch (error) {
    next(); // Continue without authentication
  }
};

// Check if user is verified
const requireVerification = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Please verify your email to access this resource.'
    });
  }
  next();
};

export {
  protect,
  optionalAuth,
  requireVerification
};