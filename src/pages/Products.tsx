import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";

function Products() {
  const [search, setSearch] = useState("");

  const { data, isPending, error } = useQuery({
    queryKey: ["products", search],
    queryFn: () => getProducts(search),
    enabled: search.length > 0,
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 rounded border px-4 py-2"
      />

      {isPending && <p className="mt-4">Loading...</p>}

      {error && <p className="mt-4">Failed to load products</p>}

      <div className="mt-4">
        {data?.products?.map((product: any) => (
          <div key={product.id} className="mb-2">
            {product.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
