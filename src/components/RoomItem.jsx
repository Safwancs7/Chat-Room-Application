// src/components/RoomItem.jsx
import { formatDistanceToNow } from "date-fns";

export default function RoomItem({ room, isActive, onSelect }) {
  const lastTime = room.lastMessageAt?.toDate
    ? room.lastMessageAt.toDate()
    : null;

  return (
    <button
      className={`room-item ${isActive ? "active" : ""}`}
      onClick={onSelect}
    >
      <div className="room-avatar">
        {room.name
          .split(" ")
          .map((w) => w[0]?.toUpperCase())
          .slice(0, 2)
          .join("")}
      </div>
      <div className="room-meta">
        <div className="room-top">
          <span className="room-name">{room.name}</span>
          {lastTime && (
            <span className="room-time">
              {formatDistanceToNow(lastTime, { addSuffix: true })}
            </span>
          )}
        </div>
        <p className="room-last-msg">
          {room.lastMessageText || "No messages yet"}
        </p>
      </div>
    </button>
  );
}
