'use client';

import { Message } from 'ai/react';
import { useChat } from 'ai/react';
import { ChatRequest, FunctionCallHandler, nanoid } from 'ai';

export default function Chat() {
  const assistantName = 'Nick Dog';
  const userName = 'User';

  const functionCallHandler: FunctionCallHandler = async (
    chatMessages,
    functionCall
  ) => {
    if (functionCall.name === 'eval_code_in_browser') {
      if (functionCall.arguments) {
        // Parsing here does not always work since it seems that some characters in generated code aren't escaped properly.
        const parsedFunctionCallArguments: { code: string } = JSON.parse(
          functionCall.arguments
        );
        // WARNING: Do NOT do this in real-world applications!
        eval(parsedFunctionCallArguments.code);
        const functionResponse = {
          messages: [
            ...chatMessages,
            {
              id: nanoid(),
              name: 'eval_code_in_browser',
              role: 'function' as const,
              content: parsedFunctionCallArguments.code,
            },
          ],
        };
        return functionResponse;
      }
    }
  };

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat-with-functions',
    experimental_onFunctionCall: functionCallHandler,
  });

  // Generate a map of message role to text color
  const roleToColorMap: Record<Message['role'], string> = {
    system: 'red',
    user: 'white',
    function: 'blue',
    assistant: 'green',
  };

  console.log(messages, input);

  return (
    <div style={{ width: '100vw', padding: 20, boxSizing: 'border-box' }}>
      {messages.length > 0
        ? messages.map((m: Message) => (
            <div
              key={m.id}
              className="whitespace-pre-wrap"
              style={{ color: roleToColorMap[m.role] }}
            >
              <strong>{`${
                m.role === 'assistant'
                  ? assistantName
                  : m.role === 'user'
                  ? userName
                  : m.role
              }: `}</strong>
              {m.content || JSON.stringify(m.function_call)}
              <br />
              <br />
            </div>
          ))
        : null}
      {/* <div id="chart-goes-here">This is where a chart goes</div> */}

      <form
        onSubmit={handleSubmit}
        // style={{ padding: 10, width: '100%', boxSizing: 'border-box' }}
      >
        <input
          //   className="fixed bottom-0 w-100 p-20 mb-8 border border-gray-300 rounded shadow-xl"
          style={{ width: '100%', borderRadius: 5 }}
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
