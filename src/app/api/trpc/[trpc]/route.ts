import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/_app";

const trpcHandler = (req: Request) => {
  return fetchRequestHandler({
    router: appRouter,
    req,
    endpoint: "/api/trpc",
    createContext: () => ({}),
  });
};

export { trpcHandler as GET, trpcHandler as POST };
