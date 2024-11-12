// Categoría
export interface Categoria {
  categoria_id: number;
  nombre_categoria: string;
}

// Producto
export interface Producto {
  producto_id: number;
  nombre: string;
  categoria_id: number; // Relación con Categoria
  descripcion: string;
  precio_venta: number;
  fecha_creacion: Date;
}

// Medidas
export interface Medida {
  medida_id: number;
  unidad_medida: string;
}

// Tipo
export interface Tipo {
  tipo_id: number;
}

// Insumo
export interface Insumo {
  insumo_id: number;
  nombre: string;
  unidad_medida: string; // Puede relacionarse con Medida si es necesario
  costo_unitario: number;
  cantidad_disponible: number;
  tipo_id: number; // Relación con Tipo
}

// Producto-Insumo
export interface ProductoInsumo {
  producto_ins_id: number;
  producto_id: number; // Relación con Producto
  insumo_id: number; // Relación con Insumo
  cantidad_necesaria: number;
}

// Inventario
export interface Inventario {
  id_inventario: number;
  id_insumo: number; // Relación con Insumo
  cantidad_disponible: number;
  fecha_actualizacion: Date;
}

// Factura
export interface Factura {
  factura_id: number;
  fecha_venta: Date;
  id_online: number | null; // Puede ser nulo si no es venta online
  cliente_id: number; // Relación con Cliente
  fecha_actualizacion: Date;
}

// Venta
export interface Venta {
  id_venta: number;
  id_producto: number; // Relación con Producto
  id_factura: number; // Relación con Factura
  cantidad_vendida: number;
  subtotal: number;
}

// Costo de Producción
export interface CostoProduccion {
  id_costo_producc: number;
  id_producto: number; // Relación con Producto
  mano_de_obra: number;
  cliente_id: number; // Relación con Cliente
  fecha_actualizacion: Date;
}

// Cliente
export interface Cliente {
  id_cliente: number;
  full_name: string;
  email: string;
  telefono: string;
  direccion: string;
}
