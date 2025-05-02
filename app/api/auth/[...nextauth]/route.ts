import NextAuth from "next-auth";
import { authOptions } from "@/app/@core/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
