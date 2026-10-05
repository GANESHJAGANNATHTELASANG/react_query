export const getProducts = async (search: string) => {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${search}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
