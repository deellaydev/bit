import { Dispatch, ReactNode, SetStateAction } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  sendButton?: ReactNode;
}

export const Input = ({
  value,
  setValue,
  placeholder = "Start typing here...",
  sendButton,
}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {sendButton}
    </div>
  );
};
