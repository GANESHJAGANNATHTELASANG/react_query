export const getUsers = async () => {
  const response = await fetch("https://dummyjson.com/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();

  return data;
};
