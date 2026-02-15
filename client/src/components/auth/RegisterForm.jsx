import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions/authActions';
import Input from '../common/Input';
import Button from '../common/Button';
import { showToast } from '../../utils/toast';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    panNumber: ''
  });

  const { name, email, password, mobile, panNumber } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password) {
      showToast('Please fill in name, email and password', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);

    const result = await dispatch(register(formData));

    setLoading(false);

    if (result.success) {
      showToast(result.message || 'Registration successful! Welcome!', 'success');
      navigate('/dashboard');
    } else {
      showToast(result.message || 'Registration failed. Please try again.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="John Doe"
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="john@example.com"
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Minimum 6 characters"
        required
      />

      <Input
        label="Mobile Number (Optional)"
        type="tel"
        name="mobile"
        value={mobile}
        onChange={handleChange}
        placeholder="1234567890"
      />

      <Input
        label="PAN Number (Optional)"
        type="text"
        name="panNumber"
        value={panNumber}
        onChange={handleChange}
        placeholder="ABCDE1234F"
      />

      <div className="bg-success-50 border border-success-200 rounded-lg p-4">
        <p className="text-sm text-success-800">
          🎉 You'll start with ₹1,00,000 virtual cash to trade!
        </p>
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <p className="text-sm text-neutral-600 text-center">
        Already have an account?{' '}
        <a href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Login here
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;