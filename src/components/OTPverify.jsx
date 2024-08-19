// OTPVerify.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { verifyOTP, resendOTP, clearError, verifyForgetPasswordOTP } from "../store/authSlice";
import { toast } from "react-toastify";

const OTPVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector((state) => state.auth || {});
  
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const purpose = location.state?.purpose || 'signup';

  useEffect(() => {
    const storedEmail = localStorage.getItem(purpose === "resetPassword" ? "resetEmail" : "signupEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate(purpose === "resetPassword" ? "/forget-password" : "/signup");
    }

    return () => {
      dispatch(clearError());
    };
  }, [navigate, dispatch, purpose]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = purpose === 'resetPassword' ? verifyForgetPasswordOTP : verifyOTP
    dispatch(action({ otp, email }))
      .unwrap()
      .then(() => {
        if (purpose === 'resetPassword') {
          navigate("/reset-password");
        } else {
          toast.success("Account created successfully");
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error(err.message || "OTP verification failed");
      });
  };

  const handleResendOTP = () => {
    if (canResend) {
      dispatch(resendOTP({ email }))
        .unwrap()
        .then(() => {
          toast.info("New OTP sent to your email");
          setTimer(60);
          setCanResend(false);
        })
        .catch((err) => {
          toast.error(err.message || "Failed to resend OTP");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-2xl font-extrabold">
            <span className="text-gray-400 drop-shadow-md">Tech</span>
            <span className="text-black-600 drop-shadow-md">Care</span>
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Verify Your Email
          </h2>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="otp" className="sr-only">
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
              disabled={isLoading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <IoCheckmarkCircleOutline
                  className="h-5 w-5 text-purple-300 group-hover:text-purple-200"
                  aria-hidden="true"
                />
              </span>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleResendOTP}
            className={`font-medium ${
              canResend
                ? "text-purple-600 hover:text-purple-500"
                : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!canResend || isLoading}
          >
            {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
