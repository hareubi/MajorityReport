import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import CreateAccount from "./routes/join";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import Loading from "./components/loading";
import { auth } from "./firebase";
import styled from "styled-components";
import ProtectedRoute from "./components/protected-route";
import Profile from "./routes/home";

const GlobalStyle = createGlobalStyle`
${reset};
*
{
  box-sizing:border-box;
}
  body
{
  background-color: #fdf6e3;
  color:#002b36;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SegoeUI'
  , Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
  sans-serif
}
`;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/join",
    element: <CreateAccount />,
  },
]);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const init = async () => {
    await auth.authStateReady();
    setIsLoaded(true);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyle />
      {isLoaded ? <RouterProvider router={router} /> : <Loading />}
    </Wrapper>
  );
}

export default App;
