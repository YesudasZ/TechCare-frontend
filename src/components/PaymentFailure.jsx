import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { errorMessage } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500 to-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">Payment Failed</h1>
      <p className="text-lg mb-8">{errorMessage || "Something went wrong with your payment. Please try again."}</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-red-500 px-6 py-3 rounded-lg flex items-center"
      >
        <FiArrowLeftCircle className="mr-2" /> Go Back
      </button>
    </div>
  );
};

export default PaymentFailure;
