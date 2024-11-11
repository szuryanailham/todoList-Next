"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import fetchData, { createTodo, deletedTodo } from "@/controllers/TodoController";
import { Task } from "@/model/todomodel";
import { IoMdAdd } from "react-icons/io";
import ToastCard from "@/components/ToastCard";

const HomePage = () => {
  // initializazion state variabel
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [taskInProgressID, setTaskInProgressID] = useState<string | null>(null);
  const [showSuccessToast, setShowSucessToast] = useState(false);
  const [showDeletedToast, setShowDeletedToast] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    dueDate: "",
    description: "",
  });
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "in-progress",
    dueDate: "",
    created_at: new Date().toISOString(),
  });

  //  trigerr toast
  const triggerSuccessToast = () => {
    setShowSucessToast(true);
    setTimeout(() => {
      setShowSucessToast(false);
    }, 1000);
  };

  // tirgeer loading delete
  const triggerDeletedToast = () => {
    setShowDeletedToast(true);
    setTimeout(() => {
      setShowDeletedToast(false);
      setLoadingDelete(false);
    }, 1000);
  };

  // intialization handling checked to deleting
  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setTaskInProgressID(id);
      setLoadingDelete(true);
      setTimeout(async () => {
        const responseDelete = await deletedTodo(id);
        console.log(responseDelete);
        if (responseDelete.success) {
          triggerDeletedToast();
          setLoadingDelete(false);
          setTaskInProgressID(null);
        }
      }, 2000);
    }
  };

  // generate string function
  const generateRandomId = (num: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < num; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  // intialization handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingForm(true);
    const newId = generateRandomId(6);
    const newTask: Task = {
      id: newId,
      title: formData.title,
      description: formData.description,
      status: "in-progress",
      dueDate: formData.dueDate,
      created_at: formData.created_at,
    };

    setTimeout(async () => {
      try {
        const responseCreated = await createTodo({ newtodo: newTask });
        if (responseCreated.success) {
          const modal = document.getElementById("modalAddTask") as HTMLDialogElement;
          modal?.close();
          triggerSuccessToast();
        } else {
          console.error("Task creation failed:", responseCreated.message);
        }
      } catch (error) {
        console.error("Error creating task:", error);
      } finally {
        setLoadingForm(false);
      }
    }, 2000);
  };

  // intialization handle of onchange input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validation rules for each field
    let errorMessage = "";
    if (name === "title") {
      if (value.trim() === "") {
        errorMessage = "Title is required.";
        return false;
      } else if (value.length < 3) {
        errorMessage = "Title must be at least 3 characters long.";
      }
    } else if (name === "dueDate") {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        errorMessage = "Please enter a valid due date.";
      } else if (date < new Date(new Date().setHours(0, 0, 0, 0))) {
        errorMessage = "Due date cannot be in the past.";
      }
    } else if (name === "description") {
      if (value.trim() === "") {
        errorMessage = "Description is required.";
      } else if (value.length < 10) {
        errorMessage = "Description must be at least 10 characters long.";
      }
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  // initialization of use effect rendering
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData: Task[] = await fetchData();
        setTasks(tasksData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [tasks]);
  if (loading) {
    return <h2>Loading tasks...</h2>;
  }
  return (
    <div className="w-full md:w-[50%] h-fit mx-auto ">
      <div>
        <div className="mt-10 px-5">
          <div className="flex justify-between">
            <h1 className="text-4xl md:w-full font-bold text-center text-gray-700 mb-5">Your Tasks</h1>
            <button
              className="btn btn-square btn-outline"
              onClick={() => {
                const modal = document.getElementById("modalAddTask") as HTMLDialogElement | null;
                if (modal) {
                  modal.showModal();
                }
              }}
            >
              <IoMdAdd className="text-3xl" />
            </button>
          </div>

          <div className="w-full p-5 border border-gray-200 rounded-lg shadow flex flex-col gap-2">
            {tasks.map((task, index) => {
              return (
                <div key={index} className="card bg-base-100 w-full h-min-20 shadow-xl flex flex-row items-center justify-evenly">
                  <div className="card-body">
                    <div className="card-actions justify-end"></div>
                    <p className="text-lg font-semibold text-gray-700">{task.title}</p>
                    <p>Time || Date</p>
                  </div>
                  <div className="px-4">
                    {loadingDelete && taskInProgressID === task.id ? (
                      <span className="loading loading-spinner loading-md ml-5"></span>
                    ) : (
                      <input onChange={(e) => handleCheckboxChange(task.id, e.target.checked)} type="checkbox" className="checkbox checkbox-md m-5" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* toast of alert fiture  */}
      {(() => {
        if (showSuccessToast) {
          return <ToastCard text="You Have New Task..." color="bg-green-500" />;
        } else if (showDeletedToast) {
          return <ToastCard text="You have deleted Task..." color="bg-green-500" />;
        } else {
          return "";
        }
      })()}

      {/* this modal to add task */}
      <dialog id="modalAddTask" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit} method="dialog">
            {/* close modal */}
            <div
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                const modal = document.getElementById("modalAddTask") as HTMLDialogElement;
                modal?.close();
              }}
            >
              ✕
            </div>
            <div className="p-3 flex flex-col gap-5 mt-5 mx-auto">
              <h1 className="text-3xl md:w-full font-bold text-center text-gray-700">New Tasks</h1>
              {/* contain of modal */}
              <input name="title" onChange={handleInputChange} type="text" placeholder="Title Task ..." className="input w-full max-w-lg bg-slate-200" required />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              <input name="dueDate" onChange={handleInputChange} type="date" placeholder="Duetime task.." className="input w-full max-w-lg bg-slate-200" required />
              {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
              {/* description */}
              <textarea name="description" required onChange={handleInputChange} className="textarea bg-slate-200" placeholder="Description...."></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              {/* button to enter */}
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-outline mx-auto">
                {loadingForm ? <span className="loading loading-spinner loading-md"></span> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default HomePage;
