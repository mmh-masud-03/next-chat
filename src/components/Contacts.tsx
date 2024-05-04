"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Contacts() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const { data: session } = useSession();
  console.log(contacts);
  const currentUser = session?.user;
  const getAllContacts = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      const filterdContacts = data.filter(
        (contact) => contact._id !== currentUser?._id
      );
      setContacts(filterdContacts);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (currentUser) getAllContacts();
  }, [currentUser]);
  return (
    <div className="create-chat-container">
      <input
        type="text"
        placeholder="Search contacts....."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Contacts;
