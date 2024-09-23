import React from "react";

interface propsToUpdateState {
  setTaskChange: (isTaskChange: boolean) => void;
  isTaskChange: boolean;
  task: string;
  taskKey: number;
}
export const Task: React.FC<propsToUpdateState> = ({
  setTaskChange,
  isTaskChange,
  task,
  taskKey,
}) => {
  //function that handle task deletion part

  const handleDeletion = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handle deletion function is get called");
    console.log(e.currentTarget.id);
    if (localStorage.store) {
      const keyToDelete = Number(e.currentTarget.id);
      const parseTask: { [key: number]: string } = JSON.parse(
        localStorage.store
      );
      console.log(`delete the element ${keyToDelete}`);
      delete parseTask[keyToDelete];

      localStorage.store = JSON.stringify(parseTask);
    }
    console.log(localStorage.store);
    setTaskChange(!isTaskChange);
  };

  return (
    <div className="w-[96%] border-b-2 border-x-0 border-t-0 min-h-[48px]  items-center text box-border pl-2 sm:text-[18px] flex  font text-black border-solid border-gray-300 h-fit-content">
      <label className="task-container  text-[20px] flex leading-[46px] h-fit">
        {task}
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
      <button
        id={`${taskKey}`}
        className="h-[36px]  delete-button  rounded"
        onClick={(e) => handleDeletion(e)}
      >
        Delete
      </button>
    </div>
  );
};
