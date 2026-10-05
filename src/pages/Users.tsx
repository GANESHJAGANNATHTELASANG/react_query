import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUserPosts,
} from "../api/users";

import { useState } from "react";

function Users() {
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
    staleTime: 10 * 1000,
    gcTime: 30 * 1000,
  });

  const mutate = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      alert("Failed to create user: " + (error as Error).message);
    },

    onSettled: () => {
      console.log("at the end of the mutation, either success or error");
    },
  });

  const mutateUpdate = useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      alert("Failed to update user: " + (error as Error).message);
    },

    onSettled: () => {
      console.log("at the end of the mutation, either success or error");
    },
  });

  const mutateDelete = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      alert("Failed to delete user: " + (error as Error).message);
    },

    onSettled: () => {
      console.log("at the end of the mutation, either success or error");
    },
  });

  const handleDeleteClick = () => {
    mutateDelete.mutate(1);
  };

  const cachedUsers = queryClient.getQueryData(["users", page]);

  console.log("Cached users:", cachedUsers);

  const handleclick = () => {
    mutate.mutate({
      firstName: "john",
      lastName: "doe",
    });
  };

  const handleUpdateClick = () => {
    mutateUpdate.mutate({
      id: 1,
      firstName: "UpdatedFirstName",
    });
  };

  const userId = 1;

  const { data: user, isPending: userLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });

  const { data: posts, isPending: postsLoading } = useQuery({
    queryKey: ["user-posts", user?.id],
    queryFn: () => getUserPosts(user.id),
    enabled: !!user?.id,
  });

  // -----------------------------
  // Conditional returns AFTER hooks
  // -----------------------------

  if (isPending) {
    return <h1>Loading users...</h1>;
  }

  if (error) {
    return <h1>Failed to load users</h1>;
  }

  if (userLoading) {
    return <h1>Loading user...</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Users</h1>

      {/* Users */}
      <div className="mt-6">
        {data?.users?.map((user: any) => (
          <div key={user.id} className="mb-3 rounded border p-3">
            <h2 className="font-bold">
              {user.id}. {user.firstName} {user.lastName}
            </h2>

            <p>{user.email}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-bold">Page {page}</span>

        <button
          onClick={() => setPage((page) => page + 1)}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Next
        </button>
      </div>

      {/* Refetch */}
      <button
        onClick={() => refetch()}
        className="mt-6 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Fetch Users Again
      </button>

      {/* Invalidate */}
      <button
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
        }}
        className="mt-4 ml-2 rounded bg-red-500 px-4 py-2 text-white"
      >
        Invalidate Users
      </button>

      {/* Create */}
      <button
        onClick={handleclick}
        className="mt-4 ml-2 rounded bg-green-500 px-4 py-2 text-white"
        disabled={mutate.isPending}
      >
        {mutate.isPending ? "Creating user..." : "create user"}
      </button>

      {mutate.isSuccess && <p>User created successfully ✅</p>}

      {mutate.isError && <p>Failed to create user ❌</p>}

      {/* Update */}
      <div className="mt-4">
        <button
          onClick={handleUpdateClick}
          className="rounded bg-green-500 px-4 py-2 text-white"
          disabled={mutateUpdate.isPending}
        >
          {mutateUpdate.isPending ? "Updating user..." : "update user"}
        </button>

        {mutateUpdate.isSuccess && <p>User updated successfully ✅</p>}

        {mutateUpdate.isError && <p>Failed to update user ❌</p>}
      </div>

      {/* Delete */}
      <div className="mt-4">
        <button
          onClick={handleDeleteClick}
          className="rounded bg-red-500 px-4 py-2 text-white"
          disabled={mutateDelete.isPending}
        >
          {mutateDelete.isPending ? "Deleting user..." : "delete user"}
        </button>

        {mutateDelete.isSuccess && <p>User deleted successfully ✅</p>}

        {mutateDelete.isError && <p>Failed to delete user ❌</p>}
      </div>

      {/* Dependent Query */}
      <div className="mt-8">
        <h1 className="text-xl font-bold">User: {user.firstName}</h1>

        {postsLoading ? (
          <h2>Loading posts...</h2>
        ) : (
          <div>
            <h2 className="font-bold">Posts:</h2>

            {posts?.posts?.map((post: any) => (
              <p key={post.id}>{post.title}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
