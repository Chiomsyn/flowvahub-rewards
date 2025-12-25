export default function EmptyState() {
  return (
    <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
      <div className="mx-auto w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
        <span className="text-primary-600 text-2xl">📚</span>
      </div>

      <h3 className="font-semibold mb-2">No Tech Stacks Created</h3>
      <p className="text-sm text-gray-500 mb-6">
        Create your first tech stack by combining tools from your library.
      </p>

      <button className="px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition">
        + Create Tech Stack
      </button>
    </div>
  );
}
