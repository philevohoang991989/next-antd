
export default function ParallelLayout({
    children,
    team,
    user,
  }: {
    children: React.ReactNode
    team: React.ReactNode
    user: React.ReactNode
  }) {
    return <div className="bg-[#e5f9ff]">{children} {team}
    {user}</div>;
  }
  