// src/components/Layout.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function Layout({ user, onLogout }) {
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [activeRoomName, setActiveRoomName] = useState("");

  return (
    <div className="app-shell">
      <Sidebar
  user={user}
  activeRoomId={activeRoomId}
  setActiveRoomId={setActiveRoomId}
  setActiveRoomName={setActiveRoomName}
  onLogout={onLogout}
/>
      <ChatWindow
        user={user}
        roomId={activeRoomId}
        roomName={activeRoomName}
      />
    </div>
  );
}
