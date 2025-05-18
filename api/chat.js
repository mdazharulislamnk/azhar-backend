// api/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage(req.body.message);
    const response = result.response.text();
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
