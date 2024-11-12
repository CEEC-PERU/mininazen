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
    producto_id: 1,
    nombre: "Vela de Cera de Soya",
    categoria_id: 1,
    descripcion: "Vela de Cera de Soya (Aromática)",
    precio_venta: 5,
    fecha_creacion: new Date(),
  },
  {
    producto_id: 2,
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

const valor= [
   {
    valor_id : 1 ,
    nombre : "kg"
   },
   {
    valor_id : 2 ,
   nombre: "g"
   },
   {
    valor_id : 3 ,
    nombre: "mg"
   },
   {
    valor_id  : 4 ,
    nombre : "L"
  },
  {
    valor_id : 5 ,
    nombre: "mL"
  },
  {
    valor_id  : 6 ,
    nombre : "m"
  },
  {
    valor_id : 7 ,
    nombre: "cm"
  },
  {
    valor_id : 8 ,
    nombre: "mm"
  },
  {
    valor_id : 9 ,
    nombre: "u"
  },
  {
    valor_id : 10 ,
    nombre: "cdta"
  }
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

const AdminDashboard = () => {
  const [categorias, setCategorias] = useState(initialCategorias);
  const [productos, setProductos] = useState(initialProductos);
  const [insumos, setInsumos] = useState(InsumosUnidad);
  const [productoInsumo, setProductoInsumo] = useState(InsumoTotalCompra);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleCategoryChange = (categoria_id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoria_id)
        ? prev.filter((id) => id !== categoria_id)
        : [...prev, categoria_id]
    );
  };

  const filteredProductos = selectedCategories.length
    ? productos.filter((producto) =>
        selectedCategories.includes(producto.categoria_id)
      )
    : productos;

  const convertirUnidad = (cantidad: number, conversionFactor: number): number => {
    return cantidad * conversionFactor;
  };



  return (
    <div className="flex h-screen bg-white text-cyan-700">
      <SidebarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={`flex-1 p-6 transition-all duration-300 ${showSidebar ? "ml-16" : "ml-24"}`}>
        <Navbar bgColor="bg-cyan-800" paddingtop="pt-4" />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 ">Gestión de Ventas y Producción</h1>

          {/* Categorías */}
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

          {/* Mostrar productos */}
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
                  <tr key={producto.producto_id} className="hover:bg-cyan-100">
                    <td className="border px-4 py-2">{producto.nombre}</td>
                    <td className="border px-4 py-2">{producto.descripcion}</td>
                    <td className="border px-4 py-2">${producto.precio_venta}</td>
                    <td className="border px-4 py-2">
                   
                       
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
