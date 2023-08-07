import React from "react";
import { useGetTokenQuery } from "../store/authApi";
import { useDeleteSockMutation } from "../store/socksApi";
import { useGetSocksByUserQuery } from "../store/socksApi";
import { useState } from "react";
import { useDeleteUserMutation } from "../store/usersApi";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/authApi";
import sockstar from "../images/sockstar.png";
import LoginError from "./auth/loginError";
import { toast } from "react-toastify";

function SockDrawer() {
  const { data: token, isLoading, error } = useGetTokenQuery();
  const userId = token?.account?.id;
  const verified = token?.account?.verified;
  const { data: socks } = useGetSocksByUserQuery(userId);
  const [deleteSock, { isLoading: isDeleting, error: deleteError }] =
    useDeleteSockMutation();
  const [deleteUser, { isLoading: userIsDeleting, error: userDeleteError }] =
    useDeleteUserMutation();
  const [alert, setAlert] = useState(false);
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();

  const handleAlert = () => {
    setAlert(!alert);
  };

  const handleDelete = async () => {
    const result = await deleteUser(userId);
    if (!result.hasOwnProperty("error")) {
      logoutUser();
      navigate("/");
      toast(
        "We're sad to see you go! Your account has been successfully deleted."
      );
    }
  };

  if (isDeleting) {
    return <div>Deleting...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <LoginError />;
  }

  if (userIsDeleting) {
    return <div>User is deleting</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (deleteError) {
    return (
      <div>
        An error occurred while deleting the sock: {deleteError.message}
      </div>
    );
  }

  if (userDeleteError) {
    return (
      <div>
        An error occurred while deleting the user: {userDeleteError.message}
      </div>
    );
  }

  const formattedDate = new Date(token.account.created_on).toLocaleDateString();

  return (
    <div className="flex max-w-screen justify-around">
      <div className="flex">
        {socks === undefined ? (
          <div className="p-16 mt-12 text-xl">
            Uh oh. You haven't posted any socks!
          </div>
        ) : (
          <div className="carousel carousel-center max-w-[1269px] p-16 space-x-10 bg-background rounded-box mt-12">
            {socks?.map((sock) => (
              <div
                key={sock.id}
                className="flex flex-col items-center hover:scale-105 h-[575px] rounded-xl overflow-hidden card col-auto w-[365px] carousel-item"
              >
                <div className="flex justify-between items-center w-[95%]">
                  <div className="flex pt-1.5">
                    <img
                      src={token.account.profile_pic}
                      className="rounded-full w-[67px] h-[67px] object-cover border-blue border-2 mr-2"
                      alt=""
                    />
                    <p className="font-black text-l text-left content-center self-center">
                      @{token.account.username}
                    </p>
                  </div>
                  <div className="relative">
                    <img
                      src={sockstar}
                      className="w-[65px] h-[82px] mt-2 object-fill"
                      alt="orange sock with yellow toe and heel that displays the users sockstar points"
                    />
                    <div className="absolute flex w-[100%] top-[40%] font-black text-right place-content-center">
                      <p className="pl-1.5">{token.account.sockstar_points}</p>
                    </div>
                  </div>
                </div>
                <div className="flex place-content-center">
                  <button onClick={() => navigate(`/socks/${sock.id}`)}>
                    <img
                      className="m-2 flex items-center justify-center h-72 w-72 object-cover rounded-lg border-blue border-2"
                      src={sock.photo}
                      alt="Sunset in the mountains"
                    />
                  </button>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="px-6 pt-4 pb-2"></div>
                  <div className="flex flex-wrap px-1 pt-1 pb-2 items-start content-center h-[85px] w-72">
                    <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                      {sock.size}
                    </span>
                    {sock.color === "Other" ? null : (
                      <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                        {sock.color}
                      </span>
                    )}
                    {sock.pattern === "Other" ? null : (
                      <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                        {sock.pattern}
                      </span>
                    )}
                    {sock.fabric === "Other" ? null : (
                      <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                        {sock.fabric}
                      </span>
                    )}
                    <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                      {sock.type === "Other" ? null : sock.type}
                    </span>
                  </div>
                  <div className="flex place-content-center gap-x-5">
                    <button
                      onClick={() => navigate(`/socks/${sock.id}`)}
                      type="button"
                      className="bg-green w-[35%] p-2 text-m font-bold mb-2 rounded-lg border-2 border-blue hover:scale-105"
                    >
                      Update
                    </button>
                    <button
                      onClick={() =>
                        deleteSock({
                          user_id: sock.user_id,
                          sock_id: sock.id,
                        })
                      }
                      type="button"
                      className="bg-red w-[35%] p-2 text-m font-bold mb-2 rounded-lg border-2 border-blue hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex content-center mt-16 relative">
        <div key={token.account.id}>
          <div className="flex flex-col items-center hover:scale-105 rounded-xl overflow-hidden shadow-2xl user-card col-auto w-[365px] gap-y-2">
            <div className="flex justify-between items-center w-[95%]">
              <p className="font-black text-center pt-5 pb-2 w-full text-xl">
                <span className="inline-block align-middle">
                  @{token.account.username}
                </span>
              </p>
              <p></p>
            </div>
            <div className="flex place-content-center">
              <img
                className="m-2 flex items-center justify-center h-60 w-60 object-cover rounded-lg border-orange border-4"
                src={token.account.profile_pic}
                alt="sock"
              />
            </div>
            <div className="relative">
              <img
                src={sockstar}
                className="w-[65px] h-[82px] mt-2 object-fill"
                alt="orange sock with yellow toe and heel that displays the users sockstar points"
              />
              <div className="absolute flex w-[100%] top-[40%] font-black text-right place-content-center ">
                <p className="pl-1.5">{token.account.sockstar_points}</p>
              </div>
            </div>
            <div className="bg-yellow border-2 border-blue inline-block rounded-lg p-2 text-base font-semibold mt-2 mb-6">
              <p className="font-semibold text-center">
                User Since {formattedDate}
              </p>
              <p className="font-semibold text-center">
                Total Pairings: {token.account.total_pairings}
              </p>
            </div>
          </div>
          <div className="flex-col flex justify-center items-center pt-8">
            <button
              onClick={() => handleAlert(true)}
              type="button"
              className="bg-red w-[60%] p-2 text-m font-bold mb-2 rounded-lg border-2 border-blue hover:scale-105"
            >
              Delete your account
            </button>
            {verified === false ? (
              <button
                onClick={() => navigate(`/users/verify`)}
                type="button"
                className="bg-green w-[50%] p-2 text-m font-bold mb-2 rounded-lg border-2 border-blue hover:scale-105"
              >
                Verify your account
              </button>
            ) : null}
            <button
              onClick={() => navigate(`/users/${userId}`)}
              type="button"
              className="bg-yellow w-[68%] p-2 text-m font-bold mb-2 rounded-lg border-2 border-blue hover:scale-105"
            >
              Update your account
            </button>
            <div className="z-40 absolute top-[100%]">
              {alert ? (
                <div className="alert bg-yellow shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-info flex-shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>
                      Are you sure you want to delete your account? This is
                      permanent, your sock listings will be removed.
                    </span>
                  </div>
                  <div className="flex content-center">
                    <div className="flex place-items-center">
                      <button
                        onClick={() => handleAlert(false)}
                        className="bg-green border-2 border-blue p-1 mt-8 w-[100%] px-1 py-1 text-sm font-bold mb-2 rounded-lg hover:scale-105"
                      >
                        No, don't delete my account!
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDelete()}
                        className="mt-6 content-center bg-red border-2 border-blue p-1 w-[100%] px-1 py-1 text-sm font-bold rounded-lg hover:scale-105"
                      >
                        Yes, delete my account.
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SockDrawer;
