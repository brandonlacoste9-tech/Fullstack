// Shared UI Components for Design System

const React = require('react');

// Button Component
const Button = ({ children, variant = 'primary', onClick, disabled = false }) => {
  const styles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  return React.createElement('button', {
    className: `px-4 py-2 rounded-lg font-medium ${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    onClick,
    disabled
  }, children);
};

// Card Component
const Card = ({ children, title, className = '' }) => {
  return React.createElement('div', {
    className: `bg-white rounded-lg shadow-lg p-6 ${className}`
  }, [
    title && React.createElement('h3', { 
      key: 'title',
      className: 'text-xl font-bold mb-4' 
    }, title),
    children
  ]);
};

// Input Component
const Input = ({ label, type = 'text', placeholder, value, onChange, error }) => {
  return React.createElement('div', { className: 'mb-4' }, [
    label && React.createElement('label', {
      key: 'label',
      className: 'block text-sm font-medium text-gray-700 mb-2'
    }, label),
    React.createElement('input', {
      key: 'input',
      type,
      placeholder,
      value,
      onChange,
      className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`
    }),
    error && React.createElement('p', {
      key: 'error',
      className: 'text-red-500 text-sm mt-1'
    }, error)
  ]);
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return React.createElement('div', {
    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    onClick: onClose
  }, 
    React.createElement('div', {
      className: 'bg-white rounded-lg p-6 max-w-md w-full',
      onClick: (e) => e.stopPropagation()
    }, [
      React.createElement('h2', {
        key: 'title',
        className: 'text-2xl font-bold mb-4'
      }, title),
      React.createElement('div', { key: 'content' }, children),
      React.createElement('button', {
        key: 'close',
        onClick: onClose,
        className: 'mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'
      }, 'Close')
    ])
  );
};

// Navigation Component
const Navigation = ({ links = [], currentPath = '/' }) => {
  return React.createElement('nav', {
    className: 'bg-white shadow-md'
  },
    React.createElement('div', {
      className: 'container mx-auto px-4 py-4 flex justify-between items-center'
    }, [
      React.createElement('div', {
        key: 'logo',
        className: 'text-2xl font-bold text-blue-600'
      }, 'FullStack Studio'),
      React.createElement('div', {
        key: 'links',
        className: 'flex gap-6'
      }, links.map((link, i) => 
        React.createElement('a', {
          key: i,
          href: link.href,
          className: `text-gray-700 hover:text-blue-600 ${currentPath === link.href ? 'text-blue-600 font-semibold' : ''}`
        }, link.label)
      ))
    ])
  );
};

// Stat Card for Analytics
const StatCard = ({ title, value, change, icon }) => {
  return React.createElement('div', {
    className: 'bg-white rounded-lg shadow-lg p-6'
  }, [
    React.createElement('div', {
      key: 'header',
      className: 'flex justify-between items-start mb-4'
    }, [
      React.createElement('div', { key: 'title' }, [
        React.createElement('p', {
          key: 'label',
          className: 'text-gray-600 text-sm'
        }, title),
        React.createElement('p', {
          key: 'value',
          className: 'text-3xl font-bold mt-2'
        }, value)
      ]),
      icon && React.createElement('div', {
        key: 'icon',
        className: 'text-blue-600 text-2xl'
      }, icon)
    ]),
    change && React.createElement('p', {
      key: 'change',
      className: `text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`
    }, `${change} from last month`)
  ]);
};

module.exports = {
  Button,
  Card,
  Input,
  Modal,
  Navigation,
  StatCard
};
