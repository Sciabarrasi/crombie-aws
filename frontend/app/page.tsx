import { LoginForm } from '@/components/auth/LoginForm';
import { ProductList } from '@/components/products/ProductList';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Crombie Store</h1>
          {isAuthenticated ? (
            <Button onClick={logout}>Cerrar Sesión</Button>
          ) : (
            <LoginForm />
          )}
        </div>
        <ProductList />
      </div>
    </main>
  );
}

