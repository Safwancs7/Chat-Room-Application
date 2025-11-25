// src/components/MessageList.jsx
import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import MessageBubble from "./MessageBubble";

export default function MessageList({ user, roomId }) {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const msgRef = collection(db, "rooms", roomId, "messages");
    const q = query(msgRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(list);
      // Scroll to bottom on new message
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    });

    return () => unsub();
  }, [roomId]);

  return (
    <div className="message-list">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} isOwn={m.uid === user.uid} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
