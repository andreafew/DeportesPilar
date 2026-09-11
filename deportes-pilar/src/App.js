import React, { useEffect, useState } from 'react';

function App() {
  const [deportes, setDeportes] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch('/deportes.json')
      .then(response => response.json())
      .then(data => {
        console.log("Datos cargados:", data);
        setDeportes(data);
      })
      .catch(error => console.error("Error al cargar el JSON:", error));
  }, []);

  const normalizar = str =>
    (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const resultados = deportes.filter(d =>
    normalizar(d.Deporte).includes(normalizar(query)) ||
    normalizar(d["Nombre de la institución o espacio"]).includes(normalizar(query)) ||
    normalizar(d.Barrio).includes(normalizar(query))
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Deportes en Pilar</h1>
      <input
        type="text"
        placeholder="Buscar deporte..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {resultados.length === 0 ? (
          <p>No se encontraron resultados</p>
        ) : (
          resultados.map((d, i) => (
            <div key={i} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              width: '300px',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ marginTop: 0 }}>{d.Deporte}</h3>
              <p><strong>{d["Nombre de la institución o espacio"]}</strong></p>
              <p>{d.Calle} {d.Número}, {d.Barrio}</p>
              <p>Arancelado: {d["Actividad / Deporte arancelado"]}</p>
              <p>Género: {d.Género}</p>
              <p>Edades: {d["Edades / Categorías"]}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;