import { useUser } from "@/store/userStore";

export default function SessionSummoner() {
  const { user } = useUser()
  return (
    <div className="absolute left-5 flex justify-center items-center w-100 h-7/10 my-20 bg-neutral-900 mx-10 rounded-4xl shadow-2xl overflow-hidden">
      <div className="relative bg-neutral-950 flex flex-col w-[92%] h-[95%] rounded-3xl p-6 text-neutral-200">
        {user?.username}
      </div>
    </div>
  );
}
