"use client"
import { LogInUserAction, LogoutUserAction } from "@/actions";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";

export  default  function LogOut(){
    async function handleLogout(){
    await LogoutUserAction()
    
    }
    return <Button onClick={handleLogout}>LogOut</Button>
}