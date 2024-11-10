import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
`;

const CommunityWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const SubmitButton = styled.button`
  height: 50px;
  width: 50px;
  padding: 0px;
  align-self: start;
`;
const CommunityCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const CommunityTitle = styled.h2`
  font-size: 1.5em;
  color: #222;
  margin: 0;
`;

const CommunityDescription = styled.p`
  font-size: 1em;
  color: #666;
  margin: 10px 0;
`;

const CommunityInfo = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Members = styled.span`
  font-size: 0.9em;
  color: #888;
`;

const JoinButton = styled.button`
  padding: 8px 16px;
  font-size: 0.9em;
  background-color: #859900;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #859900;
  }
`;

export default function Communicate() {
  // Sample data for communities
  const communities = [
    {
      id: 1,
      name: "Tech Enthusiasts",
      description: "A community for tech lovers and innovators.",
      members: 1243,
    },
    {
      id: 2,
      name: "Book Lovers",
      description: "Share and discuss your favorite books with others.",
      members: 958,
    },
    {
      id: 3,
      name: "Fitness Buffs",
      description: "A group for people who love fitness and health.",
      members: 752,
    },
    {
      id: 4,
      name: "Art & Creativity",
      description: "Where artists and creators come together.",
      members: 678,
    },
    {
      id: 5,
      name: "Gamers United",
      description: "A community for gamers to connect and compete.",
      members: 1532,
    },
  ];

  return (
    <Wrapper>
      <SubmitButton>
        <svg
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
      </SubmitButton>
      <Header>Communities</Header>
      <CommunityWrapper>
        {communities.map((community) => (
          <CommunityCard key={community.id}>
            <CommunityTitle>{community.name}</CommunityTitle>
            <CommunityDescription>{community.description}</CommunityDescription>
            <CommunityInfo>
              <Members>{community.members} Members</Members>
              <JoinButton>Join</JoinButton>
            </CommunityInfo>
          </CommunityCard>
        ))}
      </CommunityWrapper>
    </Wrapper>
  );
}
