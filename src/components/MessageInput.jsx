// src/components/MessageInput.jsx
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function MessageInput({ user, roomId }) {
  const [text, setText] = useState("");

  // Typing indicator: write small doc per room+user
  const handleTyping = async () => {
    const typingRef = doc(db, "rooms", roomId, "typing", user.uid);
    await setDoc(
      typingRef,
      {
        displayName: user.displayName,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  useEffect(() => {
    if (!text) return;

    const timeout = setTimeout(() => {
      // clear typing after some idle time (optional)
    }, 3000);

    return () => clearTimeout(timeout);
  }, [text]);

  const handleSend = async (e) => {
    e.preventDefault();
    const msg = text.trim();
    if (!msg) return;

    const msgRef = collection(db, "rooms", roomId, "messages");
    await addDoc(msgRef, {
      text: msg,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      isSystem: false,
    });

    // Update room last message
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, {
      lastMessageText: msg,
      lastMessageAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <form className="message-input" onSubmit={handleSend}>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          handleTyping();
        }}
      />
      <button className="btn primary" type="submit">
        Send
      </button>
    </form>
  );
}
