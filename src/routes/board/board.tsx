import { useState } from "react";
import { styled } from "styled-components";
import Card from "./card";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../components/firebase";

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 90vh;
  padding-top: 90px;
`;
const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  align-self: start;
  position: fixed;
  transform: translateY(-80px);
`;
const CardAddButton = styled.button`
  height: 50px;
  width: 50px;
  padding: 0;
`;

export default function Board() {
  const [cardName, setCardName] = useState("");
  function onStoryAdd() {
    if (cardName.trim() == "") return;
    addDoc(collection(db, "board"), { name: cardName });
    setCardName("");
  }
  return (
    <BoardWrapper>
      <TopRow>
        <CardAddButton onClick={onStoryAdd}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </CardAddButton>
        <ul>
          <h1>
            <input
              type="text"
              placeholder="meow?????"
              value={cardName}
              onChange={(event) => {
                setCardName(event.target.value);
              }}
            />
          </h1>
        </ul>
      </TopRow>

      <Card />
    </BoardWrapper>
  );
}
