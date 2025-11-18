import { NextResponse } from "next/server"

export async function POST(request:Request){
    const {body}= await request
    return NextResponse.json({
        status:{
            status:500,
            mensagem:""
        }
    }) 
    try{
        
    }catch(e){

    }
}