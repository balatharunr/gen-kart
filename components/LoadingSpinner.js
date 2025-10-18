"use client";

const LoadingSpinner = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-blue-900 rounded-full animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;