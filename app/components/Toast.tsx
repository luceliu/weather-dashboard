"use client";

import { useEffect, useRef } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  type?: "error" | "warning" | "info" | "success";
}

const Toast = ({
  message,
  isVisible,
  onClose,
  duration = 10000,
  type = "error",
}: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);

  // Focus management
  useEffect(() => {
    if (isVisible && toastRef.current) {
      // Save the previously focused element
      const previouslyFocused = document.activeElement as HTMLElement;

      // Focus the toast
      toastRef.current.focus();

      return () => {
        // Return focus to the previously focused element when the toast disappears
        if (previouslyFocused) {
          previouslyFocused.focus();
        }
      };
    }
  }, [isVisible]);

  // Auto-dismiss timer
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  // Determine the color based on the type
  const bgColor = {
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
    success: "bg-green-500",
  }[type];

  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4"
      role="status"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div
        ref={toastRef}
        className={`${bgColor} text-white px-4 py-3 rounded shadow-lg flex items-center justify-between`}
        tabIndex={0}
        role="alert"
        aria-labelledby="toast-message"
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span id="toast-message">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Toast;
