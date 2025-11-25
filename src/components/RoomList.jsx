// src/components/RoomList.jsx
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import RoomItem from "./RoomItem";

export default function RoomList({
  activeRoomId,
  setActiveRoomId,
  setActiveRoomName,
  user,
}) {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "rooms"),
      orderBy("lastMessageAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRooms(list);
    });

    return () => unsub();
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const name = newRoomName.trim();
    if (!name) return;

    const docRef = await addDoc(collection(db, "rooms"), {
      name,
      createdAt: serverTimestamp(),
      createdBy: user.uid,
      lastMessageText: "Room created",
      lastMessageAt: serverTimestamp(),
    });

    setNewRoomName("");
    setActiveRoomId(docRef.id);
    setActiveRoomName(name);
  };

  return (
    <div className="room-list">
      <div className="room-list-header">
        <h2>Rooms</h2>
      </div>

      <form onSubmit={handleCreateRoom} className="room-form">
        <input
          type="text"
          placeholder="Create new room..."
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button className="btn small" type="submit">
          +
        </button>
      </form>

      <div className="room-items">
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            room={room}
            isActive={room.id === activeRoomId}
            onSelect={() => {
              setActiveRoomId(room.id);
              setActiveRoomName(room.name);
            }}
          />
        ))}

        {rooms.length === 0 && (
          <p className="muted">No rooms yet. Create the first one!</p>
        )}
      </div>
    </div>
  );
}
