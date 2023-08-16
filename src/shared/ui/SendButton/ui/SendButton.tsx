import styles from "./SendButton.module.scss";

interface ButtonProps {
  clickAction?: () => void;
}

export const SendButton = ({ clickAction }: ButtonProps) => {
  return <button className={styles.sendButton} onClick={clickAction} />;
};
