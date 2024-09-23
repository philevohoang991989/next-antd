
export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className="bg-[#e5f9ff]">{children}</div>;
  }
  