import { useState } from "react";

const REGEX = /({"status":"[^"]+","value":"?[^"]+"?})/gi

export const useSendMessage = () => {
  const [selfMessages, setSelfMessages] = useState<string[]>([]);
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
	const [responseChunks, setResponseChunks] = useState([]);
	const [chunks, setChunks] = useState([]);
  const [isDone, setIsDone] = useState(false);

  async function fetchData(message: string) {

      const response = await fetch('http://185.46.8.130/api/v1/chat/send-message', {
        method: 'POST',
        body: JSON.stringify({message}),
				headers: {
					'Content-Type': "application/json"
				}
      })

			if (!response.body) {
				return;
			}

      const reader = response.body.getReader();
      let receivedChunks: string[] = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        } else {
          const text = new TextDecoder().decode(value);
					const newChunks = text.match(REGEX) || []
					for (const smallChunk of newChunks) {
						const chunk = JSON.parse(smallChunk)
						if (chunk.value) {
							receivedChunks = [...receivedChunks, chunk];
							setMessage((prev) => prev + chunk.value)
						}
					}
        }
      }
  }

  return {
    sendMessage: fetchData,
    selfMessages,
    responseText,
    message,
  };
};
