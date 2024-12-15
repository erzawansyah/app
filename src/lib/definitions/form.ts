import { InputHTMLAttributes } from "react";

interface InputTextPropsComponent {
  label: string;
  name: string; // Akan digunakan sebagai id dan name
  defaultValue?: string;
  inputType?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "datetime-local"
    | "file";
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

export type CustomSelectProps<T> = {
  name: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: T[];
  displayProperty: keyof T;
  valueProperty: keyof T;
  placeholder?: string;
  errors?: string | string[];
};
