// export type Empresa={
//   id:string,
//   nome:string,
//   cnpj:string
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

export type Contato={
  site:string,
  emailFinanceiro:string,
  email:string,
  celular:string,
  telefone:string
}

export type DadosOperacionais = {
  areaAtuacao: string
  descricao: string
  porte: "MEI" | "ME" | "EPP" | "LTDA" | "SA"
  status: "Ativa" | "Inativa" | "Suspensa"
}
export type Empresa={
  id:string,
  razaoSocial:string,
  nomeComercial:string,
  dataAbertura: Date,
  cnpj:string,
  endereco: Endereco
  contato: Contato
  dadosOperacionais: DadosOperacionais
}


export type Funcionarios= {
  id:string,
  nome:string,
  email:string,
  senha:string,
}

export type CurrentUser={
  id:string,
  email:string,
  senha:string
}