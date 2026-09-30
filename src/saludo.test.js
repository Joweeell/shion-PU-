import { describe, it, expect } from "vitest"; 
import { saludo, suma } from "./saludo.js"; 

describe('saludo', () => { 
  it('Saluda correctamente', () => { 
    expect(saludo()).toBe('Hola Noelia'); 
  });
});
describe('Validacion suma', () => { 
  it('Suma correcta', () => { 
    expect(suma()).toBe(17); 
  });
});