import { useState } from "react";
import { auth } from "../../components/firebase.ts";
import { todaysQuote } from "./quotes.ts";
import IssueList from "../issues/issue-list.tsx";
import Board from "../board/board.tsx";
import styled from "styled-components";
const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
`;

export default function Home() {
  const [time, setTime] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  if (timer == null) {
    const hour = String(new Date().getHours()).padStart(2, "0");
    const minute = String(new Date().getMinutes()).padStart(2, "0");
    const second = String(new Date().getSeconds()).padStart(2, "0");
    setTime(`${hour}:${minute}:${second}`);
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
      <HomeWrapper>
        <div>
          <h2>
            {time} welcome, {auth.currentUser?.displayName}
            <img src={auth.currentUser?.photoURL as string} />
          </h2>
        </div>
        <div></div>
        <div>
          <IssueList />
        </div>

        <Board />
      </HomeWrapper>
      <div>
        <footer>
          <h1>"{todaysQuote.quote}"</h1>
          <h1>-{todaysQuote.author}-</h1>{" "}
        </footer>
      </div>
    </ul>
  );
}
