export type Empresa={
  id:string,
  nome:string,
  cnpj:string
}

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
export type FormValues={
  razaoSocial:string,
  nomeComercial:string,
  dataAbertura: Date,
  cnpj:string,
  endereco: Endereco
}