import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPassenger } from '../api/passengers';
import Navbar from '../components/Navbar';

export default function PassengerDetail() {
  const { id } = useParams();
  const { data: passenger, isLoading } = useQuery(['passenger', id], () => fetchPassenger(id));

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!passenger) return <p className="text-center mt-10">Not found</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h2 className="text-xl font-semibold mb-4">Passenger Detail</h2>
        <pre className="bg-slate-100 p-4 rounded shadow">{JSON.stringify(passenger, null, 2)}</pre>
      </div>
    </div>
  );
}
