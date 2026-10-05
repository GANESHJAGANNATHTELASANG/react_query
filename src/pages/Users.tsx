import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { getUsers, createUser, updateUser } from "../api/users";

function Users() {
  const queryClient = useQueryClient();
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

  const { isPending, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 10 * 1000,
    gcTime: 30 * 1000,
  });

  const cachedUsers = queryClient.getQueryData(["users"]);
  console.log("Cached users:", cachedUsers);
  if (isPending) {
    return <h1>Loading users...</h1>;
  }

  if (error) {
    return <h1>Failed to load users</h1>;
  }

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

  return (
    <div>
      <h1 className="text-3xl font-bold">Users</h1>

      <button
        onClick={() => refetch()}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Fetch Users Again
      </button>

      <button
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
        }}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
      >
        Invalidate Users
      </button>

      <button
        onClick={handleclick}
        className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
        disabled={mutate.isPending}
      >
        {mutate.isPending ? " Creating user..." : " create user"}
      </button>

      {mutate.isSuccess && <p>User created successfully ✅</p>}

      {mutate.isError && <p>Failed to create user ❌</p>}
      <div className="mt-4">
        <button
          onClick={handleUpdateClick}
          className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
          disabled={mutate.isPending}
        >
          {mutateUpdate.isPending ? " Updating user..." : " update user"}
        </button>

        {mutateUpdate.isSuccess && <p>User updated successfully ✅</p>}

        {mutateUpdate.isError && <p>Failed to update user ❌</p>}
      </div>
    </div>
  );
}

export default Users;
