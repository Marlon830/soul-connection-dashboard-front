export default function EventsList({ eventsData, setSelectedLocation }: { eventsData: Event[], setSelectedLocation: Function }) {
  if (!eventsData) return null;
  return (
    <div className="w-96 overflow-y-auto max-h-screen pl-4">
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      {eventsData.map((event) => (
        <div
          key={event.id}
          onClick={() => setSelectedLocation([parseFloat(event.location_x), parseFloat(event.location_y)])}
          className="bg-white shadow-md rounded-lg mb-4 p-4 border border-gray-200 cursor-pointer transition transform hover:scale-105"
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-600">{event.location_name}</p>
              <p className="text-gray-600">Max participants: {event.max_participants}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
