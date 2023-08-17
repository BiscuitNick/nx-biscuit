import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface messageProps {
  name: string;
  email: string;
  message: string;
  // text: string;
  // subject: string;
}

const createMessage = ({ name, email, message }: messageProps) => ({
  to: email, // Change to your recipient
  from: 'dev@nick.dog', //'nick@biscuit.land', // Change to your verified sender
  subject: 'Message Received',
  html: `
      <body style="
        display:grid;
        padding: 10px;
        grid-gap:25px;
        width:100%;
        box-sizing:border-box;
        ">
        <h1>Hi ${name},</h1>
        <p>Thank you for contacting me.<br/>
        I will get back to you as soon as possible.</p>
        <p>Please respond directly to this email if there's any additional info you'd like to share.</p>
        <p>Best,<br/>Nick</p>
        <p>For your records. Here is a copy of your original message:</p>
        <p>${message}</p>
      </body>
      `,
});

export async function GET(request: Request) {
  return new Response('This api method only accepts POST requests.');
}

export async function POST(request: Request) {
  const { email, name, message } = await request.json();
  const msg = createMessage({
    name,
    email,
    message,
  });

  const msgCC = createMessage({
    name,
    email: 'dev@nick.dog',
    message,
  });

  try {
    const mail = await sgMail.send(msg);
    await sgMail.send(msgCC);

    return NextResponse.json(mail);
  } catch (error) {
    return NextResponse.json(error);
  }
}
