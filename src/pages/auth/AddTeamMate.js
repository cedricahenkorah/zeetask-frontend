import React, { useState } from "react";

const AddTeamMate = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const createTeamMate = async (e) => {
    e.preventDefault();

    const teammate = { firstName, lastName, email, password, username };

    if (!firstName || !lastName || !email || !password || !username)
      return alert("Please fill in all fields");

    console.log(teammate);

    const response = await fetch(
      "https://zeetask-server.onrender.com/api/users/",
      {
        method: "POST",
        body: JSON.stringify(teammate),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setUsername("");
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
              ADD YOUR FIRST TEAM MATE
            </h1>
            {/*   
            <p className="text-gray-400 text-sm lg:text-base mt-1">
              Create an account to start organizing your team
            </p> */}

            {/* {error && (
              <p className="text-red-500 mt-5 text-sm lg:text-base">{error}</p>
            )} */}

            <form className="mt-5 flex flex-col">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">First Name</label>
                  <input
                    type="text"
                    placeholder="john"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Last Name</label>
                  <input
                    type="text"
                    placeholder="doe"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Email Address</label>
                  <input
                    type="email"
                    placeholder="johndoe@mail.com"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Username</label>
                  <input
                    type="text"
                    placeholder="johndoe"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Password</label>
                  <input
                    type="password"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>
              </div>

              {/* {!isLoading ? ( */}
              <button className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3">
                Add team mate
              </button>
              {/* ) : ( */}
              {/* <button
                  className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3"
                  disabled
                >
                  Ready to Take Notes? Hold on we&apos;re setting up your
                  account...
                </button>
              )} */}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddTeamMate;
