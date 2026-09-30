import { formatearPrecio, aplicarDescuento } from './precio';


  describe('formatearPrecio', () => {
    // 1. Prueba con al menos 4 casos usando it.each
    // 2. Incluye la verificación de redondeo de decimales (1999.6 -> $2.000)
    it.each([
      [1000, '$1.000'],
      [500000, '$500.000'],
      [1999.6, '$2.000'],
      [12.4, '$12']
    ])('debería formatear %s como %s', (valor, resultadoEsperado) => {
      expect(formatearPrecio(valor)).toBe(resultadoEsperado);
    });

    // 3. Verifica que lanza error con 'abc' y con NaN
    it('debería lanzar un error si se pasa un string o NaN', () => {
      expect(() => formatearPrecio('abc')).toThrow('Valor inválido');
      expect(() => formatearPrecio(NaN)).toThrow('Valor inválido');
    });
  });

  describe('aplicarDescuento', () => {
    // 4. Prueba aplicarDescuento con 0%, 15% y 100%
    it.each([,
 ,
      [1000, 100, 0]
    ])('con precio %s y descuento %s% debería dar %s', (precio, porcentaje, resultadoEsperado) => {
      expect(aplicarDescuento(precio, porcentaje)).toBe(resultadoEsperado);
    });

    // 5. Verifica que aplicarDescuento lanza error con 150%
    it('debería lanzar un error si el porcentaje es mayor a 100', () => {
      expect(() => aplicarDescuento(1000, 150)).toThrow('Porcentaje inválido');
    });
  });

