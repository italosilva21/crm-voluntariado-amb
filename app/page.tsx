'use client';

import { useState, FormEvent } from 'react';
import {
  User,
  Mail,
  Phone,
  Package,
  Sprout,
  Building2,
  Monitor,
  Wrench,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const AREAS_DE_INTERESSE = [
  {
    id: 'Distribuição',
    label: 'Distribuição',
    description: 'Apoio na logística, triagem e distribuição de suprimentos e cestas.',
    icon: Package,
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50/80 dark:bg-orange-950/20'
  },
  {
    id: 'Colheita de caju',
    label: 'Colheita de caju',
    description: 'Atuação direta nos projetos agrícolas e colheita de caju no sertão.',
    icon: Sprout,
    color: 'from-emerald-500 to-green-600',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-50/80 dark:bg-emerald-950/20'
  },
  {
    id: 'Limpeza no CT',
    label: 'Limpeza no CT',
    description: 'Organização e higienização das instalações do Centro de Treinamento.',
    icon: Building2,
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50/80 dark:bg-blue-950/20'
  },
  {
    id: 'Limpeza na praça digital',
    label: 'Limpeza na praça digital',
    description: 'Organização, conservação e zelo do espaço da Praça Digital.',
    icon: Monitor,
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-50/80 dark:bg-purple-950/20'
  }
];

export default function Page() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    area_interesse: '',
    habilidades: '',
    disponibilidade: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectArea = (areaId: string) => {
    setFormData(prev => ({ ...prev, area_interesse: areaId }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.area_interesse) {
      setStatus('error');
      setErrorMessage('Por favor, selecione uma área de interesse.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/voluntarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao cadastrar voluntário.');
      }

      setStatus('success');
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message || 'Ocorreu um erro inesperado ao realizar o cadastro.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      area_interesse: '',
      habilidades: '',
      disponibilidade: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Header / Bar */}
      <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <img
                src="/logo-adb.png"
                alt="Amigos do Bem"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block h-6 w-[1px] bg-slate-300 dark:bg-slate-700" />
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-900">
              <Sparkles className="w-3.5 h-3.5" />
              CRM Voluntariado
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden md:inline-block">
              Transformando vidas no Sertão
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Presentation & Value Proposition */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              Faça a diferença hoje
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
              Seja um <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">Voluntário</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Junte-se à família <strong className="text-slate-900 dark:text-white font-semibold">Amigos do Bem</strong>. Sua energia, tempo e talento ajudam a levar transformação, esperança e oportunidade para milhares de famílias no sertão nordestino.
            </p>

            {/* Impact Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-orange-300 dark:hover:border-orange-800 transition-colors">
                <div className="p-2.5 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Ações Logísticas & Distribuição</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Organização e distribuição direta de suprimentos essenciais.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors">
                <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Desenvolvimento Sustentável</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Participação na colheita e geração de renda nas comunidades.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-800 transition-colors">
                <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0">
                  <Monitor className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Inclusão Digital & Estrutura</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Apoio operacional e conservação dos espaços de aprendizado e TI.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Seus dados estão protegidos e seguros.</span>
            </div>
          </div>

          {/* Right Side: Form Container */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
              
              {status === 'success' ? (
                <div className="py-8 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center ring-8 ring-emerald-50 dark:ring-emerald-950/40">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      Cadastro Realizado com Sucesso!
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto text-sm sm:text-base">
                      Muito obrigado pelo seu interesse e disposição em ajudar. Nossa equipe entrará em contato em breve para agendar seu acolhimento.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-left max-w-md mx-auto space-y-1.5 text-sm">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Resumo da Inscrição</div>
                    <div className="text-slate-900 dark:text-slate-100 font-medium"><strong>Nome:</strong> {formData.nome}</div>
                    <div className="text-slate-900 dark:text-slate-100 font-medium"><strong>Área Selecionada:</strong> {formData.area_interesse}</div>
                  </div>

                  <button
                    onClick={handleReset}
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    Cadastrar Outro Voluntário
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      Formulário de Inscrição
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Preencha os campos obrigatórios (* ) para concluir seu cadastro.
                    </p>
                  </div>

                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3 animate-in fade-in duration-200">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Atenção: </span>
                        {errorMessage}
                      </div>
                    </div>
                  )}

                  {/* Campo: Nome */}
                  <div className="space-y-1.5">
                    <label htmlFor="nome" className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                      Nome Completo <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        placeholder="Digite seu nome completo"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Grid de 2 Colunas: Email e Telefone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Campo: Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                        E-mail <span className="text-orange-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="seu.email@exemplo.com"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Campo: Telefone */}
                    <div className="space-y-1.5">
                      <label htmlFor="telefone" className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                        Telefone / WhatsApp
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          placeholder="(00) 90000-0000"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Campo: Área de Interesse (Cards Selecionáveis) */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                      Área de Interesse <span className="text-orange-500">*</span>
                    </label>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Selecione onde você gostaria de atuar prioritariamente:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {AREAS_DE_INTERESSE.map(area => {
                        const Icon = area.icon;
                        const isSelected = formData.area_interesse === area.id;

                        return (
                          <div
                            key={area.id}
                            onClick={() => handleSelectArea(area.id)}
                            className={`cursor-pointer p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between group ${
                              isSelected
                                ? `${area.borderColor} ${area.bgColor} ring-2 ring-orange-500/40 shadow-sm`
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/60 dark:hover:bg-slate-800/80'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-600'} transition-colors`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </div>

                            <div className="mt-3">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                {area.label}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                                {area.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Hidden input to guarantee form accessibility */}
                    <input
                      type="hidden"
                      name="area_interesse"
                      value={formData.area_interesse}
                      required
                    />
                  </div>

                  {/* Campo: Habilidades */}
                  <div className="space-y-1.5 pt-2">
                    <label htmlFor="habilidades" className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                      Habilidades e Experiências
                    </label>
                    <div className="relative">
                      <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <textarea
                        id="habilidades"
                        name="habilidades"
                        value={formData.habilidades}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Conte-nos um pouco sobre suas habilidades, conhecimentos ou experiências prévias..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Campo: Disponibilidade */}
                  <div className="space-y-1.5">
                    <label htmlFor="disponibilidade" className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                      Disponibilidade de Horário
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="disponibilidade"
                        name="disponibilidade"
                        value={formData.disponibilidade}
                        onChange={handleChange}
                        placeholder="Ex: Finais de semana, Segundas à tarde, etc."
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Cadastrando...
                      </>
                    ) : (
                      <>
                        Concluir Cadastro de Voluntário
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Amigos do Bem — Transformando vidas no Sertão. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}