import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListaTareas from './ListaTareas';

describe('Pruebas en ListaTareas', () => {

  // Consigna 1
  it('Verifica el estado inicial: debe mostrar "No hay tareas" y "Total: 0"', () => {
    render(<ListaTareas />);
    expect(screen.getByText('No hay tareas')).toBeInTheDocument();
    expect(screen.getByText('Total: 0')).toBeInTheDocument();
  });

  // Consigna 2
  it('Agrega una tarea y comprueba que aparece en la lista y que el input queda vacío', async () => {
    const user = userEvent.setup();
    render(<ListaTareas />);
    
    const input = screen.getByLabelText('Nueva tarea');
    const botonAgregar = screen.getByRole('button', { name: 'Agregar' });

    await user.type(input, 'Comprar pan');
    await user.click(botonAgregar);

    expect(screen.getByText('Comprar pan')).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(screen.getByText('Total: 1')).toBeInTheDocument();
  });

  // Consigna 3
  it('Comprueba que no se agregan tareas vacías ni con solo espacios', async () => {
    const user = userEvent.setup();
    render(<ListaTareas />);
    
    const input = screen.getByLabelText('Nueva tarea');
    const botonAgregar = screen.getByRole('button', { name: 'Agregar' });

    await user.click(botonAgregar);
    await user.type(input, '   ');
    await user.click(botonAgregar);

    expect(screen.getByText('No hay tareas')).toBeInTheDocument();
    expect(screen.getByText('Total: 0')).toBeInTheDocument();
  });

  // Consigna 4
  it('Agrega dos tareas, elimina una y verifica que la otra sigue ahí y que el total es 1', async () => {
    const user = userEvent.setup();
    render(<ListaTareas />);
    
    const input = screen.getByLabelText('Nueva tarea');
    const botonAgregar = screen.getByRole('button', { name: 'Agregar' });

    await user.type(input, 'Estudiar React');
    await user.click(botonAgregar);
    await user.type(input, 'Hacer ejercicio');
    await user.click(botonAgregar);

    const botonEliminarReact = screen.getByRole('button', { name: /Eliminar.*Estudiar React/s });
    await user.click(botonEliminarReact);

    expect(screen.getByText('Hacer ejercicio')).toBeInTheDocument();
    expect(screen.getByText('Total: 1')).toBeInTheDocument();
  });

  // Desafío TDD - Punto 1
  it('Escribe un test que haga clic en un checkbox con etiqueta "Completar Comprar pan" y espere que el checkbox quede marcado', async () => {
    const user = userEvent.setup();
    render(<ListaTareas />);
    
    const input = screen.getByLabelText('Nueva tarea');
    const botonAgregar = screen.getByRole('button', { name: 'Agregar' });

    await user.type(input, 'Comprar pan');
    await user.click(botonAgregar);

    const checkbox = screen.getByRole('checkbox', { name: /Completar.*Comprar pan/s });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  // Desafío TDD - Punto 4
  it('el texto "Pendientes: N" debe descontar las tareas completadas', async () => {
    const user = userEvent.setup();
    render(<ListaTareas />);
    
    const input = screen.getByLabelText('Nueva tarea');
    const botonAgregar = screen.getByRole('button', { name: 'Agregar' });

    await user.type(input, 'Tarea 1');
    await user.click(botonAgregar);
    await user.type(input, 'Tarea 2');
    await user.click(botonAgregar);

    expect(screen.getByText('Pendientes: 2')).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /Completar.*Tarea 1/s });
    await user.click(checkbox);

    expect(screen.getByText('Pendientes: 1')).toBeInTheDocument();
  });

});
