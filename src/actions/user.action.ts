"use server"

import User from "@/modal/ticket.modal";
import { connect } from "@/db";

export async function  creatUser(user:any) {
    try{
        await connect();
        const newUser = await user.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error){
        console.log(error);
    }
}