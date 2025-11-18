import { db } from "@/src/services/db";
import { Empresa, Usuario } from "@/src/types/types";
import { collectionGroup, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const body = await request.json()
    try{
        const q = query(
            collectionGroup(db, "Funcionarios"),
            where("email", "==", body!.email),
            where("senha", "==", body!.senha)
        );
        const snapShot = await getDocs(q)
        
        if(snapShot.empty){
            return NextResponse.json({
            data:{
                status:500,
                error:"Email ou senha incorretos, tente novamente."
            }
            })
        }
        const currentUser={...snapShot.docs[0].data(),id:snapShot.docs[0].id } as Usuario
        const funcionarioReference = snapShot.docs[0];
        const empresaCollectionRef:any = funcionarioReference.ref.parent.parent;
        const empresaSnap = await getDoc(empresaCollectionRef);
        const empresa = {...empresaSnap.data() as Empresa , id:empresaSnap.id}

        // console.log(empresaSnap.data());
        
        // const currentEmpresa = {...empresaSnap.docs[0].data(), id: empresaSnap.id}

        if(empresaSnap)
        return NextResponse.json({
            data:{
                status: 200,
                user: currentUser,
                empresa: empresa
            }
        })
    }
    catch(e){
        return NextResponse.json({
            data:{
                error:e,
                status:500
            }
        })
    }
}