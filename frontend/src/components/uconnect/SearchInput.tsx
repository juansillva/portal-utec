import { useState, useEffect, useRef } from 'react';
import { Search, Send, Filter, X, Calendar } from 'lucide-react';
import styles from '../../styles/uconnect/SearchInput.module.scss';

interface SearchInputProps {
  onSearch: (termo: string, filtros?: FiltrosType) => void;
  turmas?: { id: number; nome: string }[];
}

export interface FiltrosType {
  dataInicio?: string;
  dataFim?: string;
  turma?: string;
}

function SearchInput({ onSearch, turmas = [] }: SearchInputProps) {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosType>({
    dataInicio: '',
    dataFim: '',
    turma: ''
  });

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onSearch(value, filtros);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    onSearch(search, filtros);
  };

  const handleFiltroChange = (campo: keyof FiltrosType, valor: string) => {
    let valorFinal = valor;
    
    if (campo === 'turma' && valor) {
      const turmaSelecionada = turmas.find(t => t.id === Number(valor));
      valorFinal = turmaSelecionada?.nome || '';
    }
    
    const novosFiltros = { ...filtros, [campo]: valorFinal };
    setFiltros(novosFiltros);
    onSearch(search, novosFiltros);
  };

  const limparFiltros = () => {
    const filtrosLimpos = { dataInicio: '', dataFim: '', turma: '' };
    setFiltros(filtrosLimpos);
    setSearch('');
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    onSearch('', filtrosLimpos);
  };

  const aplicarFiltros = () => {
    onSearch(search, filtros);
    setShowFilters(false);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showFilters) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; 
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [showFilters]);

  const temFiltrosAtivos = filtros.dataInicio || filtros.dataFim || filtros.turma || search;

  return (
    <>
      <div className={styles['search-container']}>
        <form onSubmit={handleSubmit} className={styles['search-box']}>
          <Search className={styles['search-icon']} />
          <input
            type="text"
            placeholder="Buscar posts por título, conteúdo ou professor..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={styles['search-input']}
          />
          
          <button 
            type="button" 
            onClick={() => setShowFilters(true)}
            className={`${styles['filter-button']} ${temFiltrosAtivos ? styles.active : ''}`}
            title="Filtros avançados"
          >
            <Filter size={18} />
            {temFiltrosAtivos && <span className={styles['filter-badge']}>•</span>}
          </button>

          {temFiltrosAtivos && (
            <button 
              type="button" 
              onClick={limparFiltros}
              className={styles['clear-button']}
              title="Limpar busca e filtros"
            >
              <X size={18} />
            </button>
          )}

          <button type="submit" className={styles['search-button']}>
            <Send className={styles['send-icon']} />
          </button>
        </form>
      </div>

      {showFilters && (
        <>
          <div 
            className={styles['modal-overlay']}
            onClick={() => setShowFilters(false)}
          />

          <div className={styles['filters-modal']}>
            <div className={styles['modal-header']}>
              <h3>
                <Filter size={20} />
                Filtros Avançados
              </h3>
              <button 
                onClick={() => setShowFilters(false)}
                className={styles['close-modal']}
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles['modal-body']}>
              <div className={styles['filters-grid']}>
                <div className={styles['filter-group']}>
                  <label htmlFor="dataInicio">
                    <Calendar size={16} />
                    Data Início
                  </label>
                  <input
                    type="date"
                    id="dataInicio"
                    value={filtros.dataInicio}
                    onChange={(e) => handleFiltroChange('dataInicio', e.target.value)}
                    className={styles['filter-input']}
                  />
                </div>

                <div className={styles['filter-group']}>
                  <label htmlFor="dataFim">
                    <Calendar size={16} />
                    Data Fim
                  </label>
                  <input
                    type="date"
                    id="dataFim"
                    value={filtros.dataFim}
                    onChange={(e) => handleFiltroChange('dataFim', e.target.value)}
                    className={styles['filter-input']}
                  />
                </div>

                {turmas.length > 0 && (
                  <div className={styles['filter-group']}>
                    <label htmlFor="turma">Turma</label>
                    <select
                      id="turma"
                      value={filtros.turma ? turmas.find(t => t.nome === filtros.turma)?.id : ''}
                      onChange={(e) => handleFiltroChange('turma', e.target.value)}
                      className={styles['filter-input']}
                    >
                      <option value="">Todas as turmas</option>
                      {turmas.map((turma) => (
                        <option key={turma.id} value={turma.id}>
                          {turma.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className={styles['modal-footer']}>
              {temFiltrosAtivos && (
                <button 
                  type="button" 
                  onClick={limparFiltros}
                  className={styles['clear-filters-btn']}
                >
                  <X size={16} />
                  Limpar filtros
                </button>
              )}
              
              <div className={styles['footer-actions']}>
                <button 
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className={styles['cancel-btn']}
                >
                  Cancelar
                </button>
                <button 
                  type="button"
                  onClick={aplicarFiltros}
                  className={styles['apply-btn']}
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SearchInput;