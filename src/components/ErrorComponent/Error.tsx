import React from "react";

type ErrorComponentProps = {
    error: string | null;
  };
  
  export const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
    if (!error) {
      return null;
    }
  
    return (
      <div className="error-message">
        <p>Oops! Something went wrong.</p>
        <p>{error}</p>
      </div>
    );
  };