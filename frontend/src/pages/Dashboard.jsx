import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
 
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext.jsx';

import api from '../utils/api';
import { FiDollarSign, FiPieChart, FiTrendingUp, FiClock, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { AnimatedCard, StatCard, StatusBadge, Skeleton } from '../components/ModernComponents';
import toast from 'react-hot-toast';


const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const [savings, setSavings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [loansRes, savingsRes] = await Promise.all([
        api.get('/loans'),
        api.get('/savings'),
      ]);
      setLoans(loansRes.data);
      setSavings(savingsRes.data);
      toast.success('Dashboard loaded successfully!');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const activeLoans = loans.filter(l => l.status === 'disbursed').length;
  const totalBorrowed = loans.reduce((sum, l) => sum + l.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Skeleton className="h-32" count={3} />
          </div>
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="text-primary-600">{user?.name}!</span>
          </h1>
          <p className="text-gray-600">Here is what is happening with your finances today</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<FiPieChart />}
            title="Savings Balance"
            value={`KES ${savings?.balance?.toLocaleString() || 0}`}
            trend={12}
            delay={0}
          />
          <StatCard
            icon={<FiDollarSign />}
            title="Active Loans"
            value={activeLoans}
            delay={0.1}
          />
          <StatCard
            icon={<FiTrendingUp />}
            title="Total Borrowed"
            value={`KES ${totalBorrowed.toLocaleString()}`}
            delay={0.2}
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <Link to="/apply-loan">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white shadow-xl cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <FiDollarSign className="text-5xl mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">Apply for Loan</h3>
                <p className="text-primary-100 mb-4">Get funding for your business growth</p>
                <div className="flex items-center text-sm font-semibold">
                  <span>Apply Now</span>
                  <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          <Link to="/savings">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <FiPieChart className="text-5xl mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">Manage Savings</h3>
                <p className="text-blue-100 mb-4">Deposit or withdraw funds securely</p>
                <div className="flex items-center text-sm font-semibold">
                  <span>Go to Savings</span>
                  <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Recent Loans */}
        <AnimatedCard delay={0.4} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Loans</h2>
            {loans.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold"
              >
                {loans.length} Total
              </motion.span>
            )}
          </div>

          {loans.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="text-4xl text-gray-400" />
              </div>
              <p className="text-gray-500 mb-6">No loans yet. Ready to start?</p>
              <Link to="/apply-loan">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                >
                  Apply for Your First Loan
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Amount</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Purpose</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Duration</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan, index) => (
                    <motion.tr
                      key={loan._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-gray-900">
                        KES {loan.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-gray-600">{loan.purpose}</td>
                      <td className="py-4 px-4">
                        <span className="flex items-center text-gray-600">
                          <FiClock className="mr-2" />
                          {loan.duration} months
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={loan.status} />
                      </td>
                      <td className="py-4 px-4 font-semibold text-primary-600">
                        KES {loan.monthlyPayment?.toLocaleString() || 'N/A'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Dashboard;