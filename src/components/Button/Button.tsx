import { PropsWithChildren } from 'react'
import "./Button.css";

export interface ButtonProps {
  variant?: "primary" | "accent" | "success" | "danger";
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({variant='primary', onClick, children }: PropsWithChildren<ButtonProps>) {
  const buttonClasses = `button ${variant}`;

  return (
    <>
      <button className={buttonClasses} onClick={onClick}>
        {children}
      </button>
    </>
  );
}
