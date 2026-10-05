// Medidas del producto (en cm), tal y como las devuelve la API
export interface Dimensions {
  width: number;   // ancho
  height: number;  // alto
  depth: number;   // fondo
}

// Un producto de https://dummyjson.com/products
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;  // descuento en %
  rating: number;
  stock: number;               // unidades disponibles
  brand: string;
  thumbnail: string;           // URL de la imagen
  dimensions: Dimensions;
}

// Respuesta completa de la API: los productos vienen dentro de "products"
export interface ProductsResponse {
  products: Product[];
  total: number;  // total de productos en la API
  skip: number;   // productos saltados
  limit: number;  // productos devueltos
}
