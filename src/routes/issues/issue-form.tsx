import styled from "styled-components";
import Draw from "../../components/draw.tsx";
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
const ImagePreview = styled.img`
  width: 400px;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const AttachFileButton = styled.label`
  width: 150px;
  padding: 10px 0px;
  text-align: center;
  background-color: white;
  border-radius: 15px;
  border-top: 1px inset #93a1a1;
  border-left: 1px inset #93a1a1;
  border-bottom: 4px inset #002b36;
  border-right: 4px inset #002b36;
  font-size: 16px;
  cursor: pointer;
  &:active {
    border-top: 3px inset #002b36;
    border-left: 3px inset#002b36;
    border-bottom: 1px inset #93a1a1;
    border-right: 1px inset #93a1a1;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const DeleteButton = styled.button``;
const SubmitButton = styled.button``;
const DrawingArea = styled.div``;
export default function PostIssue() {
  const [issueName, setIssueName] = useState("");
  const [issueText, setIssueText] = useState("");
  const [file, setFile] = useState<string | null>(null);
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
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setFile(reader.result as string | null);
      };
    }
  };
  const onIssueSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
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
      await updateDoc(doc, { file });
    }
    setIssueName("");
    setIssueText("");
    setUploading(false);
  };
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
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
      <ImagePreview src={file ?? ""} />

      <Row>
        <AttachFileButton htmlFor="file">Add Image</AttachFileButton>
        <AttachFileInput
          type="file"
          id="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <DeleteButton>Delete Image</DeleteButton>
      </Row>
      <DrawingArea>
        <Draw
          onImageAdd={(image) => {
            setFile(image);
          }}
        />
      </DrawingArea>
      <SubmitButton onClick={onIssueSubmit}>
        {isUploading ? "Uploading..." : "Submit"}
      </SubmitButton>
    </Form>
  );
}
