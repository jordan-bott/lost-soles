import sockstar from "../images/sockstar.png";
import checkmark from "../images/verification-check.png";
import { useNavigate } from "react-router-dom";
import { useGetOneMatchQuery } from "../store/matchApi";
import { useParams } from "react-router-dom";
import { useGetTokenQuery } from "../store/authApi";
import { useGetUserQuery, useAddSockstarMutation } from "../store/usersApi";
import {
  useApproveMatchMutation,
  useRejectMatchMutation,
} from "../store/matchApi";
import { useSendReceiveMutation, useSendGiftMutation } from "../store/emailApi";
import { toast } from "react-toastify";
import { useMatchedMutation, useRejectedMutation } from "../store/socksApi";

function MatchApproval() {
  const { id } = useParams();
  const { data: user, isLoading: userLoading } = useGetTokenQuery();
  const { data: match, isLoading: matchLoading } = useGetOneMatchQuery({
    id: `${id}`,
    user_id: user?.account.id,
  });

  const [approveMatch] = useApproveMatchMutation();
  const [rejectMatch] = useRejectMatchMutation();
  const [receiveEmail] = useSendReceiveMutation();
  const [giftEmail] = useSendGiftMutation();
  const [addSockstar] = useAddSockstarMutation();
  const [matched] = useMatchedMutation();
  const [rejected] = useRejectedMutation();

  const navigate = useNavigate();

  const giftSock = match?.gift_sock;
  const receiveSock = match?.receive_sock;

  const { data: giftUser, isLoading: giftUserLoading } = useGetUserQuery(
    `${giftSock?.user_id}`
  );
  const { data: receiveUser, isLoading: receiveUserLoading } = useGetUserQuery(
    `${receiveSock?.user_id}`
  );

  if (userLoading || matchLoading || giftUserLoading || receiveUserLoading) {
    return <p>Is loading ...</p>;
  }

  let otherUser = null;

  giftUser?.id === user?.account.id
    ? (otherUser = receiveUser)
    : (otherUser = giftUser);

  let formattedDate = new Date(otherUser?.created_on).toLocaleDateString();

  const handleApprove = async () => {
    const approveResult = await approveMatch(match.id);
    const sockResult1 = await matched(giftSock.id);
    const sockResult2 = await matched(receiveSock.id);
    if (
      !approveResult.hasOwnProperty("error") &&
      !sockResult1.hasOwnProperty("error") &&
      !sockResult2.hasOwnProperty("error")
    ) {
      const giftEmailResult = await giftEmail({
        user_email: giftUser.email,
        username: receiveUser.username,
        user_address: receiveUser.address,
      });
      if (!giftEmailResult.hasOwnProperty("error")) {
        const sockstarResult = await addSockstar({
          user_id: giftUser.id,
          points: giftUser.sockstar_points + 1,
        });
        if (!sockstarResult.hasOwnProperty("error")) {
          const receiveEmailResult = await receiveEmail({
            user_email: receiveUser.email,
            username: giftUser.username,
          });
          if (!receiveEmailResult.hasOwnProperty("error")) {
            toast("Match approved! Check your email for more details 💌 ");
            navigate("/");
          } else {
            toast("Uh oh, something bad happened.");
          }
        } else {
          toast("Uh oh, something bad happened.");
        }
      } else {
        toast("Uh oh, something bad happened.");
      }
    } else {
      toast("Uh oh, something bad happened.");
    }
  };

  const handleRejection = async () => {
    const result = await rejectMatch({
      match_id: match.id,
      requesting_user: otherUser.id,
      approving_user: user.account.id,
    });
    if (!result.hasOwnProperty("error")) {
      const sock1 = await rejected(giftSock.id);
      const sock2 = await rejected(receiveSock.id);
      if (!sock1.hasOwnProperty("error") && !sock2.hasOwnProperty("error")) {
        toast("This match has been rejected");
        navigate("/");
      } else {
        toast("Uh oh. Something bad happened.");
      }
    } else {
      toast("Uh oh. Something bad happened.");
    }
  };

  return (
    <div className="flex justify-between h-[95vh] py-8 px-52">
      <div className="flex flex-col gap-y-16 place-content-center">
        <div className="flex gap-x-24">
          <button
            key={giftSock?.id}
            onClick={() => navigate(`/socks/${giftSock?.id}`)}
          >
            <div className="flex flex-col items-center hover:scale-105 rounded-xl overflow-hidden shadow-2xl card col-auto w-[365px] h-[500px]">
              <div className="flex justify-between items-center w-[95%]">
                <div className="flex pt-1.5">
                  <div className="relative">
                    <img
                      src={giftUser?.profile_pic}
                      className="rounded-full w-[67px] h-[67px] object-cover border-blue border-2 mr-2"
                      alt=""
                    />
                    {giftUser?.verified === true ? (
                      <img
                        src={checkmark}
                        className="absolute w-[21px] left-[62%] top-[2%]"
                        alt="orange curvy circle with a tan checkmark"
                      />
                    ) : null}
                  </div>
                  <p className="font-black text-l text-left content-center self-center">
                    @{giftUser?.username}
                  </p>
                </div>
                <div className="relative">
                  <img
                    src={sockstar}
                    className="w-[65px] h-[82px] mt-2 object-fill"
                    alt="orange sock with yellow toe and heel that displays the users sockstar points"
                  />
                  <div className="absolute flex w-[100%] top-[40%] font-black text-right place-content-center">
                    <p className="pl-1.5">{giftUser?.sockstar_points}</p>
                  </div>
                </div>
              </div>
              <div className="flex place-content-center h-72 w-72">
                <img
                  className="m-2 flex items-center justify-center h-72 w-72 object-cover rounded-lg border-blue border-2"
                  src={giftSock?.photo}
                  alt="Sunset in the mountains"
                />
              </div>
              <img
                src="https://img.icons8.com/ios/60/79AADD/gift--v1.png"
                alt="gift icon"
                className="absolute top-[85.5%] left-[81%]"
              />
              <div className="px-6 pt-4 pb-2"></div>
              <div className="flex flex-wrap px-1 pt-1 pb-2 items-start content-center h-[85px] w-72">
                <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                  {giftSock?.size}
                </span>
                {giftSock?.color === "Other" ? null : (
                  <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {giftSock?.color}
                  </span>
                )}
                {giftSock?.pattern === "Other" ? null : (
                  <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {giftSock?.pattern}
                  </span>
                )}
                {giftSock?.fabric === "Other" ? null : (
                  <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {giftSock?.fabric}
                  </span>
                )}
                <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                  {giftSock?.type === "Other" ? null : giftSock?.type}
                </span>
              </div>
            </div>
          </button>
          <button
            key={receiveSock?.id}
            onClick={() => navigate(`/socks/${receiveSock?.id}`)}
          >
            <div className="flex flex-col items-center hover:scale-105 rounded-xl overflow-hidden shadow-2xl card col-auto w-[365px] h-[500px]">
              <div className="flex justify-between items-center w-[95%]">
                <div className="flex pt-1.5">
                  <div className="relative">
                    <img
                      src={receiveUser?.profile_pic}
                      className="rounded-full w-[67px] h-[67px] object-cover border-blue border-2 mr-2"
                      alt=""
                    />
                    {receiveUser?.verified === true ? (
                      <img
                        src={checkmark}
                        className="absolute w-[21px] left-[62%] top-[2%]"
                        alt="orange curvy circle with a tan checkmark"
                      />
                    ) : null}
                  </div>
                  <p className="font-black text-l text-left content-center self-center">
                    @{receiveUser?.username}
                  </p>
                </div>
                <div className="relative">
                  <img
                    src={sockstar}
                    className="w-[65px] h-[82px] mt-2 object-fill"
                    alt="orange sock with yellow toe and heel that displays the users sockstar points"
                  />
                  <div className="absolute flex w-[100%] top-[40%] font-black text-right place-content-center">
                    <p className="pl-1.5">{receiveUser?.sockstar_points}</p>
                  </div>
                </div>
              </div>
              <div className="flex place-content-center h-72 w-72">
                <img
                  className="m-2 flex items-center justify-center h-72 w-72 object-cover rounded-lg border-blue border-2"
                  src={receiveSock?.photo}
                  alt="Sunset in the mountains"
                />
              </div>
              <div className="px-6 pt-4 pb-2"></div>
              <div className="flex flex-wrap px-1 pt-1 pb-2 items-start content-center h-[85px] w-72">
                <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                  {receiveSock?.size}
                </span>
                {receiveSock?.color === "Other" ? null : (
                  <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {receiveSock?.color}
                  </span>
                )}
                {receiveSock?.pattern === "Other" ? null : (
                  <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {receiveSock?.pattern}
                  </span>
                )}
                {receiveSock?.fabric === "Other" ? null : (
                  <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {receiveSock?.fabric}
                  </span>
                )}
                <span className="bg-lorange border border-blue inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                  {receiveSock?.type === "Other" ? null : receiveSock?.type}
                </span>
              </div>
            </div>
          </button>
        </div>
        <div className="flex gap-x-12 place-content-center">
          <button
            onClick={() => handleApprove()}
            className="bg-green border-blue border-2 py-4 rounded-lg text-xl w-[200px] hover:scale-105"
          >
            Approve Match
          </button>
          <button
            onClick={() => handleRejection()}
            className="bg-red border-blue border-2 py-4 rounded-lg text-xl w-[200px] hover:scale-105"
          >
            Reject Match
          </button>
        </div>
      </div>
      <div key={otherUser?.id} className="flex place-items-center mb-32">
        <div className="flex flex-col items-center rounded-xl overflow-hidden shadow-2xl user-card col-auto w-[365px]">
          <div className="flex justify-between items-center w-[95%]">
            <p className="font-black text-center pt-5 pb-2 w-full text-xl">
              <span className="inline-block align-middle">
                @{otherUser?.username}
              </span>
            </p>
            <p></p>
          </div>
          <div className="flex place-content-center h-72 w-72">
            <img
              className="m-2 flex items-center justify-center h-60 w-60 object-cover rounded-lg border-yellow border-2"
              src={otherUser?.profile_pic}
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
              <p className="pl-1.5">{otherUser?.sockstar_points}</p>
            </div>
          </div>
          <div className="bg-yellow border border-blue inline-block rounded px-2 py-2 text-base font-semibold my-5 mr-3 mb-3">
            <p className="font-semibold text-center">
              User Since {formattedDate}
            </p>
            <p className="font-semibold text-center">
              Total Pairings: {otherUser?.total_pairings}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchApproval;
