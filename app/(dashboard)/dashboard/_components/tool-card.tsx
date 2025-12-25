export default function ToolCard({ name }: { name: string }) {
  return (
    <div className="min-w-[140px] h-20 bg-gray-50 rounded-xl flex items-center justify-center font-medium text-sm shadow-sm">
      {name}
    </div>
  );
}
