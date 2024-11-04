import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;
const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 15px;
  border-top: 1px inset #93a1a1;
  border-left: 1px inset #93a1a1;
  border-bottom: 4px inset #002b36;
  border-right: 4px inset #002b36;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
const TextButton = styled.a`
  margin-left: auto;
`;
const Title = styled.h1`
  font-size: 42px;
`;
const Error = styled.span`
  font-weight: 600;
  color: #dc322f;
`;

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isSignIn, setSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "" || isLoading) return;
    try {
      setLoading(true);
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const credentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(credentials.user, {
          displayName: name === "" ? email : name,
        });
      }
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
        if (e.message === "Firebase: Error (auth/invalid-credential).")
          setSignIn(false);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        {isSignIn ? null : (
          <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="name"
            type="text"
            required
          />
        )}
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading" : isSignIn ? "Login" : "CreateAccount"}
        />
        <TextButton
          onClick={() => {
            setSignIn(!isSignIn);
          }}
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </TextButton>
        {error !== "" ? <Error>{error}</Error> : null}
      </Form>
    </Wrapper>
  );
}
