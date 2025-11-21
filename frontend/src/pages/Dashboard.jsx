// pages/Dashboard.jsx
import { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiDollarSign, FiPieChart, FiTrendingUp, FiClock, FiArrowRight } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

// Optional: Skeleton loader component
const Skeleton = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savings, setSavings] = useState({ balance: 0 });
  const [loans, setLoans] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !loading) navigate("/login");
  }, [user, navigate, loading]);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [savingsRes, loansRes] = await Promise.all([
        api.get("/savings"),
        api.get("/loans")
      ]);

      setSavings(savingsRes.data || { balance: 0 });
      setLoans(loansRes.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard data");
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  const activeLoans = loans.filter((l) => l.status === "disbursed").length;
  const totalBorrowed = loans.reduce((sum, l) => sum + (l.amount || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 p-8">
        <Skeleton className="h-12 w-64 mb-6" />
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold"
          onClick={fetchData}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 p-8">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, <span className="text-primary-600">{user.name}!</span>
        </h1>
        <p className="text-gray-600">Here's your financial overview today.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <FiPieChart className="text-4xl mb-2 text-primary-500" />
          <h3 className="font-semibold text-gray-600">Savings Balance</h3>
          <p className="text-2xl font-bold">{`KES ${savings.balance.toLocaleString()}`}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <FiDollarSign className="text-4xl mb-2 text-green-500" />
          <h3 className="font-semibold text-gray-600">Active Loans</h3>
          <p className="text-2xl font-bold">{activeLoans}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <FiTrendingUp className="text-4xl mb-2 text-purple-500" />
          <h3 className="font-semibold text-gray-600">Total Borrowed</h3>
          <p className="text-2xl font-bold">{`KES ${totalBorrowed.toLocaleString()}`}</p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Link to="/apply-loan">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 rounded-2xl text-white shadow-lg cursor-pointer"
          >
            <FiDollarSign className="text-5xl mb-2" />
            <h3 className="font-bold text-xl mb-1">Apply for Loan</h3>
            <p className="text-white/80 mb-2">Get funding for your business growth</p>
            <div className="flex items-center font-semibold">
              Apply Now <FiArrowRight className="ml-2" />
            </div>
          </motion.div>
        </Link>

        <Link to="/savings">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg cursor-pointer"
          >
            <FiPieChart className="text-5xl mb-2" />
            <h3 className="font-bold text-xl mb-1">Manage Savings</h3>
            <p className="text-white/80 mb-2">Deposit or withdraw funds securely</p>
            <div className="flex items-center font-semibold">
              Go to Savings <FiArrowRight className="ml-2" />
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Loans Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold mb-4">Your Loans</h2>
        {loans.length === 0 ? (
          <p className="text-gray-500">No loans yet. Start your first loan application.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4">Amount</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 font-bold">{`KES ${loan.amount.toLocaleString()}`}</td>
                    <td className="p-4">{loan.purpose}</td>
                    <td className="p-4">{loan.duration} months</td>
                    <td className="p-4 capitalize">{loan.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
