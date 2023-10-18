import { useState } from "react";
import { Link } from "react-router-dom";
import CreateTask from "../../components/CreateTask";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full p-10">
      <div className="flex justify-end">
        <button onClick={() => setShowModal(true)}>
          <h1>Create a Task</h1>
        </button>
      </div>

      <CreateTask showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Tasks;
