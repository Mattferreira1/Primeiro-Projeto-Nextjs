// // export type Empresa={
// //   id:string,
// //   nome:string,
// //   cnpj:string
// // }

// export type Endereco = {
//   cep: string
//   logradouro: string
//   numero: string
//   complemento?: string
//   bairro: string
//   cidade: string
//   estado: string
//   pais: string
// }

// export type Contato={
//   site:string,
//   emailFinanceiro:string,
//   email:string,
//   celular:string,
//   telefone:string
// }

// export type DadosOperacionais = {
//   areaAtuacao: string
//   descricao: string
//   porte: "MEI" | "ME" | "EPP" | "LTDA" | "SA"
//   status: "Ativa" | "Inativa" | "Suspensa"
// }
// export type Empresa={
//   id:string,
//   razaoSocial:string,
//   nomeComercial:string,
//   dataAbertura: Date,
//   cnpj:string,
//   endereco: Endereco
//   contato: Contato
//   dadosOperacionais: DadosOperacionais
// }


// export type Funcionarios= {
//   id:string,
//   nome:string,
//   email:string,
//   senha:string,
// }

// export type CurrentUser={
//   id:string,
//   email:string,
//   senha:string
// }

// enum Setor{
//   JS="js"
// }

// export type Emplooyee={
//   nome:string,
//   idade:number,
//   cpf:string,
//   endereco:Endereco,
//   setor: Sector
//   cargo:string

// }

export type Endereco = {
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  pais: string
}

export type Contato = {
  site: string
  emailFinanceiro: string
  email: string
  celular: string
  telefone: string
}

export type DadosOperacionais = {
  areaAtuacao: string
  descricao: string
  porte: "MEI" | "ME" | "EPP" | "LTDA" | "SA"
  status: "Ativa" | "Inativa" | "Suspensa"
}

export type Empresa = {
  id?: string
  razaoSocial: string
  nomeComercial: string
  dataAbertura: Date
  cnpj: string
  endereco: Endereco
  contato: Contato
  dadosOperacionais: DadosOperacionais
}

export type Funcionario = {
  id: string
  email: string
  senha: string
  nome: string
  idade: number
  cpf: string
  endereco: Endereco
  setor: Setor
  cargo: string
  contato: Contato
}

export type Usuario = {
  id: string
  email: string
  senha: string
}

export enum Setor {
  ADMINISTRACAO = "Administração",
  FINANCEIRO = "Financeiro",
  RH = "Recursos Humanos",
  DESENVOLVIMENTO = "Desenvolvimento"
}

export enum TipoContrato {
  CLT = "CLT",
  PJ = "PJ",
  ESTAGIO = "Estágio",
  TEMPORARIO = "Temporário"
}

export type ModeloContratual = {
  id: string
  numeroContrato: string
  nomeFuncionario: string
  dataInicio: Date
  dataFim?: Date
  salario: number
  tipoContrato: TipoContrato
  observacoes?: string
}

export type UserContextType={
  user:Usuario | null,
  setUser: (user:Usuario)=> void
}

export type EmpresaContextType={
  empresa: Empresa| null,
  setEmpresa : (empresa:Empresa)=> void
}