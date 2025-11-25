// src/components/MessageBubble.jsx
import { format } from "date-fns";

export default function MessageBubble({ message, isOwn }) {
  const time = message.createdAt?.toDate
    ? format(message.createdAt.toDate(), "HH:mm")
    : "";

  const bubbleClass = message.isSystem
    ? "msg-bubble system"
    : isOwn
    ? "msg-bubble own"
    : "msg-bubble";

  return (
    <div className={`msg-row ${isOwn ? "own-row" : ""}`}>
      {!isOwn && !message.isSystem && (
        <img
          className="msg-avatar"
          src={message.photoURL}
          alt={message.displayName}
        />
      )}

      <div className={bubbleClass}>
        {!isOwn && !message.isSystem && (
          <p className="msg-author">{message.displayName}</p>
        )}
        <p className="msg-text">{message.text}</p>
        <span className="msg-time">{time}</span>
      </div>
    </div>
  );
}
