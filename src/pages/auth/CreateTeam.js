import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const CreateTeam = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://zeetask-server.onrender.com/api/users/current-user",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      const json = await response.json();
      console.log("current:", json);

      if (json.user?.isAdmin === false) {
        alert("you are not an admin");

        navigate("/");
      } else {
        setAdmin(json?._id);
        console.log(json?._id, "id");
      }

      return json.user;
    };

    if (user) {
      fetchUser();
    }
  }, [user, navigate]);

  const [name, setName] = useState("");
  const [admin, setAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // create the team
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const team = { name, admin };

    if (!name) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const response = await fetch(
      "https://zeetask-server.onrender.com/api/team/",
      {
        method: "POST",
        body: JSON.stringify(team),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    console.log("team", json?.team?._id);

    if (!response.ok) {
      console.log(json.error);
      setAdmin("");
      setName("");
      setIsLoading(false);
      setError("Could not create your team");
      alert("team has not been created");
    }

    if (response.ok) {
      // alert("team has been created");
      setAdmin("");
      setName("");
      setIsLoading(false);
      navigate(`/payment/${json?.team?._id}`);
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
              SET UP YOUR TEAM
            </h1>

            {/* <p className="text-gray-400 text-sm lg:text-base mt-1">
            Create an account to start organizing your team
          </p> */}

            {error && (
              <p className="text-red-500 mt-5 text-sm lg:text-base">{error}</p>
            )}

            <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  className="w-full bg-yellow-500 text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3"
                  disabled
                >
                  Hold on we&apos;re setting up your team...
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTeam;
