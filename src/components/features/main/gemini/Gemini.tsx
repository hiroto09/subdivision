"use client";
import { useState } from "react";
import { useAtom } from "jotai";
import style from "./Gemini.module.scss";
import ResType from "@/type/ResType";
import { resAtom } from "@/const/atoms/index";

export default function Gemini() {
  const [,setRes] = useAtom(resAtom);
  const [promptText, setPromptText] = useState<string>("");
  const prompt = `${promptText}について、アプリケーションの開発におけるロードマップを作成してください。最低限必要なアプリケーションの機能と、それに対する必要な処理を以下の形式で記述してください：
- JSON形式で出力してください（最初に「json」とは書かないでください）。
- '''も入らないようにしてください。
- 各機能とその処理は、実装順に並べてください。
- 各機能は実装のステップごとに分けて記述してください。

【出力フォーマット】
{
  "ステップ1": {
    "機能名1": [
      "処理名1",
      "処理名2"
    ],
    "機能名2": [
      "処理名3",
      "処理名4"
    ]
  },
  "ステップ2": {
    "機能名3": [
      "処理名5",
      "処理名6"
    ]
  }
}

上記のJSONフォーマットを厳密に守り、必ずJSONのみを出力して。
`;

  const fetchRoadmap = async () => {
    try {
      const response = await fetch("/api/gemini-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt_post: prompt }),
      });

      if (!response.ok) {
        throw new Error(`エラーが発生しました: ${response.statusText}`);
      }

      const data = await response.json();

      if (typeof data.message === "string") {
        try {
          const parsedData: ResType = JSON.parse(data.message);
          setRes(parsedData);
        } catch (error) {
          console.error("JSONの解析に失敗しました:", error);
          setRes(null);
        }
      } else {
        console.error("APIレスポンスの形式が不正です:", data);
        setRes(null);
      }
    } catch (error) {
      console.error("APIリクエスト中にエラー発生:", error);
    }
  };

  return (
    <>
      <div className={style.gemini}>
        <div className={style.generater}>
          <form
            className={style.generaterContent}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="アプリ名を入力"
            />
            <button type="button" onClick={fetchRoadmap}>
              ▲
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
