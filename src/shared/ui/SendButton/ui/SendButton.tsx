import { classNames } from "../../../lib/classNames/classNames";
import styles from "./SendButton.module.scss";

interface ButtonProps {
  clickAction?: () => void;
  disabled: boolean;
}

export const SendButton = ({ clickAction, disabled }: ButtonProps) => {
  return (
    <button
      className={classNames(styles.sendButton, { [styles.disabled]: disabled })}
      onClick={clickAction}
      disabled={disabled}
    />
  );
};
