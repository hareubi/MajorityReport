import styled from "styled-components";
import Draw from "../../components/Draw/draw.tsx";
import { useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.ts";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 20px 0px 0px;
`;
const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  background-color: #eee8d5;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const AttachFileButton = styled.label`
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid;
  font-size: 14px;
  font-weight: 500;
`;
const SubmitButton = styled.button``;
const DrawingArea = styled.div``;
export default function PostIssue() {
  const [issueName, setIssueName] = useState("");
  const [issueText, setIssueText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setUploading] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    switch (e.target.name) {
      case "issue-name":
        setIssueName(e.target.value);
        break;
      case "issue-text":
        setIssueText(e.target.value);
        break;
    }
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target ?? null;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onIssueSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (
      !user ||
      isUploading ||
      issueName.trim() === "" ||
      issueText.trim() === ""
    )
      return;
    setUploading(true);
    const doc = await addDoc(collection(db, "issues"), {
      name: issueName,
      text: issueText,
      creationTime: Date.now(),
      username: user?.displayName ?? "anonymous",
      uid: user.uid,
    });
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        await updateDoc(doc, { file: reader?.result });
      };
    }
    setIssueName("");
    setIssueText("");
    setUploading(false);
  };
  return (
    <Form onSubmit={onIssueSubmit}>
      <TextArea
        placeholder="issue name"
        value={issueName}
        onChange={onChange}
        name="issue-name"
      ></TextArea>
      <TextArea
        placeholder="issue description"
        value={issueText}
        onChange={onChange}
        name="issue-text"
      ></TextArea>
      <AttachFileButton htmlFor="file">Add Image</AttachFileButton>
      <AttachFileInput
        type="file"
        id="file"
        accept="image/*"
        onChange={onFileChange}
      />
      <DrawingArea>
        <Draw />
      </DrawingArea>
      <SubmitButton>{isUploading ? "Uploading..." : "Submit"}</SubmitButton>
    </Form>
  );
}
