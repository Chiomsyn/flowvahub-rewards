interface StreakCalendarProps {
  lastCheckinDate: string | null | undefined;
}

export default function StreakCalendar({
  lastCheckinDate,
}: StreakCalendarProps) {
  const getStreakDays = () => {
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    const today = new Date().getDay();

    return days.map((day, index) => {
      const adjustedIndex = index === 6 ? 0 : index + 1;
      const isToday = adjustedIndex === today;
      const hasCheckedIn =
        lastCheckinDate &&
        new Date(lastCheckinDate).toDateString() === new Date().toDateString();

      return {
        day,
        highlighted: isToday && hasCheckedIn,
        isToday,
      };
    });
  };

  const streakDays = getStreakDays();

  return (
    <div className="flex gap-2 mt-4">
      {streakDays.map(({ day, highlighted, isToday }, i) => (
        <div
          key={i}
          className={`h-9 w-9 flex items-center justify-center rounded-full text-sm font-medium ${
            highlighted
              ? "bg-primary-600 text-white"
              : isToday
              ? "bg-primary-100 text-primary-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
