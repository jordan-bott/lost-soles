import { useGetUsersQuery, useDeleteUserMutation } from "../store/usersApi";
import LoginError from "./loginError";
import { useGetTokenQuery } from "../store/authApi";

function ListUsers() {
  const { data: user } = useGetTokenQuery();
  const { data, isLoading } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      window.location.reload();
    } catch (err) {
      console.log("Delete error: ", err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <LoginError />;
  }

  return (
    <div className="table-container p-12 my-4">
      <table className="w-full text-center border-collapse">
        <thead className="border-b-4 border-orange">
          <tr>
            <th className="p-2">Username</th>
            <th className="p-2">Sockstar Score</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Address</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="bg-white border-gray-300 border-0">
              <td className="p-2 border-b border-blue">{user.username}</td>
              <td className="p-2 border-b border-blue">
                {user.sockstar_points}
              </td>
              <td className="p-2 border-b border-blue">{user.first_name}</td>
              <td className="p-2 border-b border-blue">{user.email}</td>
              <td className="p-2 border-b border-blue">{user.address}</td>
              <td className="p-2 border-b border-blue">
                <button
                  className="bg-red px-2 py-1 rounded-md border-blue border-[2px] hover:scale-105"
                  disabled={isDeleting}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListUsers;
