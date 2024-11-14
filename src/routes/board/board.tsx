import { useState } from "react";
import { styled } from "styled-components";

const BoardColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 5px;
  min-height: 80vh;
  height: fit-content;
  min-width: 300px;
  width: fit-content;
  background-color: white;
`;
const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 90vh;
  padding-top: 60px;
`;
const StoryAddButton = styled.button`
  height: 50px;
  width: 50px;
  padding: 0;
  margin-bottom: 10px;
  align-self: start;
  position: fixed;
  transform: translateY(-50px);
`;

export default function Board() {
  const [cardList, setCardList] = useState<
    {
      name: string;
      description: string;
    }[]
  >([]);
  return (
    <BoardWrapper>
      <StoryAddButton
        onClick={() => {
          setCardList([{ name: "Meow", description: "cat" }, ...cardList]);
        }}
      >
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
      </StoryAddButton>
      {cardList.map((card) => {
        return (
          <BoardColumn>
            <h1>{card.name}</h1>
            <h1>{card.description}</h1>
            {[0, 2, 2].map((value) => {
              return <div>{value}</div>;
            })}
          </BoardColumn>
        );
      })}
    </BoardWrapper>
  );
}
