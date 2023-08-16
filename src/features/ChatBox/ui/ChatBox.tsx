import Message from "../../../shared/ui/Message/ui/Message";
import styles from "./ChatBox.module.scss";
export interface MessageProps {
  id: number;
  text: string;
  isBot: boolean;
}
interface ChatBoxProps {
  messages?: MessageProps[];
}

export const ChatBox = ({ messages }: ChatBoxProps) => {
  // console.log(messages);

  return (
    <div className={styles.wrapper}>
      {messages?.map((el) => (
        <Message key={el.id} text={el.text} isBot={el.isBot} />
      ))}
    </div>
  );
};
