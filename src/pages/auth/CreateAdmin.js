import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateAdmin = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const goToLogin = () => {
    navigate("/login");
  };

  // create the admin user
  const createAdmin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const admin = { firstName, lastName, email, password, username };

    if (!firstName || !lastName || !email || !password || !username) {
      setError("Please fill in all fields");
      return alert("Please fill in all fields");
    }

    console.log(admin);

    const response = await fetch(
      "https://zeetask-server.onrender.com/api/users/create-admin",
      {
        method: "POST",
        body: JSON.stringify(admin),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    console.log("admin: ", json);

    if (!response.ok) {
      console.log(json.error);
      setIsLoading(false);
      setError("Could not create the admin account");
    }

    if (response.ok) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setUsername("");
      setIsLoading(false);
      alert("account created");
      goToLogin();
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-20">
      <main className="flex-1 flex flex-col items-center">
        {/* register form */}
        <div className="bg-white rounded-2xl shadow-lg text-black">
          <div className="px-10 lg:px-20 py-8 lg:py-8">
            {/* <IoMdArrowRoundBack size={30} onClick={goBack} /> */}

            <h1 className="text-lg lg:text-2xl font-bold tracking-wide mt-3">
              SET UP YOUR ADMINISTRATOR ACCOUNT
            </h1>

            <p className="text-gray-400 text-sm lg:text-base mt-1">
              Create an account to start organizing your team
            </p>

            {error && (
              <p className="text-red-500 mt-5 text-sm lg:text-base">{error}</p>
            )}

            <form className="mt-5 flex flex-col" onSubmit={createAdmin}>
              <div className="grid grid-cols-2 gap-x-4">
                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">First Name</label>
                  <input
                    type="text"
                    placeholder="john"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Last Name</label>
                  <input
                    type="text"
                    placeholder="doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Email Address</label>
                  <input
                    type="email"
                    placeholder="johndoe@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Username</label>
                  <input
                    type="text"
                    placeholder="johndoe"
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
                <button className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3">
                  Create account
                </button>
              ) : (
                <button
                  className="w-full bg-green-500 text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3"
                  disabled
                >
                  Hold on we&apos;re setting up your Admin account...
                </button>
              )}
            </form>

            <div className="mt-10 text-sm lg:text-base">
              Already have an account?
              <Link to="/login">
                <span className="font-bold text-red-500 cursor-pointer ml-1">
                  Sign in
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAdmin;
