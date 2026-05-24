"use client";

export default function ReminderCard() {

  const showNotification = async () => {

    if (!("Notification" in window)) {
      alert("Browser does not support notifications");
      return;
    }

    let permission = Notification.permission;

    if (permission !== "granted") {
      permission = await Notification.requestPermission();
    }

    if (permission === "granted") {

      new Notification("PSC Companion 📚", {
        body: "Time to study today's current affairs and quiz!",
        icon: "/next.svg",
      });

    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-blue-700">
        ⏰ Daily Reminder
      </h2>

      <p className="text-gray-600 mt-4">
        Enable reminders to stay consistent with preparation.
      </p>

      <button
        onClick={showNotification}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-6 hover:bg-blue-700 transition"
      >
        Enable Reminder
      </button>

    </div>
  );
}