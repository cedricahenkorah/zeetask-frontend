import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      return alert("Please fill in all the fields");
    }

    if (username.length < 4) {
      return alert("Username must be at least 4 characters long");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters long");
    }

    await login(username, password);

    goToDashboard();
  };

  return (
    <div className="flex flex-col min-h-screen p-20">
      <main className="flex-1 flex flex-col items-center">
        {/* register form */}
        <div className="bg-white rounded-2xl shadow-lg text-black">
          <div className="px-10 lg:px-20 py-8 lg:py-8">
            {/* <IoMdArrowRoundBack size={30} onClick={goBack} /> */}

            <h1 className="text-lg lg:text-2xl font-bold tracking-wide mt-3">
              Login
            </h1>

            {/* <p className="text-gray-400 text-sm lg:text-base mt-1">
                  Create an account to start organizing your team
                </p> */}

            {error && (
              <p className="text-red-500 mt-5 text-sm lg:text-base">{error}</p>
            )}

            <form className="mt-5 flex flex-col" onSubmit={handleLogin}>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>
              </div>

              {!isLoading ? (
                <button className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3 px-5">
                  Continue
                </button>
              ) : (
                <button
                  className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3"
                  disabled
                >
                  Hold on we&apos;re setting up your account...
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
