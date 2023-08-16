import { ChatInput } from "../../../features/ChatInput";
import { Title } from "../../../shared/ui/Title";
import { useSendMessage } from "../lib/useSendMessage";
import { ChatBox } from "../../../features/ChatBox/ui/ChatBox";
import { Button } from "../../../shared/ui/Button/ui/Button";

const ChatBot = () => {
  const { sendMessage, handleStopReader, messages } = useSendMessage();

  return (
    <div style={{ width: "800px", display: "flex", flexDirection: "column", gap: "30px" }}>
      <Title>Bot Chat</Title>
      <ChatBox messages={Object.values(messages)} />
      <ChatInput onSend={sendMessage} />
      <Button clickAction={handleStopReader} text="Stop" />
    </div>
  );
};

export default ChatBot;
