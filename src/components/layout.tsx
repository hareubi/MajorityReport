import { Outlet } from "react-router";
import { auth } from "../firebase";
function logOut(): void {
  auth.signOut();
}
export default function Layout() {
  return (
    <>
      <h1>
        <button onClick={logOut}>logout</button>
      </h1>
      <Outlet />
    </>
  );
}
