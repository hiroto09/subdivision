"use client"
import { useState } from 'react';

export default function GeminiTest() {
    const [geminiResponse, setGeminiResponse] = useState<string>('');
    const prompt = 'こんにちは';
    const Gemini = () => {
        const postData = async () => {
            const response = await fetch('/api/gemini-api', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt_post:prompt }),//promptに入力する文字を入れる
            });
            const data = await response.json();
            setGeminiResponse(data.message);
        };
        postData();
    };
    return (
        <main>
            <button onClick={Gemini}>Generate</button>
            <p>{geminiResponse}</p>
        </main>
    );
}