import { useMutation } from '@tanstack/react-query';
import { sendVisaExpiryAlerts } from '../api/communication';
import Navbar from '../components/Navbar';

export default function SendAlertsPage() {
  const mutation = useMutation({
    mutationFn: sendVisaExpiryAlerts,
    onSuccess: () => {
      // Reset success message after 5 seconds
      const timer = setTimeout(() => mutation.reset(), 5000);
      return () => clearTimeout(timer);
    }
  });

  const handleSendAlerts = () => {
    if (window.confirm('Are you sure you want to send visa expiry alerts to all affected passengers?')) {
      mutation.mutate();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6">Send Visa Expiry Alerts</h2>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              This will send email notifications to all passengers whose visas are expiring within the next 30 days.
            </p>
            
            <button
              className={`bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors
                ${mutation.isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={handleSendAlerts}
              disabled={mutation.isLoading}
              aria-busy={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Alerts...
                </span>
              ) : 'Send Alerts'}
            </button>
          </div>

          {mutation.isSuccess && (
            <div className="p-4 mb-4 bg-green-100 border-l-4 border-green-500 text-green-700">
              <p>✓ Alerts sent successfully to affected passengers!</p>
            </div>
          )}

          {mutation.isError && (
            <div className="p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p className="font-medium">Failed to send alerts:</p>
              <p>{mutation.error.response?.data?.error || mutation.error.message || 'An unknown error occurred'}</p>
              <button
                className="mt-2 text-sm text-red-700 hover:underline"
                onClick={() => mutation.reset()}
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}