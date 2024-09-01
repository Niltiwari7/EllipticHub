import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/Contact.css';

function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_kl0jhjj', 'template_xzjp9il', e.target, 'r-ane09nVmDUAJ0SG')
      .then(
        (result) => {
          console.log('Email sent successfully:', result);
        },
        (error) => {
          console.error('Email error:', error);
        }
      );
  };

  return (
    <section className="bg-white min-h-screen m-2 flex justify-center items-center dark:bg-gray-800">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Contact Us</h2>
        <p className="mb-8 font-light text-center text-gray-600 sm:text-xl">Give Your Valuable Feedback</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input
              type="email"
              id="email"
              value={email}
              name="to_name"
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              name="subject"
              onChange={(e) => setSubject(e.target.value)}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Subject"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
