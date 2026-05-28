import CurrentAffairs
from "@/components/CurrentAffairs";

export default function
CurrentAffairsPage() {

  return (

    <main className="min-h-screen bg-blue-50 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-blue-700 mb-10">

          Daily Current Affairs

        </h1>

        <CurrentAffairs />

      </div>

    </main>

  );

}