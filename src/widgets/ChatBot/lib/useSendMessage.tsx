import { useEffect, useRef, useState } from "react";
import { MessageType } from "../../../features/ChatBox";

const REGEX = /({"status":"[^"]+","value":"?[^"]+"?})/gi;

export const useSendMessage = () => {
  const [selfMessages, setSelfMessages] = useState<Record<number, MessageType>>({});
  const [botMessages, setBotMessages] = useState<Record<number, MessageType>>({});
  const [messages, setMessages] = useState<any>([]);
  const [stopReader, setStopReader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const arrayCounter = useRef(0);

  const handleStopReader = () => {
    setStopReader(true);
  };

  async function sendMessage(message: string) {
    setIsLoading(true);
    const currentId = Math.random() * Date.now();

    setSelfMessages((prev) => ({
      ...prev,
      [arrayCounter.current]: {
        text: message,
        id: Math.random() * Date.now(),
        isBot: false,
      },
      length: arrayCounter.current + 1,
    }));

    setBotMessages((prev) => ({
      ...prev,
      [arrayCounter.current]: {
        text: "",
        id: currentId,
        isBot: true,
      },
    }));

    const response = await fetch("http://185.46.8.130/api/v1/chat/send-message", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.body) {
      return;
    }

    const reader = response.body.getReader();

    if (!reader) {
      return;
    }

    let receivedChunks: string[] = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        arrayCounter.current++;
        break;
      } else {
        const text = new TextDecoder().decode(value);
        const newChunks = text.match(REGEX) || [];
        for (const smallChunk of newChunks) {
          const chunk = JSON.parse(smallChunk);
          if (chunk.value) {
            receivedChunks = [...receivedChunks, chunk];
            setTimeout(() => {
              setBotMessages((prev) => ({
                ...prev,
                [arrayCounter.current - 1]: {
                  text: prev?.[arrayCounter.current - 1]?.text
                    ? prev[arrayCounter.current - 1].text + chunk.value
                    : chunk.value,
                  id: currentId,
                  isBot: true,
                },
                length: arrayCounter.current,
              }));
            }, 500);
          }
        }
      }
      if (stopReader) {
        reader.cancel();
        setStopReader(false);
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (selfMessages[arrayCounter.current]) {
      setMessages((prev: any) => ({
        ...prev,
        [selfMessages[arrayCounter.current].id]: {
          ...selfMessages[arrayCounter.current],
        },
      }));
    }
  }, [selfMessages]);

  useEffect(() => {
    if (botMessages[arrayCounter.current - 1]) {
      setMessages((prev: any) => ({
        ...prev,
        [botMessages[arrayCounter.current - 1].id]: {
          ...botMessages[arrayCounter.current - 1],
        },
      }));
    }
    if (botMessages[arrayCounter.current]?.text === "") {
      setMessages((prev: any) => ({
        ...prev,
        [botMessages[arrayCounter.current].id]: {
          ...botMessages[arrayCounter.current],
        },
      }));
    }
  }, [botMessages]);

  return {
    sendMessage,
    handleStopReader,
    selfMessages,
    botMessages,
    messages,
    isLoading,
  };
};
