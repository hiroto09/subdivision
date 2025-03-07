"use client";
import { useState } from "react";
import style from "./Gemini.module.scss";

export default function Gemini() {
  const [promptText, setPromptText] = useState<string>("");
  const [geminiResponse, setGeminiResponse] = useState<JsonType | null>(null);

  type JsonType = Record<string, string[]>;

  const prompt = `${promptText}について最低限必要になる機能とそれに対する必要処理を実装順に記述してください。最初にjsonと書かないこと、"""で囲わないこと
  フォーマット：
  {
      "機能名1": [
          "処理名1",
          "処理名2"
      ],
      "機能名2": [
          "処理名3",
          "処理名4",
          "処理名5"
      ]
  }
  `;

  const Gemini = async () => {
    console.log("Gemini関数が呼び出されました");

    try {
      const response = await fetch("/api/gemini-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt_post: prompt }),
      });

      console.log("レスポンス受信:", response);

      if (!response.ok) {
        throw new Error(`エラーが発生しました: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("JSONデータ:", data);

      // 受け取ったデータを JsonType に変換
      try {
        const parsedData: JsonType = JSON.parse(data.message);
        setGeminiResponse(parsedData);
      } catch (error) {
        console.error("JSONの解析に失敗しました:", error);
        setGeminiResponse(null);
      }
    } catch (error) {
      console.error("エラー発生:", error);
    }
  };

  return (
    <>
    <div className={style.gemini}>
        <div className={style.generater}>
          <form className={style.generaterContent}>
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="アプリ名を入力"
            />
            <button type="button" onClick={Gemini}>
              ▲
            </button>
          </form>
        </div>
    </div>

      {/* 受け取ったデータをリスト表示 */}
      {geminiResponse && (
        <ul>
          {Object.entries(geminiResponse).map(([feature, processes]) => (
            <li key={feature}>
              <strong>{feature}</strong>
              <ul>
                {processes.map((process, index) => (
                  <li key={index}>{process}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
