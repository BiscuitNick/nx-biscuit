// import { Configuration, OpenAIApi } from 'openai-edge';
// import { OpenAIStream, StreamingTextResponse } from 'ai';

import { Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';

// import { ChatCompletionFunctions } from 'openai-edge/types/api';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';

// const functions: ChatCompletionFunctions[] = [
//   {
//     name: 'get_current_weather',
//     description: 'Get the current weather',
//     parameters: {
//       type: 'object',
//       properties: {
//         format: {
//           type: 'string',
//           enum: ['celsius', 'fahrenheit'],
//           description:
//             'The temperature unit to use. Infer this from the users location.',
//         },
//       },
//       required: ['format'],
//     },
//   },
//   {
//     name: 'eval_code_in_browser',
//     description: 'Execute javascript code in the browser with eval().',
//     parameters: {
//       type: 'object',
//       properties: {
//         code: {
//           type: 'string',
//           description: `Javascript code that will be directly executed via eval(). Do not use backticks in your response.
//            DO NOT include any newlines in your response, and be sure to provide only valid JSON when providing the arguments object.
//            The output of the eval() will be returned directly by the function.`,
//         },
//       },
//       required: ['code'],
//     },
//   },
// ];

export async function POST(req: Request) {
  // const { messages } = await req.json();

  const response = await openai.createImage({
    prompt: 'A painting of a dog',
    n: 1,
    size: '256x256',
  });

  const image_url = response.data.data[0].url;
  console.log(image_url);
  // const { data } = response;

  // console.log(61, Object.keys(response));
  // console.log(59, Object.keys(messages));
  //   console.log(response);

  // const stream = OpenAIStream(response, {
  //   onCompletion: async (completion: string) => {
  //     console.log(66, completion);
  //   },
  // });

  // console.log(stream);

  // return new StreamingTextResponse(stream);

  // return new StreamingTextResponse(stream);

  // return urlData;
  return NextResponse.json({ image_url });
}
