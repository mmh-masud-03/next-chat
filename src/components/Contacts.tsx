"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { RadioButtonUnchecked } from "@mui/icons-material";

function Contacts() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const { data: session } = useSession();
  console.log(contacts);
  const currentUser = session?.user;
  const getAllContacts = async () => {
    try {
      const res = await fetch(
        search !== "" ? `/api/users/searchContact/${search}` : "/api/users"
      );
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
  }, [currentUser, search]);
  return loading ? (
    <Loader />
  ) : (
    <div className="create-chat-container">
      <input
        type="text"
        placeholder="Search contacts....."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="contact-bar">
        <div className="contact-list">
          <p className="text-body-bold">Select or Diselect</p>
          {contacts.map((user, index) => (
            <div key={index} className="contact">
              <RadioButtonUnchecked />
              <img
                src={user.profileImage || "/assets/person.jpg"}
                alt="profile"
                className="profilePhoto"
              />
              <p className="text-base-bold">{user.username}</p>
            </div>
          ))}
        </div>
        <div className="create-chat">
          <button className="btn">Start a new chat</button>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
