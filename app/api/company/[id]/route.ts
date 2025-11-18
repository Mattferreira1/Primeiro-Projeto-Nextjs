import { db } from "@/src/services/db"
import { Empresa } from "@/src/types/types"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { NextResponse } from "next/server";


export async function GET(request:Request, context:any){
    const {id}=  await context.params

    console.log(id);
    
    try {
        const empresaCollectionRef = doc(db , "empresas", `${id}` )
        const Snapshot = await getDoc(empresaCollectionRef)
        console.log(Snapshot.data());
        
        if(!Snapshot.exists()){
            return NextResponse.json({
                error:"Empresa não encontrada ou inexistente."
            })
        }

        const data = {...Snapshot.data(), id:Snapshot.id} as Empresa
        console.log(data);
        
        const empresaData: Empresa = {
        ...data,
        dataAbertura: new Date(data.dataAbertura),
        } as Empresa
        
        return NextResponse.json({
            data:{
                status:200,
                empresa:empresaData
            }
        })
            

        } catch (error: any) { 
            return NextResponse.json({
            data:{
                status:500,
                error:error,
                }
            })
        } 
}