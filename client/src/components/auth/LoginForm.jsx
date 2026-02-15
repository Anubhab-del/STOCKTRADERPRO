import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import { validateEmail } from '../../utils/validators';
import Input from '../common/Input';
import Button from '../common/Button';
import { FaEnvelope, FaLock } from 'react-icons/fa';

/**
 * Login Form Component
 */

const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { email, password } = formData;
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    
    // Dispatch login action
    const result = await dispatch(login({ email, password }));
    
    setLoading(false);
    
    if (result.success) {
      onSuccess?.(result.message);
      navigate('/dashboard');
    } else {
      setErrors({ general: result.message });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg">
          {errors.general}
        </div>
      )}
      
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="your@email.com"
        error={errors.email}
        required
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter your password"
        error={errors.password}
        required
      />
      
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
          <span className="ml-2 text-sm text-neutral-700">Remember me</span>
        </label>
        
        <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
          Forgot password?
        </Link>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      
      <p className="text-center text-sm text-neutral-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;