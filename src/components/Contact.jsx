import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to Django backend using fetch or Axios
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for name, email, message */}
      <button type="submit">Send Message</button>
    </form>
  );
};

export default Contact;