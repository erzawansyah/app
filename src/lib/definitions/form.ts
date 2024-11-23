import { InputHTMLAttributes } from "react";

interface InputTextPropsComponent {
  label: string;
  name: string; // Akan digunakan sebagai id dan name
  defaultValue?: string;
  inputType?: "text" | "email" | "password" | "number";
  className?: {
    container?: string;
    label?: string;
    input?: string;
  };
  errors?: string | string[] | undefined;
  // another event handler
}

export type InputTextProps = InputTextPropsComponent &
  InputHTMLAttributes<HTMLInputElement>;

export interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
}
