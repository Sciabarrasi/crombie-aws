import { ProductType } from "@/types/product";

export const sampleProducts: ProductType[] = [
    {
        id: 1,
        attributes: {
            productName: "Camisa Oxford Clásica",
            slug: "camisa-oxford-clasica",
            description: "Camisa Oxford de algodón 100% con corte clásico y cuello button-down",
            active: true,
            isFeatured: true,
            size: "M",
            color: "Blanco",
            price: 49.99,
            images: {
                data: [
                    {
                        id: 1,
                        attributes: {
                            url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60"
                        }
                    }
                ]
            },
            category: {
                data: {
                    attributes: {
                        slug: "camisas",
                        categoryName: "Camisas"
                    }
                }
            }
        }
    },
    {
        id: 2,
        attributes: {
            productName: "Pantalón Chino Slim Fit",
            slug: "pantalon-chino-slim-fit",
            description: "Pantalón chino en corte slim fit con tejido resistente y cómodo",
            active: true,
            isFeatured: true,
            size: "32",
            color: "Beige",
            price: 59.99,
            images: {
                data: [
                    {
                        id: 2,
                        attributes: {
                            url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60"
                        }
                    }
                ]
            },
            category: {
                data: {
                    attributes: {
                        slug: "pantalones",
                        categoryName: "Pantalones"
                    }
                }
            }
        }
    },
    {
        id: 3,
        attributes: {
            productName: "Chaqueta Bomber",
            slug: "chaqueta-bomber",
            description: "Chaqueta bomber en nylon con forro interior y ribetes elásticos",
            active: true,
            isFeatured: true,
            size: "L",
            color: "Negro",
            price: 89.99,
            images: {
                data: [
                    {
                        id: 3,
                        attributes: {
                            url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60"
                        }
                    }
                ]
            },
            category: {
                data: {
                    attributes: {
                        slug: "chaquetas",
                        categoryName: "Chaquetas"
                    }
                }
            }
        }
    },
    {
        id: 4,
        attributes: {
            productName: "Jersey de Punto",
            slug: "jersey-punto",
            description: "Jersey de punto fino en lana merino, perfecto para capas",
            active: true,
            isFeatured: true,
            size: "S",
            color: "Gris",
            price: 45.99,
            images: {
                data: [
                    {
                        id: 4,
                        attributes: {
                            url: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=500&auto=format&fit=crop&q=60"
                        }
                    }
                ]
            },
            category: {
                data: {
                    attributes: {
                        slug: "jerseys",
                        categoryName: "Jerseys"
                    }
                }
            }
        }
    },
    {
        id: 5,
        attributes: {
            productName: "Zapatos Oxford",
            slug: "zapatos-oxford",
            description: "Zapatos Oxford en piel de becerro con suela de cuero",
            active: true,
            isFeatured: true,
            size: "42",
            color: "Marrón",
            price: 129.99,
            images: {
                data: [
                    {
                        id: 5,
                        attributes: {
                            url: "https://images.unsplash.com/photo-1548661710-7f540c9c56d6?w=500&auto=format&fit=crop&q=60"
                        }
                    }
                ]
            },
            category: {
                data: {
                    attributes: {
                        slug: "calzado",
                        categoryName: "Calzado"
                    }
                }
            }
        }
    }
]; 