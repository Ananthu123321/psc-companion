export default function StatsCards() {
  return (
    <div className="grid md:grid-cols-4 gap-6 mt-12">

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-gray-500 text-sm">
          Current Streak
        </h2>

        <p className="text-3xl font-bold text-orange-500 mt-2">
          7 Days
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-gray-500 text-sm">
          Quiz Accuracy
        </h2>

        <p className="text-3xl font-bold text-green-600 mt-2">
          82%
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-gray-500 text-sm">
          Notes Added
        </h2>

        <p className="text-3xl font-bold text-purple-600 mt-2">
          24
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-gray-500 text-sm">
          Daily Quiz Score
        </h2>

        <p className="text-3xl font-bold text-blue-600 mt-2">
          8/10
        </p>
      </div>

    </div>
  );
}