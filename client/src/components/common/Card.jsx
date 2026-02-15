import React from 'react';

/**
 * Reusable Card Component
 */

const Card = ({ 
  children, 
  className = '', 
  onClick,
  hoverable = false 
}) => {
  return (
    <div
      onClick={onClick}
      className={`card ${hoverable ? 'hover:shadow-lg cursor-pointer transition-shadow' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;