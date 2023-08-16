import { useEffect } from "react";
import { ChatInput } from "../../../features/ChatInput";
import { Title } from "../../../shared/ui/Title";
import { useSendMessage } from "../lib/useSendMessage";
import { ChatBox } from "../../../features/ChatBox/ui/ChatBox";

const ChatBot = () => {
  const { sendMessage, selfMessages, message } = useSendMessage();

	useEffect(() => {
		console.log(message)
	}, [message])


  return (
    <div style={{width: "800px"}}>
			<Title>Bot Chat</Title>
			<ChatBox/>
      <ChatInput onSend={sendMessage} />
			{message}
    </div>
  );
};

export default ChatBot;
