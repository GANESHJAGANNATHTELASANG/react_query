export const getUsers = async () => {
  const response = await fetch("https://dummyjson.com/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();

  return data;
};

export const createUser = async (user: {
  firstName: string;
  lastName: string;
}) => {
  const response = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export const updateUser = async ({
  id,
  firstName,
}: {
  id: number;
  firstName: string;
}) => {
  const response = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

export const deleteUser = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return response.json();
};

// src/api/users.ts

export const getUser = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const getUserPosts = async (userId: number) => {
  const response = await fetch(`https://dummyjson.com/posts/user/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }

  return response.json();
};
