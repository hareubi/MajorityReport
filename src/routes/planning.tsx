import styled from "styled-components";

const Container = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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

export default function PlanningPoker() {
  const cards = [1, 2, 3, 5, 8, 13, 21, "?"]; // Typical Fibonacci sequence options

  return (
    <Container>
      <Header>
        <Title>Planning Poker</Title>
        <Subtitle>Select your estimate below</Subtitle>
      </Header>

      <PlayerList>
        <PlayerTitle>Players</PlayerTitle>
        <ul>
          <Player>Player 1 - Selected: 5</Player>
          <Player>Player 2 - Selected: ?</Player>
          <Player>Player 3 - Selected: 8</Player>
          {/* Add more players as needed */}
        </ul>
      </PlayerList>

      <CardOptions>
        {cards.map((card, index) => (
          <Card key={index}>{card}</Card>
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
    </Container>
  );
}
