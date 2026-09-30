import { renderHook, act } from '@testing-library/react';
import { useContador } from './useContador';

describe('Pruebas en useContador', () => {

  // Consigna 1: Verifica que el valor inicial por defecto es 0
  it('Verifica que el valor inicial por defecto es 0', () => {
    const { result } = renderHook(() => useContador());
    expect(result.current.valor).toBe(0);
  });

  // Consigna 2: Verifica que acepta un valor inicial personalizado
  it('Verifica que acepta un valor inicial personalizado', () => {
    const { result } = renderHook(() => useContador({ inicial: 10 }));
    expect(result.current.valor).toBe(10);
  });

  // Consigna 3 (Parte A): Prueba incrementar con un paso de 5
  it('Prueba incrementar con un paso de 5', () => {
    const { result } = renderHook(() => useContador({ paso: 5 }));
    act(() => {
      result.current.incrementar();
    });
    expect(result.current.valor).toBe(5);
  });

  // Consigna 3 (Parte B): Prueba decrementar con un paso de 5
  it('Prueba decrementar con un paso de 5', () => {
    const { result } = renderHook(() => useContador({ inicial: 10, paso: 5 }));
    act(() => {
      result.current.decrementar();
    });
    expect(result.current.valor).toBe(5);
  });

  // Consigna 4: Verifica que el valor nunca supera max
  it('Verifica que el valor nunca supera max', () => {
    const { result } = renderHook(() => useContador({ inicial: 9, max: 10, paso: 5 }));
    act(() => {
      result.current.incrementar();
    });
    expect(result.current.valor).toBe(10);
  });

  // Consigna 5: Verifica que el valor nunca baja de min
  it('Verifica que el valor nunca baja de min', () => {
    const { result } = renderHook(() => useContador({ inicial: 2, min: 0, paso: 5 }));
    act(() => {
      result.current.decrementar();
    });
    expect(result.current.valor).toBe(0);
  });

  // Consigna 6: Prueba que reiniciar vuelve al valor inicial
  it('Prueba que reiniciar vuelve al valor inicial', () => {
    const { result } = renderHook(() => useContador({ inicial: 7 }));
    act(() => {
      result.current.incrementar();
      result.current.reiniciar();
    });
    expect(result.current.valor).toBe(7);
  });

});
