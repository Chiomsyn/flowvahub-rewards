import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        className,
        "rounded-2xl hover:scale-[103%] hover:shadow-md transition-all bg-white shadow-sm"
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  icon,
  title,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  className: string;
}) {
  return (
    <div
      className={cn(
        className,
        "flex items-center rounded-t-2xl gap-2 p-6 text-sm font-medium text-gray-700"
      )}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
}
