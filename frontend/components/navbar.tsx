"use client"
import { BaggageClaim, Heart, Menu, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { Button } from "./ui/button";
import { useState } from "react";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
    const router = useRouter()
    const cart = useCart()
    const { wishlistItems } = useWishlist()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <>
            <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex items-center justify-between h-16">
                    <div className="flex items-center gap-6">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="sm:hidden"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h1 
                            className="text-2xl font-bold cursor-pointer" 
                            onClick={() => router.push("/")}
                        >
                            Crom<span className="text-primary">bie</span>
                        </h1>
                    </div>

                    <div className="hidden sm:flex items-center gap-6">
                        <MenuList />
                    </div>

                    <div className="hidden sm:flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="relative"
                            onClick={() => router.push("/wishlist")}
                        >
                            <Heart 
                                className={`h-5 w-5 ${wishlistItems.length > 0 && 'fill-primary'}`}
                            />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Button>

                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="relative"
                            onClick={() => router.push("/cart")}
                        >
                            {cart.items.length === 0 ? (
                                <ShoppingCart className="h-5 w-5" />
                            ) : (
                                <>
                                    <BaggageClaim className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                        {cart.items.length}
                                    </span>
                                </>
                            )}
                        </Button>

                        <Button variant="ghost" size="icon" onClick={() => router.push("/account")}>
                            <User className="h-5 w-5" />
                        </Button>

                        <ToggleTheme />
                    </div>
                </div>
            </nav>

            <MobileMenu 
                isOpen={isMobileMenuOpen} 
                onClose={() => setIsMobileMenuOpen(false)} 
            />
        </>
    );
}

export default Navbar;