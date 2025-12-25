export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-white p-6 shadow-sm">{children}</div>;
}

export function CardHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {icon}
      <span>{title}</span>
    </div>
  );
}
