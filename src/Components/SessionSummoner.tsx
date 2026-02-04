import { useUser } from "@/store/userStore";
import { useState } from "react";

export default function SessionSummoner() {
  const { user } = useUser();
  const [friendUsername, setFriendUsername] = useState("");

  const handleSendFriendRequest = async () => {
    setFriendUsername("");
  };

  return (
    <div className="absolute left-5 flex justify-center items-center w-100 h-7/10 my-20 bg-neutral-900 mx-10 rounded-4xl shadow-2xl overflow-hidden">
      <div className="relative bg-neutral-950 flex flex-col w-[92%] h-[95%] rounded-3xl p-6 text-neutral-200">
        <h2 className="text-2xl font-bold mb-4">Summoner Session</h2>

        <div className="mb-6 p-4 border border-neutral-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Send Friend Request</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Friend's username"
              className="grow p-2 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
            />
            <button
              onClick={handleSendFriendRequest}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>

        <div className="p-4 border border-neutral-700 rounded-lg grow">
          <h3 className="text-xl font-semibold mb-3">Friend List</h3>
          <p className="text-neutral-400">
            (Friend list will be implemented in the future)
          </p>
        </div>

        {user?.username && (
          <p className="mt-4 text-sm text-neutral-500">
            Logged In User: {user.username}
          </p>
        )}
      </div>
    </div>
  );
}
