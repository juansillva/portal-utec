import { createContext, useContext, useState, ReactNode } from 'react';

export interface FiltrosType {
  dataInicio?: string;
  dataFim?: string;
  turma?: string;
}

interface SearchContextType {
  searchTerm: string;
  filtros: FiltrosType;
  setSearch: (term: string, filtros?: FiltrosType) => void;
  turmas: { id: number; nome: string }[];
  setTurmas: (turmas: { id: number; nome: string }[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtros, setFiltros] = useState<FiltrosType>({});
  const [turmas, setTurmasState] = useState<{ id: number; nome: string }[]>([]);

  const setSearch = (term: string, newFiltros?: FiltrosType) => {
    setSearchTerm(term);
    if (newFiltros !== undefined) {
      setFiltros(newFiltros);
    }
  };

  const setTurmas = (newTurmas: { id: number; nome: string }[]) => {
    setTurmasState(newTurmas);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, filtros, setSearch, turmas, setTurmas }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch deve ser usado dentro de SearchProvider');
  }
  return context;
}