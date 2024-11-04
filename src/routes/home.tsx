import { auth } from "../firebase";

export default function Profile() {
  function logOut(): void {
    auth.signOut();
  }

  return (
    <h1>
      <button onClick={logOut}>logout</button>
    </h1>
  );
}
