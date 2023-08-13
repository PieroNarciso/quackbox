import { trpc } from "@/server/util";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "world" });
  if (!hello.data) return <div>Loading...</div>;

  return <main>{hello.data.greeting}</main>;
}
