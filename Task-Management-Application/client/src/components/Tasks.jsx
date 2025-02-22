"use client"
import React, { useEffect, useState } from 'react';
import ToDoTasks from './tasks/ToDoTasks';
import InProgress from './tasks/InProgress';
import DoneTasks from './tasks/DoneTasks';
import useAxiosSecure from '../auth/hook/useAxiosSecure';
import useAuth from '../auth/hook/useAuth';
import { useQuery } from "@tanstack/react-query";

const Tasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: tasks = [], isLoading, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/tasks/${user.uid}`)
      console.log(data)
      return data;
    },
  });

  if (isLoading || loading) return <div className="flex items-center justify-center my-28"> <span className="loading loading-ring loading-lg"></span> </div>
  console.log(tasks)

  return (
    <div className='grid grid-cols-3 gap-5'>
      <ToDoTasks tasks={tasks} />
      <InProgress tasks={tasks} />
      <DoneTasks tasks={tasks} />
    </div>
  );
};

export default Tasks;