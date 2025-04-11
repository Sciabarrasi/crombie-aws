"use client"
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from 'embla-carousel-autoplay'

export const dataCarouselTop = [
    {
        id: 1,
        title: "Envío Gratis en compras superiores a $3000",
        description: "Disfruta de envío gratuito en todos tus pedidos superiores a $3000",
        link: "#!"
    },
    {
        id: 2,
        title: "Nueva Colección Primavera/Verano 2024",
        description: "Descubre las últimas tendencias en moda para esta temporada",
        link: "#",
    },
    {
        id: 3,
        title: "Devoluciones gratuitas en 30 días",
        description: "Compra con confianza, devoluciones gratuitas en un plazo de 30 días",
        link: "#",
    },
    {
        id: 4,
        title: "Club Crombie",
        description: "Únete a nuestro club y disfruta de ventajas exclusivas y descuentos",
        link: "#",
    },
]


const CarouselTextBanner = () => {
    const router = useRouter()

    return (
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel className="w-full max-w-4xl mx-auto"
                plugins={[
                    Autoplay({
                        delay: 2500
                    })
                ]}
            >
                <CarouselContent>
                    {dataCarouselTop.map(({ id, title, link, description }) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
                            <div>
                                <Card className="shadow-none border-none bg-transparent">
                                    <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                                        <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                                        <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default CarouselTextBanner;