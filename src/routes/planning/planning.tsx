import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CollapseToggleButton = styled.button`
  height: 50px;
  width: 50px;
  padding: 0;
  margin-bottom: 10px;
  align-self: start;
`;

const Header = styled.div`
  text-align: center;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 2em;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1em;
  color: #666;
`;

const CardOptions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  background-color: #bdbbbb;
`;

const Card = styled.div`
  width: 50px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const PlayerList = styled.div`
  text-align: left;
  margin: 20px;
  background-color: white;
  min-width: 45vw;
  min-height: 20vh;
`;

const PlayerTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Player = styled.li`
  list-style-type: none;
  margin: 5px 0;
`;

const SelectedCardDisplay = styled.ul`
  margin-top: 20px;
  text-align: center;
`;

const SelectedTitle = styled.h3`
  font-size: 1.2em;
`;

const SelectedPlaceholder = styled.p`
  font-size: 1em;
  color: #888;
`;

const RevealButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #859900;
  color: white;
  border-radius: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #859900;
  }
`;

function PokerMainScreen() {
  const [estimate, setEstimate] = useState(0);
  const cards = [0, 1, 3, 5, 8, 999]; //
  return (
    <>
      <Header>
        <Title>Planning Poker</Title>
        <Subtitle>Select your estimate below</Subtitle>
      </Header>

      <PlayerList>
        <PlayerTitle>Players</PlayerTitle>
        <ul>
          <Player>Player 1 - Selected: 5</Player>
          <Player>Player 2 - Selected: {cards[estimate]}</Player>
          <Player>Player 3 - Selected: 8</Player>
        </ul>
      </PlayerList>

      <CardOptions>
        {cards.map((card, index) => (
          <Card key={index} onClick={() => setEstimate(index)}>
            {card}
          </Card>
        ))}
      </CardOptions>

      <SelectedCardDisplay>
        <SelectedTitle>Your Selection</SelectedTitle>
        <SelectedPlaceholder>
          (Card selection will be displayed here)
        </SelectedPlaceholder>
      </SelectedCardDisplay>

      {/* Reveal Button */}
      <RevealButton>Reveal Cards</RevealButton>
    </>
  );
}

export default function Planning() {
  const [isJoined, setJoined] = useState(true);
  return (
    <Container>
      <CollapseToggleButton hidden={!isJoined}>
        <svg
          fill="none"
          stroke="#dc322f"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </svg>
      </CollapseToggleButton>
      {isJoined ? <PokerMainScreen /> : <h1>aaa</h1>}
    </Container>
  );
}
