'use client';

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import SerieForList from "@/components/SeriesList/SerieForList";

const supabase = createClient();

export default function SeriesList() {
  const [series, setSeries] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterStreamingService, setFilterStreamingService] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filteredSeries, setFilteredSeries] = useState([]);
  useEffect(() => {
    const fetchSeries = async () => {
      const { data, error } = await supabase.from("series").select("*");
      if (error) {
        console.error("error", error);
      } else {
        setSeries(data);
        setFilteredSeries(data);
      }
    
    };
    fetchSeries();
  }, []);

  useEffect(() => {
    const filtered = series.filter((serie) => {
      return (
        serie.name.toLowerCase().includes(filterName.toLowerCase()) &&
        serie.streaming_service.toLowerCase().includes(filterStreamingService.toLowerCase()) &&
        serie.category.toLowerCase().includes(filterCategory.toLowerCase())
      );
    });
    setFilteredSeries(filtered);
  }, [filterName, filterStreamingService, filterCategory, series]);

  return (
    <div className="flex flex-col gap-12">
      <div>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 w-full"
          placeholder="Filtrar por nombre"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <div className="flex gap-10">
          <select className="rounded-md px-2 py-2 bg-inherit border w-full" onChange={(e) => setFilterStreamingService(e.target.value)} value={filterStreamingService}> 
            <option value="">Todos los servicios</option>
            <option value="Netflix">Netflix</option>
            <option value="Amazon Prime Video">Amazon Prime Video</option>
            <option value="Disney+">Disney+</option>
            <option value="HBO Max">HBO Max</option>
            <option value="Apple TV+">Apple TV+</option>
          </select>
          <select className="rounded-md px-2 py-2 bg-inherit border w-full" onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}> 
            <option value="">Todos las categorías</option>
            <option value="Ciencia Ficción">Ciencia Ficción</option>
            <option value="Terror">Terror</option>
            <option value="Misterio">Misterio</option>
            <option value="Drama">Drama</option>
            <option value="Acción">Acción</option>
            <option value="Comedia">Comedia</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Romántica">Romántica</option>
          </select>
        </div>
      </div>
      {
        filteredSeries.length === 0 && (
          <p>No se encontraron series</p>
        )
      }
      <ul className="flex flex-col gap-10">        
        {filteredSeries.map((serie) => (
          <li key={serie.id}>
            < SerieForList serie={serie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
