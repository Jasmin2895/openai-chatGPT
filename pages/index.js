import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

const languages = [
  "Afrikaans",
  "Arabic",
  "Bengali",
  "Bulgarian",
  "Catalan",
  "Cantonese",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "Lithuanian",
  "Malay",
  "Malayalam",
  "Panjabi",
  "Tamil",
  "English",
  "Finnish",
  "French",
  "German",
  "Greek",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Indonesian",
  "Italian",
  "Japanese",
  "Javanese",
  "Korean",
  "Norwegian",
  "Polish",
  "Portuguese",
  "Romanian",
  "Russian",
  "Serbian",
  "Slovak",
  "Slovene",
  "Spanish",
  "Swedish",
  "Telugu",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Vietnamese",
  "Welsh",
  "Sign language",
  "Algerian",
  "Aramaic",
  "Armenian",
  "Berber",
  "Burmese",
  "Bosnian",
  "Brazilian",
  "Bulgarian",
  "Cypriot",
  "Corsica",
  "Creole",
  "Scottish",
  "Egyptian",
  "Esperanto",
  "Estonian",
  "Finn",
  "Flemish",
  "Georgian",
  "Hawaiian",
  "Indonesian",
  "Inuit",
  "Irish",
  "Icelandic",
  "Latin",
  "Mandarin",
  "Nepalese",
  "Sanskrit",
  "Tagalog",
  "Tahitian",
  "Tibetan",
  "Gypsy",
  "Wu"
];

export default function Home() {
  const [sentenceInput, setSentenceInput] = useState("");
  const [translationResult, setTranslationResult] = useState();
  const [languageInput, setLanguageInput] = useState("");
  const [languageResult, setLanguageResult] = useState();


  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence: sentenceInput, language: languageInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setTranslationResult(data.translationResult)
      setLanguageResult(data.languageResult)
      setSentenceInput("")
      setLanguageInput("")
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Translate a sentence</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="sentence"
            placeholder="Enter a sentence to proceed."
            value={sentenceInput}
            onChange={(e) => setSentenceInput(e.target.value)}
          />
          <select placeholder="Select the language" value={languageInput} name="language" onChange={(e) => setLanguageInput(e.target.value)}>
            {languages.map((language) => <option name={language}>{language}</option>)}
          </select>
          {/* <input
            type="text"
            name="language"
            placeholder="Enter the language"
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
          /> */}
          <input type="submit" value="Translate Text" />
        </form>
        <h5>Translation Result</h5>
        <div className={styles.result}>{languageResult}</div>
        <div className={styles.result}>{translationResult}</div>
      </main>
    </div>
  );
}
