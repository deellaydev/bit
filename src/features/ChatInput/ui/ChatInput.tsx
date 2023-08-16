import { useState } from "react";
import { Input } from "../../../shared/ui/Input";
import { SendButton } from "../../../shared/ui/SendButton";

interface ChatInputProps {
  onSend: Function;
  buttonDisable: boolean;
}

const ChatInput = ({ onSend, buttonDisable }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value || buttonDisable) {
      return;
    }

    onSend(value);
    setValue("");
  };

  return (
    <div>
      <Input
        value={value}
        setValue={setValue}
        sendButton={<SendButton clickAction={handleSend} disabled={buttonDisable} />}
      />
    </div>
  );
};

export default ChatInput;
