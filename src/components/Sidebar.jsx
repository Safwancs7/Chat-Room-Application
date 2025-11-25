// src/components/Sidebar.jsx
import RoomList from "./RoomList";

export default function Sidebar({
  user,
  activeRoomId,
  setActiveRoomId,
  setActiveRoomName,
  onLogout,
}) {
  return (
    <aside className="sidebar">
      <header className="sidebar-header">
  <div className="sidebar-user">
    <div className="user-info">
      <img src={user.photoURL} alt={user.displayName} />
      <div>
        <p className="user-name">{user.displayName}</p>
        <p className="user-email">{user.email}</p>
      </div>
    </div>

    {/* ✅ Proper clickable logout button */}
    <button
      type="button"
      className="logout-btn"
      onClick={() => {
        console.log("LOGOUT CLICKED");
        onLogout();
      }}
    >
      Logout
    </button>
  </div>
</header>
      <RoomList
        activeRoomId={activeRoomId}
        setActiveRoomId={setActiveRoomId}
        setActiveRoomName={setActiveRoomName}
        user={user}
      />
    </aside>
  );
}
