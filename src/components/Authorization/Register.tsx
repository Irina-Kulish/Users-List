import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VantaBackground } from "../VantaBackground/VantaBackground";

type FormField = 'email' | 'password' | 'confirmPassword';

interface FocusEvent<T = Element> extends SyntheticEvent<T> {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  dirty: {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  errors: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export const Register: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    dirty: {
      email: false,
      password: false,
      confirmPassword: false,
    },
    errors: {
      email: 'Mail cannot be empty',
      password: 'Password cannot be empty',
      confirmPassword: 'Password cannot be empty',
    },
  });

  const navigate = useNavigate();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/users');
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormState((prev) => ({
      ...prev,
      dirty: { ...prev.dirty, [name]: true },
    }));
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: validateField(name, value),
      },
    }));
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        return value.trim() && !isValidEmail(value) ? 'The email is incorrect' : '';
      case 'password':
        return value.length < 8 ? (value ? 'At least 8 characters' : 'Password cannot be empty') : '';
      case 'confirmPassword':
        return value !== formState.password ? (value ? 'Password doesn\'t match' : 'Password cannot be empty') : '';
      default:
        return '';
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isDisable = !formState.email || !formState.password || !formState.confirmPassword;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <VantaBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className=" bg-white bg-opacity-50 p-10 rounded-xl shadow-xl z-10 relative max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center">
            Sign up
          </h2>
          <form className="space-y-6">
            {['email', 'password', 'confirmPassword'].map((fieldName) => (
              <div 
                key={fieldName}
              >
                <label 
                  htmlFor={fieldName} 
                  className="block text-sm font-medium text-gray-900"
                >
                  {fieldName === 'confirmPassword' 
                    ? 'Confirm Password' 
                    : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                  }
                </label>
                <input
                  onBlur={blurHandler}
                  name={fieldName}
                  value={formState[fieldName as FormField]}
                  onChange={inputHandler}
                  id={fieldName}
                  required
                  type={fieldName === 'password' || fieldName === 'confirmPassword' ? 'password' : 'text'}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder={fieldName === 'confirmPassword' ? 'Repeat your password' : ''}
                />
                {formState.dirty[fieldName as FormField] && formState.errors[fieldName as FormField] && (
                  <div 
                    className="text-red-900 text-sm mt-1"
                  >
                    {formState.errors[fieldName as FormField]}
                  </div>
                )}
              </div>
            ))}
            <select 
              name="role" 
              id="role" 
              required 
              className="border-gray-300 rounded-md shadow-sm p-3 mt-5 block w-full"
            >
              <option 
                defaultValue="0"
              >
                Select a role
              </option>
              <option 
                value="admin"
              >
                Admin
              </option>
              <option 
                value="user"
              >
                User
              </option>
            </select>
            <button
              disabled={isDisable}
              className="mt-5 bg-gray-600 text-white py-3 px-4 rounded-md w-full font-semibold shadow-md hover:bg-gray-700 disabled:bg-gray-400"
              onClick={handleSubmit}
            >
              Sign up
            </button>
            <div className="text-center mt-6">
              <button 
                type="submit" 
                onClick={handleClick} 
                className="font-medium text-sm"
              >
                Already have an account?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
 };
