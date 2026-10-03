import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getUsers } from "../api/users";

function Users() {
  const queryClient = useQueryClient();

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
    </div>
  );
}

export default Users;
