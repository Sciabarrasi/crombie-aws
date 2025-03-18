'use client'

import ProductList from "@/components/productList";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";
import { getTestData } from "@/lib/api";

export default function Home() {
  const [data, setData] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTestData()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Bienvenido a MiTienda</h1>
        <div>
          <h1>Conexión Frontend - Backend</h1>
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
          {data ? <p>{data.message}</p> : <p>Cargando...</p>}
        </div>
        <ProductList />
      </main>
    </div>
  );
}
