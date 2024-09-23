import { useEffect, useState } from "react";
import "./App.css";
import { InputField } from "./components/InputField";
import { Task } from "./components/Task";

function App() {
  const [isTasksChange, setTaskchange] = useState(false);
  const [Tasks, setTasks] = useState<{ [key: number]: string }>({});
  useEffect(() => {
    const storeTasks = localStorage.getItem("store");
    if (storeTasks) {
      try {
        const parsedTasks: { [key: number]: string } = JSON.parse(storeTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error("error parsing tasks from localstroge:", error);
        setTasks({});
      }
    }
  }, [isTasksChange]);
  return (
    <div className="w-[96%] sm:w-[60%] md:w-[50%] rounded mx-auto my-[16px] border-solid border-black border-2 box-border flex flex-col items-center  py-[16px] min-h-[600px] max-h-[800px] overflow-auto">
      <h1>Today Task</h1>
      <InputField setTaskChange={setTaskchange} isTaskChange={isTasksChange} />
      {Object.keys(Tasks).length === 0 ? (
        <p>No tasks available</p> // Show a message when there are no tasks
      ) : (
        Object.keys(Tasks).map((key: string) => (
          <Task
            setTaskChange={setTaskchange}
            isTaskChange={isTasksChange}
            task={Tasks[parseInt(key)]}
            taskKey={parseInt(key)}
            key={key}
          />
        ))
      )}
    </div>
  );
}

export default App;
