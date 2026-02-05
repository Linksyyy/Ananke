import { useSocket } from "@/lib/socket";
import { useEffect, useState } from "react";

export default function Feedback() {
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(null);

  useSocket("feedback", (feedback) => {
    setIsError(feedback.isError);
    setMessage(feedback.message);
  });

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  });
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center py-3 px-10 text-white border border-black rounded-4xl
        ${isError ? "bg-red-700" : "bg-green-700"}
        transition-all duration-300 ease-in-out ${message ? "top-10" : "-top-20"}`}
    >
      {message}
    </div>
  );
}
