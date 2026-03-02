// Beginner: ISR revalidates static page at interval.
// Advanced: balances freshness and performance using cache revalidation.

type Product = { id: number; title: string; price: number };

async function getProducts(): Promise<Product[]> {
  const response = await fetch('https://dummyjson.com/products?limit=6', {
    next: { revalidate: 120 }
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  const data = await response.json();
  return data.products;
}

export default async function IsrCatalogPage() {
  const products = await getProducts();

  return (
    <main>
      <h1>Product Catalog (ISR)</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title} - ${product.price}</li>
        ))}
      </ul>
    </main>
  );
}
