import { styled } from "styled-components";

export default function Board() {
  return (
    <BoardWrapper>
      <BoardRow>
        aaa
        <BoardColumn>aaa</BoardColumn>
      </BoardRow>
      <BoardRow>aaa</BoardRow>
      <BoardRow>aaa</BoardRow>
    </BoardWrapper>
  );
}

const BoardColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 5px;
  min-height: 100px;
  max-width: 100px;
  background-color: white;
`;
const BoardRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 5px;
  min-height: 100px;
  background-color: white;
`;
const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;
