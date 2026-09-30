import { useRef, useState } from 'react';

export default function ListaTareas() {
    const [tareas, setTareas] = useState([]);
    const [texto, setTexto] = useState('');
    const siguienteId = useRef(1);
    const agregar = (e) => {
        e.preventDefault();
        const limpio = texto.trim();
        if (!limpio) return;
        // Se añade 'completada: false' al objeto
        setTareas([...tareas, { id: siguienteId.current++, texto: limpio, completada: false }]);
        setTexto('');
    };
    const eliminar = (id) => setTareas(tareas.filter((t) => t.id !== id));
    
    // Función añadida para marcar/desmarcar tareas
    const conmutarCompletada = (id) => setTareas(tareas.map((t) => t.id === id ? { ...t, completada: !t.completada } : t));

return (
    <section>
        <form onSubmit={agregar}>
            <label htmlFor="nueva">Nueva tarea</label>
            <input id="nueva" value={texto} onChange={(e) =>
setTexto(e.target.value)} />
            <button type="submit">Agregar</button>
        </form>
        {tareas.length === 0 ? (
            <p>No hay tareas</p>
        ) : (
            <ul>
                {tareas.map((t) => (
                <li key={t.id}>
                    {/* Checkbox añadido para el desafío */}
                    <input 
                        type="checkbox" 
                        checked={t.completada || false} 
                        onChange={() => conmutarCompletada(t.id)} 
                        aria-label={`Completar\n${t.texto}`}
                    />
                    <span>{t.texto}</span>
                    <button onClick={() => eliminar(t.id)} aria-label={`Eliminar
${t.texto}`}>
                        ✕
                    </button>
                </li>
                ))}
            </ul>
            )}
            <p>Total: {tareas.length}</p>
            {/* Texto de pendientes añadido para el desafío */}
            <p>Pendientes: {tareas.filter(t => !t.completada).length}</p>
        </section>
    );
}
