export default function CustomerMeetings({customerMeetings}: any) {
    return (
        <div className="mt-6">
            <h3 className="font-bold text-gray-800 mb-4">Meetings</h3>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-green-500 text-white">
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Rating</th>
                        <th className="py-2 px-4 border-b">Comment</th>
                        <th className="py-2 px-4 border-b">Source</th>
                    </tr>
                </thead>
                <tbody>
                    {customerMeetings.length > 0 ? (
                        customerMeetings.map((meeting, index) => (
                            <tr key={index} className="bg-gray-100 even:bg-gray-200">
                                <td className="py-2 px-4 border-b text-black text-center">
                                    {meeting.date}
                                </td>
                                <td className="py-2 px-4 border-b text-black text-center">
                                    {meeting.rating}
                                </td>
                                <td className="py-2 px-4 border-b text-black text-center">
                                    {meeting.comment}
                                </td>
                                <td className="py-2 px-4 border-b text-black text-center">
                                    {meeting.source}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="py-4 text-center text-gray-500">
                                No meeting history available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}