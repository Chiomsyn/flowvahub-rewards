interface Props {
  title: string;
  value: number;
}

export default function StatCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-600">{title}</h4>
        <span className="text-primary-600 font-bold text-lg">{value}</span>
      </div>

      <button className="mt-4 text-sm text-primary-600 font-medium flex items-center gap-1">
        View {title.toLowerCase()} →
      </button>
    </div>
  );
}
