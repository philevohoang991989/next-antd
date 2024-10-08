// import {AuthOptions} from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// const auth: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: {type: 'text'},
//         password: {type: 'password'}
//       },
//       authorize(credentials) {
//         if (
//           credentials?.username === 'admin' &&
//           credentials.password === 'admin'
//         ) {
//           return {id: '1', name: 'admin'};
//         }

//         return null;
//       }
//     })
//   ]
// };

// export default auth;


import axios from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const auth: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        otp: { label: "otp", type: "text", placeholder: "otp" },
        userId:{ label: "otp", type: "number", placeholder: "otp" },
      },
      async authorize(credentials) {
        try {
          // Call your API to validate credentials
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}Authentication/otp/valid`,credentials
          );

          if (response && response.data) {
            const user = response.data;
            console.log({ user });
            return Promise.resolve(user);
          } else {
            // Handle authentication failure
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log({ callbacksuser: user });
      if (user) {
        return {
          ...user,
          token: user.token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        token: token.token,
      };
    },
  },
};

export default auth;