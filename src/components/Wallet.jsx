import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const [balanceRes, transactionsRes] = await Promise.all([
          axios.get('/auth/wallet-balance'),
          axios.get('/auth/wallet-transactions')
        ]);
        setBalance(balanceRes.data.balance);
        setTransactions(transactionsRes.data.transactions);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch wallet data');
        setLoading(false);
        console.log(err)
      }
    };

    fetchWalletData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-500 to-black pt-20 pb-12 px-4 sm:px-6  lg:px-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl my-20 mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8 my-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Wallet</h1>
            <WalletIcon className="w-10 h-10 text-blue-500" />
          </div>
          <div className="bg-blue-100 rounded-lg p-6 mb-8">
            <p className="text-lg text-gray-600 mb-2">Current Balance</p>
            <p className="text-4xl font-bold text-blue-600">${balance.toFixed(2)}</p>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center">
                  {transaction.type === 'credit' ? (
                    <ArrowUpCircle className="w-6 h-6 text-green-500 mr-3" />
                  ) : (
                    <ArrowDownCircle className="w-6 h-6 text-red-500 mr-3" />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Wallet;