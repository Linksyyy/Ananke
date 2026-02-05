import { socket, useSocket } from "@/lib/socket";
import { useUser } from "@/store/userStore";
import React, { useState } from "react";
import Tabs from "./Tabs";

export default function SessionSummoner({ hide }: { hide: boolean }) {
  const { user } = useUser();
  const [friendUsername, setFriendUsername] = useState("");
  const [friendRequest, setFriendRequest] = useState<string[]>([]);

  useSocket("friendship-receive", (senderUsername) => {
    const newRequestList = friendRequest;
    newRequestList.push(senderUsername);
    setFriendRequest(newRequestList);
  });

  const handleSendFriendRequest = (e: React.SubmitEvent) => {
    e.preventDefault();

    socket.emit("send-friend", friendUsername);

    setFriendUsername("");
  };
  const tabs = [
    {
      id: "send",
      label: "Send",
      content: (
        <div className="border border-neutral-700 rounded-lg h-full">
          <div className="flex w-full items-center justify-center pt-4">
            <h3 className="text-xl font-semibold mb-3">Send Friend Request</h3>
          </div>
          <form onSubmit={handleSendFriendRequest} className="flex gap-2 p-2">
            <input
              type="text"
              placeholder="Friend's username"
              className="grow p-2 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      ),
    },
    {
      id: "friends",
      label: "Friends",
      content: (
        <div className="border border-neutral-700 rounded-lg h-full grow">
          <div className="flex w-full items-center justify-center pt-4">
            <h3 className="text-xl font-semibold mb-3">Friend List</h3>
          </div>
          <p className="text-neutral-400">
            (Friend list will be implemented in the future)
          </p>
        </div>
      ),
    },
    {
      id: "sent",
      label: "Sent",
      content: (
        <div className="border border-neutral-700 rounded-lg h-full grow">
          <div className="flex w-full items-center justify-center pt-4">
            <h3 className="text-xl font-semibold mb-3">Sent Invites</h3>
          </div>
          <p className="text-neutral-400">
            (Sent invites will be implemented in the future)
          </p>
        </div>
      ),
    },
    {
      id: "requests",
      label: "Requests",
      content: (
        <div className="border border-neutral-700 rounded-lg h-full grow">
          <div className="flex w-full items-center justify-center pt-4">
            <h3 className="text-xl font-semibold mb-3">Friend Requests</h3>
          </div>
          {friendRequest.map((req, index) => (
            <p key={index} className="text-neutral-400">
              {req}
            </p>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div
      className={`absolute flex justify-center items-center w-100 h-7/10 my-20 bg-neutral-900 mx-10 rounded-4xl shadow-2xl overflow-hidden
    transition-all ease-in-out duration-300 ${hide ? "-left-120" : "left-5"}`}
    >
      <div className="relative bg-neutral-950 flex flex-col w-[92%] h-[95%] rounded-3xl p-6 text-neutral-200">
        <h2 className="text-2xl font-bold mb-4">Summoner Session</h2>
        <div className="grow">
          <Tabs tabs={tabs} />
        </div>
        {user?.username && (
          <p className="mt-4 text-sm text-neutral-500 self-end">
            Logged In User: {user.username}
          </p>
        )}
      </div>
    </div>
  );
}
