import React from "react";
import { useGetTokenQuery } from "../store/authApi";
import { useDeleteSockMutation } from "../store/socksApi";
import { useGetSocksByUserQuery } from "../store/socksApi";
import { useUpdateSockMutation } from "../store/socksApi";
import sockstar from "../images/sockstar.png";

function SockDrawer() {
  const { data: token, isLoading, error } = useGetTokenQuery();
  const userId = token.account.id;
  const { data: socks } = useGetSocksByUserQuery(userId);
  console.log(socks);
  const [deleteSock, { isLoading: isDeleting, error: deleteError }] =
    useDeleteSockMutation();
  const [updateSock, { isLoading: isUpdating, error: updateError }] =
    useUpdateSockMutation();

  if (isDeleting) {
    return <div>Deleting...</div>;
  }

  if (isUpdating) {
    return <div>Updating...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
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

  if (updateError) {
    return (
      <div>
        An error occurred while updating the sock: {updateError.message}
      </div>
    );
  }

  const formattedDate = new Date(token.account.created_on).toLocaleDateString();

  return (
    <div>
      <div className="flex justify-between">
        <div className="place-items-center align-middle grid grid-rows-auto grid-cols-3 pt-20 pb-12 gap-y-8">
          <div className="carousel carousel-center max-w-6xl p-4 space-x-10 bg-background rounded-box ">
            {socks?.map((sock) => (
              <div key={sock.id}>
                <div className="flex flex-col items-center hover:scale-105 rounded-xl overflow-hidden shadow-2xl card col-auto w-[365px] carousel-item">
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
                        <p className="pl-1.5">
                          {token.account.sockstar_points}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex place-content-center h-72 w-72">
                    <img
                      className="m-2 flex items-center justify-center h-72 w-72 object-cover rounded-lg border-blue border-2"
                      src={sock.photo}
                      alt="Sunset in the mountains"
                    />
                  </div>
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
                    <div></div>
                    <button
                      onClick={() =>
                        deleteSock({
                          user_id: sock.user_id,
                          sock_id: sock.id,
                        })
                      }
                      type="button"
                      className="delete-button px-3 py-1 text-sm font-bold mr-2 mb-2 rounded inline-block transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3)"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        updateSock({
                          user_id: sock.user_id,
                          sock_id: sock.id,
                        })
                      }
                      type="button"
                      className="update-button px-3 py-1 text-sm font-bold mr-2 mb-2 rounded inline-block transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3)"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div key={token.account.id}>
            <div className="place-items-center align-middle grid grid-rows-auto grid-cols-3 pt-20 pb-12 gap-y-8">
              <div className="flex flex-col items-center hover:scale-105 rounded-xl overflow-hidden shadow-2xl user-card col-auto w-[365px]">
                <div className="flex justify-between items-center w-[95%]">
                  <p className="font-black text-center pt-5 pb-2 w-full text-xl">
                    <span className="inline-block align-middle">
                      @{token.account.username}
                    </span>
                  </p>
                  <p></p>
                </div>
                <div className="flex place-content-center h-72 w-72">
                  <img
                    className="m-2 flex items-center justify-center h-60 w-60 object-cover rounded-lg border-yellow border-2"
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
                  <div className="absolute flex w-[100%] top-[40%] font-black text-right place-content-center">
                    <p className="pl-1.5">{token.account.sockstar_points}</p>
                  </div>
                </div>
                <div className="bg-yellow border border-blue inline-block rounded px-2 py-2 text-base font-semibold my-5 mr-3 mb-3">
                  <p className="font-semibold text-center">
                    User Since {formattedDate}
                  </p>
                  <p className="font-semibold text-center">
                    Total Pairings: {token.account.total_pairings}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2"></div>
                <div className="px-6 pt-1 pb-2 justify-center items-start"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SockDrawer;
