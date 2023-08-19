'use client';
import { useState } from 'react';
// import { Message } from 'ai/react';
// import { useChat } from 'ai/react';
// import { ChatRequest, FunctionCallHandler, nanoid } from 'ai';

export default function Chat() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  async function handleOnGenerate(e: any) {
    e.preventDefault();

    // const fields = Array.from(e.currentTarget.elements);
    const prompt = 'hello'; //fields.find((el) => el.name === 'prompt').value;

    // setIsLoading(true);
    // setImage(undefined);

    const { image_url } = await fetch('/api/image', {
      method: 'POST',
      body: JSON.stringify({
        prompt,
      }),
    }).then((res) => res.json());

    // console.log(70, image_url);
    setImageUrl(image_url);
    // setImage(image);
    // setIsLoading(false);
  }

  return (
    <div
      style={{
        width: '100vw',
        padding: 20,
        boxSizing: 'border-box',
        color: 'white',
      }}
    >
      <button onClick={handleOnGenerate}> Generate</button>
      {imageUrl && <img src={imageUrl} />}
      {/* <div id="chart-goes-here">This is where a chart goes</div> */}

      {/* <form
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
      </form> */}
    </div>
  );
}
