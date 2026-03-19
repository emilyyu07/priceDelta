import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className, helperText, ...props }) => {
  const inputClasses =
    "w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent font-sleek transition-all duration-300 " +
    (className ?? "");

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium font-chic text-primary-700 mb-2">
          {label}
        </label>
      )}
      <input id={id} className={inputClasses.trim()} {...props} />
      {helperText && (
        <p className="mt-1.5 text-xs text-primary-500 font-sleek">
          {helperText}
        </p>
      )}
    </div>
  );
};
