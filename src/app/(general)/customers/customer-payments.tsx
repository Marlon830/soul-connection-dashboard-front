export default function CustomerPayments({ customerPayments}: any) {
    return (
        <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="font-bold text-gray-800 mb-4">Payments</h3>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Amount</th>
                        <th className="py-2 px-4 border-b">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {customerPayments.length > 0 ? (
                        customerPayments.map((payment, index) => (
                            <tr key={index} className="bg-gray-100 even:bg-gray-200">
                                <td className="py-2 px-4 border-b text-black text-center">
                                    {payment.date}
                                </td>
                                <td className="py-2 px-4 border-b text-black text-center">
                                    €{payment.amount.toFixed(2)}
                                </td>
                                <td className="py-2 px-4 border-b text-black text-center">
                                    {payment.comment}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="py-4 text-center text-gray-500">
                                No payment history available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}