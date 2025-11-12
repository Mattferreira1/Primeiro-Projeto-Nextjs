import { createContext } from "react";
import {EmpresaContextType } from "@/src/types/types"

export const EmpresaContext = createContext<EmpresaContextType| null>(null)