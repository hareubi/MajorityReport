import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { styled } from "styled-components";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

interface Issue {
  id: string;
  name: string;
  text: string;
  creationTime: number;
  username: string;
  uid: number;
  file?: string;
}
const IssueWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid #586e75;
  border-radius: 10px;
`;
export default function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const fetchIssues = async () => {
    const issueQuery = query(
      collection(db, "issues"),
      orderBy("creationTime", "desc")
    );
    const snapshot = await getDocs(issueQuery);
    const newIssues = snapshot.docs.map((doc) => {
      const { name, text, creationTime, username, uid, file } = doc.data();
      return {
        id: doc.id,
        name: name,
        text: text,
        creationTime: creationTime,
        username: username,
        uid: uid,
        file: file,
      };
    });
    setIssues(newIssues);
  };
  useEffect(() => {
    fetchIssues();
  }, []);
  return (
    <IssueWrapper>
      {issues.map((issue) => (
        <Issue key={issue.id} {...issue} />
      ))}
    </IssueWrapper>
  );
}

const Column = styled.div``;
const Username = styled.div`
  font-weight: 600;
  font-size: 18px;
`;
const Name = styled.div`
  font-weight: 600;
  font-size: 30px;
`;
const Description = styled.div`
  margin: 10px 0px;
  font-size: 18px;
`;
const File = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;
const CreationTime = styled.div``;
export function Issue({ name, text, creationTime, username, file }: Issue) {
  return (
    <Column>
      <Name>{name}</Name>
      <CreationTime>{creationTime}</CreationTime>
      <Username>{username}</Username>
      <Description>{text}</Description>
      {file ? <File src={file} /> : null}
    </Column>
  );
}
