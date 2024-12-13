import axios from "axios";
import React, { useEffect, useState } from "react";

const api = "http://localhost:8080/api/todos"

export const Home = () => {

    const [title,settitle] = useState();
    const [todos,setTodos] = useState([]);

    useEffect(() => {
        fetchAllTodos()
    },[])

    const createTodos = async () => {
        const todo = {title}
       

        try {

            const {data} = await axios.post(`${api}`,todo)
            setTodos([...todos,data])
            console.log(data)
        } catch (error) {
            console.log("catch error",error)
        }
    }

    const fetchAllTodos = async () => {
        try {

            const {data} = await axios.get(`${api}`)
            setTodos(data)
            console.log("all todos",data)
        } catch (error) {
            console.log("catch error",error)
        }
    }

    const deleteTodos = async (id) => {
        try {

            const {data} = await axios.delete(`${api}/${id}`)
            setTodos(todos.filter(todo => todo.id !== id))
            console.log("all todos",data)
        } catch (error) {
            console.log("catch error",error)
        }
    }

  return (
    <div className="w-[50vw] h-[80vh] bg-white rounded-xl ">
      <div className="bg-[#758AA2] p-5 flex gap-5 justify-center rounded-t-xl">
        <input
          className="p-2 rounded-md w-full outline-none px-5 text-black"
          placeholder="Add New Task"
          type="text"
          onChange={(e) => settitle(e.target.value)}
        />
        <button onClick ={createTodos} className="py-2 px-5 rounded-md bg-[#2B2B52]">Add</button>
      </div>
      <h1 className="text-black text-center pt-10 font-bold">List Of Todo</h1>
      <div className="p-5 space-y-2 overflow-y-auto h-[60vh]">
        {todos.map((item, index) => (
          <div className="bg-[#99AAAB] p-3 rounded-md flex items-center justify-between">
            <div className="">
              <p className="text-gray-900 text-sm">
                {index + 1}. {item.title}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
              onClick={() => deleteTodos(item.id )}
                className="text-red-600 hover:text-white focus:outline-none rounded-full hover:bg-red-600 p-2"
                aria-label="Delete"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};