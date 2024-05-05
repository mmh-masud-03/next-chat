"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import ChatBox from "./ChatBox";

function ChatList() {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const getAllChats = async () => {
    try {
      const res = await fetch(
        search !== ""
          ? `/api/users/${currentUser?._id}/searchChat/${search}`
          : `/api/users/${currentUser?._id}`
      );
      const data = await res.json();
      setChats(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) getAllChats();
  }, [currentUser, search]);
  return loading ? (
    <Loader />
  ) : (
    <div className="chat-list">
      <input
        type="text"
        className="input-search"
        placeholder="Search chat...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="chats">
        {chats?.map((chat, index) => (
          <ChatBox key={index} chat={chat} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
