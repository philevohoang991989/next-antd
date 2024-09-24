'use client'

import { SessionProvider, getSession } from 'next-auth/react'
import { ReactNode, useEffect, useState } from 'react'

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState<string | null>(null);

  // Fetch session and extract token if needed
  useEffect(() => {
    const fetchToken = async () => {
      const session = await getSession();
      if (session && session.token) {
        setToken(session.token as string);
      }
    };

    fetchToken();
  }, []);

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

export default Providers;