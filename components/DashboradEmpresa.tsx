// src/components/DashboardEmpresa.tsx
import React from 'react';
import { Empresa } from '@/src/types/types'; // Ajuste o caminho se necessário
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building, 
  Globe, 
  Briefcase, 
  FileText, 
  Calendar, 
  Smartphone,
  Info
} from 'lucide-react';
import { redirect } from 'next/navigation';

// --- Props do Componente ---
interface DashboardProps {
  empresa: Empresa;
}

// --- Componente de Badge de Status ---
const StatusBadge = ({ status }: { status: Empresa['dadosOperacionais']['status'] }) => {
  let corClasses = '';
  switch (status) {
    case 'Ativa':
      corClasses = 'bg-green-100 text-green-800 ring-green-600/20';
      break;
    case 'Suspensa':
      corClasses = 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';
      break;
    case 'Inativa':
      corClasses = 'bg-gray-100 text-gray-700 ring-gray-600/20';
      break;
    default:
      corClasses = 'bg-gray-100 text-gray-800 ring-gray-600/20';
  }

  return (
    <span
      className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium ring-1 ring-inset ${corClasses}`}
    >
      {status}
    </span>
  );
};

// --- Componente de Card (Reutilizável) ---
const Card = ({ title, icon: Icon, children, link }: { title: string, icon?: React.ElementType, children: React.ReactNode , link?:string}) => (
  <div className={`bg-white rounded-lg shadow-sm  border border-zinc-300 overflow-hidden ${link && "cursor-pointer"}`} 
  onClick={link ? ()=>redirect(`/${link}`):undefined}
  >
    <div className="p-5">
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-5 h-5 text-blue-600 mr-3" />}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  </div>
);

// --- Componente de Item de Lista (para Contato/Detalhes) ---
const InfoItem = ({ label, value, icon: Icon, href }: { label: string, value: string | undefined, icon?: React.ElementType, href?: string }) => {
  if (!value) return null; // Não renderiza se não houver valor

  const content = href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-words">
      {value}
    </a>
  ) : (
    <span className="text-gray-900 break-words">{value}</span>
  );

  return (
    <div className="flex items-start mb-3">
      {Icon && <Icon className="w-4 h-4 text-gray-500 mr-3 mt-1 flex-shrink-0" />}
      <div className="flex-grow">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="text-sm">{content}</dd>
      </div>
    </div>
  );
};


// --- Componente Principal do Dashboard ---
const DashboardEmpresa = ({ empresa }: DashboardProps) => {

  const {
    razaoSocial,
    nomeComercial,
    cnpj,
    dataAbertura,
    contato,
    endereco,
    dadosOperacionais
  } = empresa;

  // Formata a data
  const dataFormatada = new Date(dataAbertura).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    // Fundo suave da página
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Cabeçalho Principal */}
        <header className="bg-white shadow-sm border border-zinc-300 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{razaoSocial}</h1>
              <p className="text-lg text-gray-600 mt-1">{nomeComercial}</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
              <StatusBadge status={dadosOperacionais.status} />
            </div>
          </div>
        </header>

        {/* 2. Grid do Dashboard */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Coluna Principal (Esquerda) */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Card: Dados Operacionais */}
            <Card title="Dados Operacionais" icon={Briefcase}>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <InfoItem label="Área de Atuação" value={dadosOperacionais.areaAtuacao} />
                <InfoItem label="Porte da Empresa" value={dadosOperacionais.porte} />
              </dl>
              <div className="mt-6">
                <dt className="text-sm font-medium text-gray-500">Descrição das Atividades</dt>
                <dd className="text-sm text-gray-800 mt-1 whitespace-pre-wrap">
                  {dadosOperacionais.descricao}
                </dd>
              </div>
            </Card>

            <Card title="Funcionários" icon={Briefcase} link={`empresa/${empresa.id}/funcionarios`}>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <InfoItem label="Quantidade de funcionários" value={"45 Ativos"} />
                {/* <InfoItem label="Porte da Empresa" value={dadosOperacionais.porte} /> */}
              </dl>
            </Card>

            {/* Outros cards principais podem ir aqui... */}

          </div>

          {/* Coluna Lateral (Direita) */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* Card: Detalhes Principais */}
            <Card title="Detalhes Principais" icon={Info}>
              <dl>
                <InfoItem label="CNPJ" value={cnpj} icon={Building} />
                <InfoItem label="Data de Abertura" value={dataFormatada} icon={Calendar} />
              </dl>
            </Card>

            {/* Card: Informações de Contato */}
            <Card title="Informações de Contato" icon={Phone}>
              <dl>
                <InfoItem label="E-mail Principal" value={contato.email} icon={Mail} href={`mailto:${contato.email}`} />
                <InfoItem label="E-mail Financeiro" value={contato.emailFinanceiro} icon={Mail} href={`mailto:${contato.emailFinanceiro}`} />
                <InfoItem label="Telefone Comercial" value={contato.telefone} icon={Phone} href={`tel:${contato.telefone}`} />
                <InfoItem label="Celular / WhatsApp" value={contato.celular} icon={Smartphone} href={`https://wa.me/${contato.celular.replace(/\D/g, '')}`} />
                <InfoItem label="Site" value={contato.site} icon={Globe} href={contato.site} />
              </dl>
            </Card>

            {/* Card: Endereço */}
            <Card title="Endereço" icon={MapPin}>
              <address className="not-italic text-sm text-gray-800">
                <p>{endereco.logradouro}, {endereco.numero}</p>
                {endereco.complemento && <p>{endereco.complemento}</p>}
                <p>{endereco.bairro}</p>
                <p>{endereco.cidade} - {endereco.estado}</p>
                <p className="mt-2 font-medium">CEP: {endereco.cep}</p>
                <p>{endereco.pais}</p>
              </address>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmpresa;