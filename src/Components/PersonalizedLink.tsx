import Link from "next/link";

export default function PersonalizedLink({
  path,
  text,
}: {
  path: string;
  text: string;
}) {
  return (
    <Link
      href={path}
      className="w-full flex items-center justify-center mt-5 p-1 hover:text-linkHover text-link transition-colors duration-50 select-none"
    >
      {text}
    </Link>
  );
}
