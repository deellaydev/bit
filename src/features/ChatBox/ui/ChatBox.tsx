import Message from '../../../shared/ui/Message/ui/Message';
import styles from "./ChatBox.module.scss"

interface ChatBoxTypes {
	messages: string[]
}

export const ChatBox = ({messages}: ChatBoxTypes) => {
	return (
		<div className={styles.wrapper}>
			{messages.filter((el, i) => <Message text={el} isBot={i % 2 === 0}/>)}
		</div>
	);
};