import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen p-20">
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">ZEETASK</h1>
        <p>Simplifying task management and boosting collaboration</p>

        {/* Get started / register button */}
        <Link to="/create-admin">
          <button className="bg-gray-300 px-10 py-3 mt-10">
            <p className="font-semibold">GET STARTED</p>
          </button>
        </Link>
      </main>

      {/* Footer / login */}
      <Link to="/login">
        <div className="p-4 text-right">
          <p>
            Already have an account?{" "}
            <span className="font-semibold">Login here!</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default LandingPage;
