import { useState } from 'react';
import { Search, Send } from 'lucide-react';
import styles from '../../styles/uconnect/SearchInput.module.scss';

function SearchInput() {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Buscando:', search);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['search-box']}>
      <Search className={styles['search-icon']} />
      <input
        type="text"
        placeholder="Buscar no Uconnect"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles['search-input']}
      />
      <button type="submit" className={styles['search-button']}>
        <Send className={styles['send-icon']} />
      </button>
    </form>
  );
}

export default SearchInput;
