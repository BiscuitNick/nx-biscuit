'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      message: '',
    },
    onSubmit: async (values) => {
      const endpoint = '/api/sendgrid';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      };
      const response = await fetch(endpoint, options);
      const result = await response.json();

      const { body, statusCode, headers } = result[0];

      if (statusCode === 202) {
        setSubmitted(true);
      }

      console.log(body);
      console.log(statusCode);
      console.log(headers);

      //   return result;
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-screen h-auto ">
      {submitted ? (
        <div className="text-white flex flex-col items-center justify-center w-screen h-screen">
          <div> Your message has been sent. </div>
        </div>
      ) : (
        <form className="p-10" onSubmit={formik.handleSubmit}>
          <h1 className="gradient-text text-6xl  m-10">Contact</h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="name"
                type="text"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
                placeholder="user@example.com"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                id="message"
                placeholder="Enter your message"
                onChange={formik.handleChange}
                value={formik.values.message}
              ></textarea>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="w-full center">
              <button
                className="shadow bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
