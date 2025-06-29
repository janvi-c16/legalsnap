"use client";
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';

export type UserDetail = {
    name: string;
    email: string;
    credits: number;
  };
  const Provider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const { user } = useUser();
    const [userDetail, setUserDetail] = useState<any>();
  
    useEffect(() => {
      console.log("Provider useEffect triggered, user:", user);
      user && createNewUser();
    }, [user]);
  
    const createNewUser = async () => {
      try {
        console.log("Creating new user...");
        const result = await axios.post("/api/users");
        console.log("API response:", result.data);
        setUserDetail(result.data);
      } catch (error) {
        console.error("Error creating user:", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error details:", error.response?.data);
        }
      }
    };
  
    return (
      <div>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          {children}
        </UserDetailContext.Provider>
      </div>
    );
  };
  
  export default Provider;