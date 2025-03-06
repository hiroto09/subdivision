"use client";
import { useState } from "react";

export default function GeminiTest() {
  const [promptText, setPromptText] = useState<string>("");
  const [geminiResponse, setGeminiResponse] = useState<string>("");
  const prompt = `${promptText}について最低限必要になる機能とそれに対する必要処理を記述してください。最初にjsonと書かないこと、"""で囲わないこと
フォーマット：

{
    "機能名1": [
        {"必要処理": "処理名1"},
        {"必要処理": "処理名2"}
    ],
    "機能名2": [
        {"必要処理": "処理名3"},
        {"必要処理": "処理名4"},
        {"必要処理": "処理名5"}
    ]
}
`;

  const Gemini = () => {
    const postData = async () => {
      const response = await fetch("/api/gemini-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt_post: prompt }),
      });
      const data = await response.json();
      setGeminiResponse(data.message);
      console.log(data.message);
    };
    postData();
  };
  return (
    <main>
      <span>
        <textarea value={promptText} onChange={(e) => setPromptText(e.target.value)}></textarea>
        <button onClick={Gemini}>Generate</button>
      </span>
      <p>{geminiResponse}</p>
    </main>
  );
}
