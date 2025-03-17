import { ReactElement } from "react";

interface inputProps {
  type: string;
  placeholder: string;
  pattern?: string;
  required: boolean;
  name?: string;
  className?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}
export default function Input(props: inputProps) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      required={props.required}
      pattern={props.pattern}
      name={props.name}
      onChange={props.onChange}
      className={`px-3 py-2 border-gray-900 border  bg-gray-100 placeholder:text-gray-700 font-normal text-[18px] focus-visible:outline-blue-300 rounded-[20px] w-full ${props.className} `}
    />
  );
}
