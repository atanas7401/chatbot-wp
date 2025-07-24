# chatbot-wp

A simple web-based chatbot using OpenAI's GPT-4o with Bulgarian language support.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your-api-key-here
   ```

3. Start the server:

   ```bash
   npm start
   ```

The client code sends chat messages to `/api/chat`, which is proxied by the
Express server using the API key from the `.env` file.
