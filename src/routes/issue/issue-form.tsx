import styled from "styled-components";
import Draw from "../../components/Draw/draw.tsx";

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
  return (
    <Form>
      <TextArea placeholder="issue name"></TextArea>
      <TextArea placeholder="issue description"></TextArea>
      <AttachFileButton htmlFor="file">Add Image</AttachFileButton>
      <AttachFileInput type="file" id="file" accept="image/*" />
      <DrawingArea>
        <Draw />
      </DrawingArea>
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
}
