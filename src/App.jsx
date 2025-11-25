// src/App.jsx
import { useAuth } from "./hooks/useAuth";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import Layout from "./components/Layout";

export default function App() {
  const { user, loading } = useAuth();

  const handleLogin = async () => {
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="app-center">
        <div className="loader" />
        <p>Loading chat...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-center">
        <div className="card">
          <h1>Welcome to React Rooms</h1>
          <p>Join real-time chat rooms with Google sign-in.</p>
          <button className="btn primary" onClick={handleLogin}>
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return <Layout user={user} onLogout={handleLogout} />;
}
