import React, { useState } from "react";

import Navbar from "../../components/Navbar";
import SidebarAdmin from "../../components/SidebarAdmin";
import "./../../app/globals.css";

const initialCategorias = [
  { categoria_id: 1, nombre_categoria: "Velas" },
  { categoria_id: 2, nombre_categoria: "Panadería" },
];

const initialProductos = [
  {
    producto_id: 1,
    nombre: "Vela de Cera de Parafina",
    categoria_id: 1,
    descripcion:"Vela de Cera de Parafina (Decorativa)",
    precio_venta: 5,
    fecha_creacion: new Date(),
  },
  {
    producto_id: 2,
    nombre: "Vela de Cera de Soya",
    categoria_id: 1,
    descripcion: "Vela de Cera de Soya (Aromática)",
    precio_venta: 5,
    fecha_creacion: new Date(),
  },
  {
    producto_id: 3,
    nombre: "Pan Integral",
    categoria_id: 2,
    descripcion: "Pan integral hecho en casa",
    precio_venta: 3,
    fecha_creacion: new Date(),
  },
];

const monedas = [
  {
    moneda_id : 1 ,
    nombre : "soles"
  },
  {
   moneda_id : 2 ,
   nombre: "dolares"
  },
];

const valores = [
  { valor_id: 1, nombre: "kg", factor: 1000 },
  { valor_id: 2, nombre: "g", factor: 1 },
  { valor_id: 3, nombre: "mg", factor: 0.001 },
  { valor_id: 4, nombre: "L", factor: 1000 },
  { valor_id: 5, nombre: "mL", factor: 1 },
  { valor_id: 6, nombre: "m", factor: 1 },
  { valor_id: 7, nombre: "cm", factor: 0.01 },
  { valor_id: 8, nombre: "mm", factor: 0.001 },
  { valor_id: 9, nombre: "u", factor: 1 },
  { valor_id: 10, nombre: "cdta", factor: 5 }, // 1 cdta equivale a 5 mL
];


//ingredientes nombres
const ingredientes = [
  {
    ingrediente_id: 1,
    nombre: "cera de soya",
  },
  { 
    ingrediente_id: 2,
    nombre: "Aceite esencial",
  },
  { 
    ingrediente_id: 3,
    nombre: "Colorante",
  },
];

//ingredientes por tipo de producto 
const InsumosUnidad = [
  {
    insumo_id: 1,
    producto: 1,
    ingrediente_id: 1,
    cantidad : 200,
    valor_id :2,
  },
  { 
    insumo_id: 2,
    producto: 1,
    ingrediente_id:2,
    cantidad : 10,
    valor_id :5,
  },
  { 
    insumo_id: 3,
    producto: 1,
    ingrediente_id:3,
    cantidad : 3,
    valor_id :10,
  },
];


const InsumoTotalCompra = [
  {
    compra_id: 1,
    ingrediente_id: 1,
    valor_id: 1,
    fecha_compra: Date.now(),
    cantidad: 1,
    cantidad_disponible: 1,
    costo:50, 
    moneda_id : 1 
  },
];

// Insumos en almacén para 40 productos
const AlmacenInsumos = [
  {
    almacen_id: 1,
    ingrediente_id: 1,
    cantidad: 1, // Ejemplo: suficiente para 40 productos de cera de soya
    valor_id: 1,
  },
  {
    almacen_id: 2,
    ingrediente_id: 2,
    cantidad: 1, // Ejemplo: suficiente para 40 productos de aceite esencial
    valor_id: 4,
  },
  {
    almacen_id: 3,
    ingrediente_id: 3,
    cantidad: 1, // Ejemplo: suficiente para 40 productos de colorante
    valor_id: 4,
  },
];



const AdminDashboard = () => {
  const [categorias, setCategorias] = useState(initialCategorias);
  const [productos, setProductos] = useState(initialProductos);
  const [insumos, setInsumos] = useState(InsumosUnidad);
  const [almacenInsumos, setAlmacenInsumos] = useState(AlmacenInsumos);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedProductoId, setSelectedProductoId] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleCategoryChange = (categoria_id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoria_id) ? prev.filter((id) => id !== categoria_id) : [...prev, categoria_id]
    );
  };

  const filteredProductos = selectedCategories.length
    ? productos.filter((producto) => selectedCategories.includes(producto.categoria_id))
    : productos;

  const obtenerInsumosPorProducto = (producto_id: number) => {
    return insumos
      .filter((insumo) => insumo.producto === producto_id)
      .map((insumo) => {
        const ingrediente = ingredientes.find((ing) => ing.ingrediente_id === insumo.ingrediente_id);
        const valor = valores.find((val) => val.valor_id === insumo.valor_id);
        return `${insumo.cantidad} ${valor?.nombre || ""} de ${ingrediente?.nombre || ""}`;
      })
      .join(", ");
  };

  const handleProductoSelect = (producto_id: number) => {
    setSelectedProductoId(producto_id);
  };

  const calcularStockPronosticado = (producto_id: number) => {
    const insumosProducto = insumos.filter((insumo) => insumo.producto === producto_id);
    let stockMaximo = Infinity;

    insumosProducto.forEach((insumo) => {
      const almacen = almacenInsumos.find((alm) => alm.ingrediente_id === insumo.ingrediente_id);
      if (almacen) {
        const insumoFactor = valores.find((val) => val.valor_id === insumo.valor_id)?.factor || 1;
        const almacenFactor = valores.find((val) => val.valor_id === almacen.valor_id)?.factor || 1;

        const cantidadNecesaria = insumo.cantidad * insumoFactor;
        const cantidadDisponible = almacen.cantidad * almacenFactor;

        const stockPorIngrediente = Math.floor(cantidadDisponible / cantidadNecesaria);
        stockMaximo = Math.min(stockMaximo, stockPorIngrediente);
      }
    });

    return stockMaximo === Infinity ? 0 : stockMaximo;
  };

  const insumosAlmacenProducto = selectedProductoId
    ? almacenInsumos.filter((insumoAlmacen) =>
        insumos.some(
          (insumo) =>
            insumo.producto === selectedProductoId &&
            insumo.ingrediente_id === insumoAlmacen.ingrediente_id
        )
      )
    : [];

  return (
    <div className="flex h-screen bg-white text-cyan-700">
      <SidebarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={`flex-1 p-6 transition-all duration-300 ${showSidebar ? "ml-16" : "ml-24"}`}>
        <Navbar bgColor="bg-cyan-800" paddingtop="pt-4" />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Gestión de Ventas y Producción</h1>

          <h2 className="text-xl mb-4">Categorías</h2>
          <div className="flex gap-4">
            {categorias.map((categoria) => (
              <label key={categoria.categoria_id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={categoria.categoria_id}
                  checked={selectedCategories.includes(categoria.categoria_id)}
                  onChange={() => handleCategoryChange(categoria.categoria_id)}
                  className="rounded text-cyan-900 focus:ring focus:ring-cyan-500"
                />
                {categoria.nombre_categoria}
              </label>
            ))}
          </div>

          <div className="overflow-x-auto mt-6">
            <h2 className="text-xl mb-4">Productos</h2>
            <table className="min-w-full border border-gray-300 bg-white text-black rounded-lg shadow-lg">
              <thead className="bg-cyan-700 text-white">
                <tr>
                  <th className="border px-4 py-2 text-left">Nombre</th>
                  <th className="border px-4 py-2 text-left">Descripción</th>
                  <th className="border px-4 py-2 text-left">Precio Venta</th>
                  <th className="border px-4 py-2 text-left">Insumos</th>
                </tr>
              </thead>
              <tbody>
                {filteredProductos.map((producto) => (
                  <tr
                    key={producto.producto_id}
                    className={`hover:bg-cyan-100 cursor-pointer ${
                      selectedProductoId === producto.producto_id ? "bg-cyan-200" : ""
                    }`}
                    onClick={() => handleProductoSelect(producto.producto_id)}
                  >
                    <td className="border px-4 py-2">{producto.nombre}</td>
                    <td className="border px-4 py-2">{producto.descripcion}</td>
                    <td className="border px-4 py-2">${producto.precio_venta}</td>
                    <td className="border px-4 py-2">
                      {obtenerInsumosPorProducto(producto.producto_id) || "No hay insumos"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-xl mb-4">
              {selectedProductoId ? `Almacén de Insumos para Producto ID ${selectedProductoId}` : "Almacén de Insumos"}
            </h2>
            <table className="min-w-full border border-gray-300 bg-white text-black rounded-lg shadow-lg">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border px-4 py-2 text-left">Ingrediente</th>
                  <th className="border px-4 py-2 text-left">Cantidad Disponible</th>
                  <th className="border px-4 py-2 text-left">Unidad</th>
                  <th className="border px-4 py-2 text-left">Stock Pronosticado</th>
                </tr>
              </thead>
              <tbody>
                {insumosAlmacenProducto.length > 0 ? (
                  insumosAlmacenProducto.map((insumo) => {
                    const ingrediente = ingredientes.find(
                      (ing) => ing.ingrediente_id === insumo.ingrediente_id
                    );
                    const valor = valores.find((val) => val.valor_id === insumo.valor_id);
                    const stockPronosticado = calcularStockPronosticado(selectedProductoId!);

                    return (
                      <tr key={insumo.almacen_id} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{ingrediente?.nombre || "Desconocido"}</td>
                        <td className="border px-4 py-2">{insumo.cantidad}</td>
                        <td className="border px-4 py-2">{valor?.nombre || "Desconocido"}</td>
                        <td className="border px-4 py-2">{stockPronosticado}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="border px-4 py-2" colSpan={4}>
                      No hay insumos disponibles para el producto seleccionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;