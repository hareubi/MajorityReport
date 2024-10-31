import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import Loading from "./components/loading";

const GlobalStyle = createGlobalStyle`
${reset};
*
{
  box-sizing:border-box;
}
body
{
background-color: black;
color:white;
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SegoeUI'
, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
sans-serif
}

`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const init = async () => {
    setTimeout(() => setIsLoaded(true), 2000);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <GlobalStyle />
      {isLoaded ? <RouterProvider router={router} /> : <Loading />}
    </>
  );
}

export default App;
