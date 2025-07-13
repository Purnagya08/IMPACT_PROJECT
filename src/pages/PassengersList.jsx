import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPassengers, flagPassenger } from '../api/passengers';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function PassengersList() {
  const queryClient = useQueryClient();
  const { 
    data: passengers = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery({ 
    queryKey: ['passengers'], 
    queryFn: fetchPassengers 
  });

  const flagMutation = useMutation({ 
    mutationFn: flagPassenger,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['passengers'] }),
  });


  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        {isLoading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : isError ? (
          <p className="text-red-600">Error: {error.message}</p>
        ) : passengers.length === 0 ? (
          <p>No passengers found.</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">All Passengers</h2>
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Passport</th>
                  <th className="p-3">Flag?</th>
                  <th className="p-3">Detail</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((p) => (
                  <tr key={p._id} className="border-t">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.passportNumber}</td>
                    <td className="p-3">
                      {p.isFlagged ? (
                        <span className="text-green-600">✅</span>
                      ) : (
                        <button
                          className="text-sm text-red-600 hover:underline disabled:opacity-50"
                          onClick={() => flagMutation.mutate(p._id)}
                          disabled={flagMutation.isLoading}
                          aria-label={`Flag passenger ${p.name}`}
                        >
                          {flagMutation.isLoading ? 'Processing...' : 'Flag'}
                        </button>
                      )}
                    </td>
                    <td className="p-3">
                      <Link 
                        className="text-blue-600 hover:underline" 
                        to={`/passengers/${p._id}`}
                        aria-label={`View details for ${p.name}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}