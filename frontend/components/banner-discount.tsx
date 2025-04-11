import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerDiscount = () => {
    return (
        <div className="p-5 sm:p-20 text-center bg-gray-100 dark:bg-gray-800">
            <h2 className="uppercase font-black text-2xl text-primary">Rebajas de Temporada</h2>
            <h3 className="mt-3 font-semibold">Hasta un 50% de descuento en la colección de invierno</h3>

            <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
                <Link href="/category/rebajas" className={buttonVariants()}>Ver Rebajas</Link>
                <Link href="/club-crombie" className={buttonVariants({ variant: "outline" })}>Únete al Club Crombie</Link>
            </div>
        </div>
    );
}

export default BannerDiscount;