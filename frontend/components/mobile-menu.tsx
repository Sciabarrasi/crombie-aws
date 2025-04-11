"use client"
import { Heart, ShoppingCart, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { useCategories } from "@/hooks/use-categories";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const { categories } = useCategories();
    const router = useRouter();
    const cart = useCart();
    const { wishlistItems } = useWishlist();

    if (!isOpen) return null;

    const navigate = (path: string) => {
        router.push(path);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-background">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    <h1 className="text-2xl font-bold">
                        Crom<span className="text-primary">bie</span>
                    </h1>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* User Actions */}
                <div className="grid grid-cols-3 gap-2 p-4 border-b">
                    <Button 
                        variant="outline" 
                        className="flex flex-col items-center gap-1 h-auto py-4"
                        onClick={() => navigate("/wishlist")}
                    >
                        <Heart className={`h-5 w-5 ${wishlistItems.length > 0 && 'fill-primary'}`} />
                        <span className="text-xs">Wishlist</span>
                        {wishlistItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                {wishlistItems.length}
                            </span>
                        )}
                    </Button>
                    <Button 
                        variant="outline"
                        className="flex flex-col items-center gap-1 h-auto py-4"
                        onClick={() => navigate("/cart")}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="text-xs">Carrito</span>
                        {cart.items.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                {cart.items.length}
                            </span>
                        )}
                    </Button>
                    <Button 
                        variant="outline"
                        className="flex flex-col items-center gap-1 h-auto py-4"
                        onClick={() => navigate("/account")}
                    >
                        <User className="h-5 w-5" />
                        <span className="text-xs">Cuenta</span>
                    </Button>
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1">
                    <div className="p-4">
                        <Button 
                            variant="ghost" 
                            className="w-full justify-start text-lg font-medium mb-2"
                            onClick={() => navigate("/")}
                        >
                            Inicio
                        </Button>

                        <Button 
                            variant="ghost" 
                            className="w-full justify-start text-lg font-medium mb-2"
                            onClick={() => navigate("/nueva-coleccion")}
                        >
                            Nueva Colección
                        </Button>

                        <Separator className="my-4" />
                        
                        <div className="text-sm font-medium text-muted-foreground mb-2 px-3">
                            Categorías
                        </div>
                        {categories.map((category) => (
                            <Button 
                                key={category.id}
                                variant="ghost" 
                                className="w-full justify-start text-lg"
                                onClick={() => navigate(`/category/${category.attributes.slug}`)}
                            >
                                {category.attributes.categoryName}
                            </Button>
                        ))}

                        <Separator className="my-4" />

                        <Button 
                            variant="ghost" 
                            className="w-full justify-start text-lg font-medium"
                            onClick={() => navigate("/club-crombie")}
                        >
                            Club Crombie
                        </Button>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default MobileMenu; 