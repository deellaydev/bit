import { useState } from "react";
import { Input } from "../../../shared/ui/Input";
import { SendButton } from "../../../shared/ui/SendButton";

interface ChatInputProps {
  onSend: Function;
}

const ChatInput = ({onSend}: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    onSend(value)
    setValue("")
  }

  return (
    <div>
      <Input
        value={value}
        setValue={setValue}
        sendButton={<SendButton clickAction={handleSend}/>}
      />
    </div>
  );
};

export default ChatInput;
