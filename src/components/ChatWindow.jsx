// src/components/ChatWindow.jsx
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({ user, roomId, roomName }) {
  if (!roomId) {
    return (
      <main className="chat-window empty">
        <h2>Select a room to start chatting</h2>
        <p>Create a room from the sidebar or join an existing one.</p>
      </main>
    );
  }

  return (
    <main className="chat-window">
      <header className="chat-header">
        <div>
          <h2>{roomName}</h2>
          <TypingIndicator roomId={roomId} />
        </div>
      </header>

      <MessageList user={user} roomId={roomId} />
      <MessageInput user={user} roomId={roomId} />
    </main>
  );
}
