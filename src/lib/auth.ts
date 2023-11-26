import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({credentials});
        
        try {
            // Call your API with the provided credentials
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/auth/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            });
            if (response) {
              const user = await response.json();
              if(user?.statusCode){
                console.log(user.message);
              }else{
                return Promise.resolve(user);
              }
             
            } else {
              // Handle authentication failure
              return Promise.resolve(null);
            }
          } catch (error) {
            console.error('Error authenticating with API:', error);
            return Promise.resolve(null);
          }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        return {
          ...token,
          access_token: user.access_token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        token: token.access_token
      };
    },
  },
};
