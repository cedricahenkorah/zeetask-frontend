import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Team = () => {
  const [team, setTeam] = useState(null);
  const [teamUser, setTeamUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

      if (response.ok) {
        setTeamUser(json);
      } else {
        return;
      }

      return json.user;
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    if (user && teamUser) {
      const fetchTeam = async () => {
        setIsLoading(true);

        const response = await fetch(
          `https://zeetask-server.onrender.com/api/team/${teamUser?.team}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );

        const json = await response.json();
        console.log(json, "team details");

        if (response.ok) {
          setTeam(json);
          setIsLoading(false);
        }

        if (!response.ok) {
          setIsLoading(false);
          setError("Could not fetch team details");
          return;
        }
      };

      fetchTeam();
    }
  }, [user, teamUser]);

  console.log(team, "team");

  return (
    <div className="w-full p-10">
      <Link to="/create-team">
        <div className="flex justify-end">
          <button>
            <h1>Create Your Team</h1>
          </button>
        </div>
      </Link>

      {/* team info */}
      <div>
        <h1>{team?.name}</h1>
        <p>Subscription status: {team?.subscription ? "Paid" : "Not Paid"}</p>
        <p>
          Admin: {team?.admin?.firstName} {team?.admin?.lastName}
        </p>
      </div>
    </div>
  );
};

export default Team;
