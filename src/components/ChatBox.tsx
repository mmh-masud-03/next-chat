import { format } from "date-fns";
import { useRouter } from "next/navigation";
function ChatBox({ chat, currentUser }) {
  const otherMembers = chat.members.filter(
    (member) => member._id !== currentUser._id
  );
  const lastMessage =
    chat?.messages?.length > 0 && chat?.messages[chat?.messages.length - 1];
  const router = useRouter();
  return (
    <div className="chat-box" onClick={() => router.push(`/chats/${chat._id}`)}>
      <div className="chat-info">
        {chat?.isGroup ? (
          <img
            src={chat?.groupPhoto || "/assets/group.png"}
            alt="group photo"
            className="profilePhoto"
          />
        ) : (
          <img
            src={otherMembers[0].profileImage || "/assets/user.jpg"}
            alt="profile photo"
            className="profilePhoto"
          />
        )}
        <div className="flex flex-col gap-1">
          {chat?.isGroup ? (
            <p className="text-base-bold">{chat?.name}</p>
          ) : (
            <p className="text-base-bold">{otherMembers[0].username}</p>
          )}
          {!lastMessage && <p className="text-small-bold">Started a chat</p>}
        </div>
      </div>
      <div>
        <p className="text-base-light text-gray-3">
          {!lastMessage && format(new Date(chat?.createdAt), "p")}
        </p>
      </div>
    </div>
  );
}

export default ChatBox;
