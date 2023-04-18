import { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { verifyCredentials } from './api/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await verifyCredentials(username, password);
    if (success) {
      Router.push('/popularmovies');
    } else {
      alert('Mauvais identifiants de connexion.');
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h1 {
          margin-bottom: 1rem;
        }

        form {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }

        label {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        input {
          padding: 0.5rem;
          border: 1px solid #ddd;
          margin-bottom: 1rem;
        }

        button {
          padding: 0.5rem 1rem;
          background-color: #333;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #555;
        }
      `}
      </style>
    </>
  );
}
