import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { todaysQuote } from "./quotes.ts";

export default function Profile() {
  const [time, setTime] = useState("");
  useEffect(() => {
    setInterval(() => {
      const hour = String(new Date().getHours()).padStart(2, "0");
      const minute = String(new Date().getMinutes()).padStart(2, "0");
      const second = String(new Date().getSeconds()).padStart(2, "0");
      setTime(`${hour}:${minute}:${second}`);
    }, 100);
  });
  return (
    <ul>
      <h2 id="clock">{time}</h2>
      <h1 id="welcome">welcome, {auth.currentUser?.email}</h1>
      <span>{todaysQuote.quote}</span>
      <span>{todaysQuote.author}</span>
    </ul>
  );
}
