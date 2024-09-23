import React, { useState } from "react";
import enterPng from "../assets/enter.png";

interface InputFieldProps {
  setTaskChange: (isTaskChange: boolean) => void;
  isTaskChange: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  setTaskChange,
  isTaskChange,
}) => {
  const [userInput, setUserInput] = useState("");

  const addTask = (task: string) => {
    const storedData = localStorage.getItem("store");
    if (storedData) {
      const store: Record<string, any> = JSON.parse(storedData);
      if (Object.keys(store).length) {
        console.log("if statement is working");
        const prevTasks: { [key: number]: string } = JSON.parse(
          localStorage.store
        );
        const TaskKeyArray = Object.keys(prevTasks);
        const newTaskKey = String(
          Number(TaskKeyArray[TaskKeyArray.length - 1]) + 1
        );
        localStorage.store = JSON.stringify({
          ...prevTasks,
          [newTaskKey]: task,
        });
        setTaskChange(!isTaskChange);
        return;
      }
    }
    console.log("else statement working");
    localStorage.setItem("store", JSON.stringify({}));
    const prevTasks: { [key: number]: string } = JSON.parse(localStorage.store);
    localStorage.store = JSON.stringify({ ...prevTasks, 1: task });
    setTaskChange(!isTaskChange);
    return;
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="w-[96%] border-solid border-[2px] border-blue-300 focus-within:border-blue-500 focus-within:bg-gray-100 rounded flex justify-between ">
      <input
        className="w-[100%] placeholder:text-black-800 h-12 border-none outline-none sm:text-[18px] text-[16px] px-2  focus:bg-gray-100"
        placeholder="Start writing and press enter to add task"
        onChange={(event) => {
          handleUserInput(event);
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            addTask(userInput);
            (e.target as EventTarget & HTMLInputElement).value = "";
          }
        }}
      ></input>
      <img src={enterPng} alt="" className="h-[50px]" />
    </div>
  );
};
