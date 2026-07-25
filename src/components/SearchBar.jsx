import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export default function SearchBar({ onSearch, onGeolocation, error }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', width: '100%', position: 'relative' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search 
            size={20} 
            style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} 
          />
          <input 
            type="text" 
            placeholder="Search city, region or country..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: '3rem' }}
          />
        </div>
        <button 
          type="button" 
          onClick={onGeolocation} 
          className="btn-icon" 
          title="Use my location"
          style={{ width: '54px', height: '54px' }}
        >
          <MapPin size={24} />
        </button>
      </form>
      {error && (
        <div style={{ color: 'var(--red)', marginTop: '0.75rem', marginLeft: '1rem', fontWeight: 500 }} className="animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
}
