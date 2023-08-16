import styles from "./Button.module.scss";

interface ButtonProps {
  text?: string;
  clickAction?: () => void;
}

export const Button = ({ text, clickAction }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={clickAction}>
      {text}
    </button>
  );
};
