import {
  useGetVerificationsQuery,
  useApproveVerificationMutation,
  useRejectVerificationMutation,
  useDeleteVerificationMutation,
  useVerifyUserMutation,
  useUnverifyUserMutation,
} from "../store/verificationsApi";

function VerificationList() {
  const { data, isLoading } = useGetVerificationsQuery();
  const [approveVerification] = useApproveVerificationMutation();
  const [rejectVerification] = useRejectVerificationMutation();
  const [deleteVerification] = useDeleteVerificationMutation();
  const [verifyUser] = useVerifyUserMutation();
  const [unverifyUser] = useUnverifyUserMutation();

  const handleApprove = (id) => {
    approveVerification(id);
  };

  const handleReject = (id) => {
    rejectVerification(id);
  };

  const handleDelete = (id) => {
    deleteVerification(id);
  };

  const handleVerifyUser = (id) => {
    verifyUser(id);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const pendingVerifications = data.filter(
    (verification) => verification.verification_status === "pending"
  );
  const approvedVerifications = data.filter(
    (verification) => verification.verification_status === "approved"
  );
  const rejectedVerifications = data.filter(
    (verification) => verification.verification_status === "rejected"
  );

  return (
    <center>
      <div className="box-content w-100 py-16 px-32 border-0">
        <table className="w-full text-center border-collapse">
          <thead className="border-b-4 border-orange">
            <tr>
              <th className="p-2">Username</th>
              <th className="p-2">Document</th>
              <th className="p-2">Verification Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ...pendingVerifications,
              ...approvedVerifications,
              ...rejectedVerifications,
            ].map((verification) => (
              <tr
                key={verification.id}
                className="bg-white border-gray-300 border-0 border-b-2 border-blue"
              >
                <td className="p-2">
                  <center>{verification.username}</center>
                </td>
                <td>
                  <center>
                    <img
                      className="py-2 hover:scale-[420%]"
                      src={verification.license}
                      style={{ width: "100px" }}
                      alt=""
                    />
                  </center>
                </td>
                <td className="p-2">
                  <center>{verification.verification_status}</center>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => [
                      handleApprove(verification.id),
                      handleVerifyUser(verification.user_id),
                    ]}
                    className="bg-green px-6 py-1 rounded-md border-blue border-[2px] hover:scale-105"
                  >
                    Approve
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => [
                      handleReject(verification.id),
                      unverifyUser(verification.user_id),
                    ]}
                    className="bg-orange px-8 py-1 rounded-md border-blue border-[2px] hover:scale-105"
                  >
                    Reject
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(verification.id)}
                    className="bg-red px-8 py-1 rounded-md border-blue border-[2px] hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </center>
  );
}

export default VerificationList;
