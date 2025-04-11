import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return (
        <div className="mt-4">
            <div className="text-center max-w-3xl mx-auto px-4 mb-8">
                <p className="text-lg font-medium text-muted-foreground">Descubre tu estilo único</p>
                <h4 className="mt-2 text-5xl font-extrabold uppercase">
                    Crombie
                </h4>
                <p className="my-4 text-lg">
                    Moda que te define, calidad que te inspira
                </p>
                <div className="flex gap-4 justify-center">
                    <Link 
                        href="/nueva-coleccion" 
                        className={buttonVariants({
                            size: "lg",
                            className: "rounded-full"
                        })}
                    >
                        Ver Colección
                    </Link>
                    <Link 
                        href="/club-crombie" 
                        className={buttonVariants({
                            variant: "outline",
                            size: "lg",
                            className: "rounded-full"
                        })}
                    >
                        Club Crombie
                    </Link>
                </div>
            </div>
            <div 
                className="h-[350px] lg:h-[600px] bg-cover bg-center mt-5 relative"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=80')"
                }}
            >
                <div className="absolute inset-0 bg-black/20" />
            </div>
        </div>
    );
}

export default BannerProduct;