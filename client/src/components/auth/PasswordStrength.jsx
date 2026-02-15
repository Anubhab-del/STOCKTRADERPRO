import React from 'react';

const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const getStrength = () => {
    if (password.length < 6) return { label: 'Too Short', color: 'danger', width: '25%' };
    if (password.length < 8) return { label: 'Weak', color: 'warning', width: '50%' };
    if (password.length < 12) return { label: 'Good', color: 'success', width: '75%' };
    return { label: 'Strong', color: 'success', width: '100%' };
  };

  const strength = getStrength();

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-neutral-600">Password Strength</span>
        <span className={`text-xs font-medium text-${strength.color}-600`}>
          {strength.label}
        </span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 bg-${strength.color}-500`}
          style={{ width: strength.width }}
        />
      </div>
    </div>
  );
};

export default PasswordStrength;