# chatbot-wp

A simple web-based chatbot using OpenAI's GPT-4o with Bulgarian language support.

> **Note**: The project requires **Node.js v18 or later** for the built-in `fetch` API.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env`, add your OpenAI API key, and **never commit**
   the `.env` file:

   ```
   OPENAI_API_KEY=your-api-key-here
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000/](http://localhost:3000/).

The client code sends chat messages to `/api/chat`, which is proxied by the
Express server using the API key from the `.env` file.
