import { db } from "@/src/services/db";
import { Funcionario } from "@/src/types/types";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request:Request, context:any){
    const {id} = await context.params
    
    try{
        const coll = collection(db, "empresas", `${id}`,"Funcionarios")
        const snapshot = await getDocs(coll)
        const data = snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})) as Funcionario[]

        return NextResponse.json(data)
    }catch(error){
        return NextResponse.json({
            message: error
        })
    }
}



export async function POST(request:Request){
    const body = await request
    console.log(body);
    
}


