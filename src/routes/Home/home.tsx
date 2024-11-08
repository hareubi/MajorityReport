import { useState } from "react";
import { auth } from "../../firebase";
import { todaysQuote } from "./quotes.ts";
import IssueList from "../issues/issue-list.tsx";

export default function Home() {
  const [time, setTime] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  if (timer == null) {
    setTimer(
      setInterval(() => {
        const hour = String(new Date().getHours()).padStart(2, "0");
        const minute = String(new Date().getMinutes()).padStart(2, "0");
        const second = String(new Date().getSeconds()).padStart(2, "0");
        setTime(`${hour}:${minute}:${second}`);
      }, 900)
    );
  }
  return (
    <ul>
      <h2 id="clock">{time}</h2>
      <h1 id="welcome">welcome, {auth.currentUser?.displayName}</h1>
      <IssueList></IssueList>
      <span>{todaysQuote.quote}</span>
      <span>{todaysQuote.author}</span>
    </ul>
  );
}
