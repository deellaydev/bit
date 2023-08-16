import { classNames } from "../../../lib/classNames/classNames";
import styles from "./Message.module.scss"

interface MessageProps {
	text: string;
	isBot?: boolean;
}

const Message = ({text, isBot = false}: MessageProps) => {
	return (
		<p className={classNames(styles.message, {[styles.isBot]: isBot})}>
			{text}
		</p>
	);
};

export default Message;