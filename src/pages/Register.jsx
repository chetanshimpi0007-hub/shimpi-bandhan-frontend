import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { FaPhone, FaLock, FaUsers, FaSpinner, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../services/api';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { accountType: 'SELF' }
  });
  const accountType = watch('accountType');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');
    try {
      const payload = {
        phone: data.phone,
        password: data.password,
        community: data.community,
        role: 'USER', // Hardcoded as user registration
        accountType: data.accountType,
      };

      if (data.accountType === 'FAMILY') {
        payload.familyDetails = {
          relationshipWithCandidate: data.relationship,
          familyMemberName: data.familyName,
          mobileNumber: data.familyMobile,
          email: data.familyEmail,
          whatsappNumber: data.familyWhatsapp,
        };
      }

      await api.post('/auth/register', payload);
      
      setSuccess(true);
    } catch (error) {
      if (error.response?.data) {
        const data = error.response.data;
        if (data.error) {
          setApiError(data.error);
        } else if (typeof data === 'object') {
          // Validation error map
          const firstError = Object.values(data)[0];
          setApiError(firstError || 'Registration failed. Please check your inputs.');
        } else {
          setApiError('Registration failed. Please try again.');
        }
      } else {
        setApiError('Network Error. Could not reach the server.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl text-center border border-gray-100">
          <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Registration Successful</h2>
          <p className="text-gray-600 mb-6">
            Your account has been created successfully. Your profile is currently <span className="font-bold text-orange-500">PENDING</span> admin approval.
            You will be notified once an admin verifies and approves your account.
          </p>
          <Link
            to="/login"
            className="w-full inline-flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[var(--color-primary)] hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] shadow-md transition-all"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[url('/auth-bg.png')] bg-cover bg-center relative overflow-y-auto">
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm fixed"></div>
      <div className="max-w-md w-full space-y-6 sm:space-y-8 bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-2xl border border-white/20 relative z-10 my-8">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]"></div>
        <div>
          <h2 className="mt-2 text-center text-3xl font-serif font-bold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join the exclusive Shimpi Bandhan community
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {apiError && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
              {apiError}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register("phone", { 
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit mobile number"
                    }
                  })}
                  className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm bg-gray-50 transition-all"
                  placeholder="9876543210"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUsers className="text-gray-400" />
                </div>
                <select
                  {...register("accountType", { required: "Please select account type" })}
                  className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm bg-gray-50 transition-all text-gray-700"
                >
                  <option value="SELF">Self Managed</option>
                  <option value="FAMILY">Family Managed</option>
                </select>
              </div>
              {errors.accountType && <p className="text-red-500 text-xs mt-1">{errors.accountType.message}</p>}
            </div>

            {accountType === 'FAMILY' && (
              <div className="space-y-4 border-l-2 border-[var(--color-primary)] pl-4 ml-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship with Candidate</label>
                  <select
                    {...register("relationship", { required: "Relationship is required for family accounts" })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm bg-gray-50 text-gray-700"
                  >
                    <option value="">Select Relationship</option>
                    <option value="FATHER">Father</option>
                    <option value="MOTHER">Mother</option>
                    <option value="BROTHER">Brother</option>
                    <option value="SISTER">Sister</option>
                    <option value="UNCLE">Uncle</option>
                    <option value="AUNT">Aunt</option>
                    <option value="GUARDIAN">Guardian</option>
                    <option value="RELATIVE">Relative</option>
                  </select>
                  {errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Family Member Name</label>
                  <input
                    type="text"
                    {...register("familyName", { required: "Name is required" })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm bg-gray-50"
                    placeholder="Full Name"
                  />
                  {errors.familyName && <p className="text-red-500 text-xs mt-1">{errors.familyName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Family Mobile</label>
                  <input
                    type="text"
                    {...register("familyMobile", { 
                      required: "Mobile is required",
                      pattern: { value: /^[0-9]{10}$/, message: "Valid 10-digit number required" }
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm bg-gray-50"
                    placeholder="9876543210"
                  />
                  {errors.familyMobile && <p className="text-red-500 text-xs mt-1">{errors.familyMobile.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Family Email (Optional)</label>
                  <input
                    type="email"
                    {...register("familyEmail")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm bg-gray-50"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Family WhatsApp (Optional)</label>
                  <input
                    type="text"
                    {...register("familyWhatsapp")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm bg-gray-50"
                    placeholder="WhatsApp Number"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Community</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUsers className="text-gray-400" />
                </div>
                <select
                  {...register("community", { required: "Please select your community" })}
                  className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm bg-gray-50 transition-all text-gray-700"
                >
                  <option value="">Select Community</option>
                  <option value="AHER_SHIMPI">Aher Shimpi</option>
                  <option value="NAMDEV_SHIMPI">Namdev Shimpi</option>
                </select>
              </div>
              {errors.community && <p className="text-red-500 text-xs mt-1">{errors.community.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className="pl-10 pr-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm bg-gray-50 transition-all"
                  placeholder="••••••••"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  {...register("terms", { required: "You must agree to the terms and privacy policy" })}
                  className="focus:ring-[var(--color-primary)] h-4 w-4 text-[var(--color-primary)] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the <a href="#" className="text-[var(--color-primary)] hover:underline">Terms of Service</a> and <a href="#" className="text-[var(--color-primary)] hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>
            {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[var(--color-primary)] hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <FaSpinner className="animate-spin h-5 w-5" />
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <Link to="/login" className="font-medium text-[var(--color-primary)] hover:text-blue-900">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
