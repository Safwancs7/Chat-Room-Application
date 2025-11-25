// src/components/TypingIndicator.jsx
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

export default function TypingIndicator({ roomId }) {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const ref = collection(db, "rooms", roomId, "typing");

    const unsub = onSnapshot(ref, (snap) => {
      const now = Date.now();
      const list = snap.docs
        .map((d) => d.data())
        // filter out very old entries (basic)
        .filter((t) => t.updatedAt?.toDate && now - t.updatedAt.toDate() < 4000)
        .map((t) => t.displayName);

      setNames(list);
    });

    return () => unsub();
  }, [roomId]);

  if (!names.length) return <p className="typing-muted">Online chat</p>;

  const label =
    names.length === 1
      ? `${names[0]} is typing...`
      : `${names[0]} and ${names.length - 1} others are typing...`;

  return <p className="typing">{label}</p>;
}
