import { Bell, Briefcase, Calendar, FileText } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: <Briefcase className="text-blue-500" size={18} />,
    text: "Applied for Frontend Developer at Google",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: <FileText className="text-green-500" size={18} />,
    text: "Profile updated successfully",
    time: "Yesterday",
  },
  {
    id: 3,
    icon: <Calendar className="text-purple-500" size={18} />,
    text: "Interview scheduled with Amazon",
    time: "3 days ago",
  },
  {
    id: 4,
    icon: <Bell className="text-yellow-500" size={18} />,
    text: "New job alert: React Developer",
    time: "1 week ago",
  },
];

export default function RecentActivities() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <ul className="space-y-3">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-start space-x-3 border-b last:border-none pb-2"
          >
            <div className="mt-1">{activity.icon}</div>
            <div>
              <p className="text-sm text-gray-700">{activity.text}</p>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
