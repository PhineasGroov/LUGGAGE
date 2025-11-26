'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input, Spin } from 'antd';
import { MapPin } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}

interface LocationInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function LocationInput({
  value,
  onChange,
  placeholder = 'Rechercher une localisation...',
  disabled = false,
}: LocationInputProps) {
  const [searchValue, setSearchValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Mettre à jour la valeur interne quand la prop value change
  useEffect(() => {
    if (value !== undefined) {
      setSearchValue(value);
    }
  }, [value]);

  // Fermer les suggestions si on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recherche avec debounce pour éviter trop d'appels API
  const searchLocation = useDebouncedCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'fr',
          },
        }
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Erreur lors de la recherche de localisation:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    searchLocation(newValue);
  };

  const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
    setSearchValue(suggestion.display_name);
    setShowSuggestions(false);
    setSuggestions([]);
    onChange?.(suggestion.display_name);
  };

  const handleInputBlur = () => {
    // Délai pour permettre le clic sur une suggestion
    setTimeout(() => {
      // Si l'utilisateur a tapé quelque chose mais n'a pas sélectionné de suggestion
      if (searchValue && onChange) {
        onChange(searchValue);
      }
    }, 200);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Input
        value={searchValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        prefix={<MapPin className="h-4 w-4 text-gray-400" />}
        suffix={loading ? <Spin size="small" /> : null}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
              onMouseDown={(e) => {
                e.preventDefault(); // Empêcher le blur de l'input
                handleSelectSuggestion(suggestion);
              }}
            >
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {suggestion.display_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
