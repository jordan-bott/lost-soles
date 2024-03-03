import { useParams } from "react-router-dom";
import { useGetOneSockQuery } from "../../store/socksApi";
import { useGetTokenQuery } from "../../store/authApi";
import {
  useUnmatchedByUserQuery,
  useMatchPendingMutation,
} from "../../store/socksApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMatchMutation } from "../../store/matchApi";
import { toast } from "react-toastify";
import sockstar from "../../images/sockstar.png";
import { useSendRequestMutation } from "../../store/emailApi";

import UpdateSock from "./UpdateSock";
import UnownedSockInfo from "./UnownedSockInfo";

function SockDetail() {
  const { id } = useParams();
  const { data: sock, isLoading: sockLoading } = useGetOneSockQuery(`${id}`);
  const { data: user, isLoading: userLoading } = useGetTokenQuery();
  const [createMatch] = useCreateMatchMutation();
  const accountId = user?.account?.id;
  const { data: userSocks, isLoading: userSocksLoading } =
    useUnmatchedByUserQuery(accountId);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const [matchSock, setMatchSock] = useState(null);
  const [sendRequest] = useSendRequestMutation();
  const [matchPending] = useMatchPendingMutation();

  if (sockLoading || userLoading || userSocksLoading) {
    return <p>Loading ...</p>;
  }

  const handleCreateMatch = async (receive_sock, gift_sock) => {
    const result = await createMatch({
      receive_sock: receive_sock,
      gift_sock: gift_sock,
      approving_id: sock?.user_id,
    });
    if (!result.hasOwnProperty("error")) {
      setMatchSock(null);
      const emailResult = await sendRequest({
        user_email: sock?.email,
        match_id: result?.data?.id,
      });
      if (!emailResult.hasOwnProperty("error")) {
        const matchResult1 = await matchPending(receive_sock);
        if (!matchResult1.hasOwnProperty("error")) {
          const matchResult2 = await matchPending(gift_sock);
          if (!matchResult2.hasOwnProperty("error")) {
            toast("Match request sent!!");
            navigate("/");
          } else {
            toast("Uh oh, something bad happened. Please try again later");
          }
        } else {
          toast("Uh oh, something bad happened. Please try again later");
        }
      } else {
        toast("Uh oh, something bad happened. Please try again later");
      }
    } else {
      toast("Uh oh, something bad happened. Please try again later");
    }
  };

  let gift_sock = null;
  let receive_sock = null;

  if (sock.gift) {
    gift_sock = sock.id;
    receive_sock = matchSock;
  } else {
    receive_sock = sock.id;
    gift_sock = matchSock;
  }

  let colorDescription = null;
  let patternDescription = null;

  return (
    <div className="flex gap-x-20 w-[100%] pl-[550px] pt-12">
      {sock?.user_id === accountId ? (
        <UpdateSock sock={sock} user={user} />
      ) : (
        <UnownedSockInfo sock={sock} />
      )}
      <div className="flex flex-col items-start mt-24">
        <div className="flex flex-col gap-y-3 items-center">
          <img
            src={sock?.photo}
            alt=""
            className="w-[410px] h-[410px] object-cover border-blue border-4 rounded-lg ml-4"
          />
          <p className="text-xl pt-2">{sock?.gift ? "Gifting" : "Receiving"}</p>
        </div>
        <div className="flex pt-5 pl-4 gap-x-4">
          {!user ? null : sock?.user_id ===
            user?.account?.id ? null : dropdown ? (
            <>
              <div className="z-[200] flex flex-col gap-y-1 divide-y-2 border-2 border-blue px-3 rounded-lg bg-lorange w-[410px] overflow-y-scroll overflow-x-hidden max-h-[235px] scrollbar-thin scrollbar-thumb-yellow scrollbar-thumb-rounded-lg">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="p-2 text-xl flex gap-x-2 justify-center items-center "
                >
                  <p className="text-xl mt-1">Choose a Sock to Match!</p>
                  <img
                    src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
                    alt="blue circle with a chevron pointing down"
                  />
                </button>
                {userSocks.map((s) => {
                  s.color === "Other"
                    ? (colorDescription = null)
                    : (colorDescription = s.color);
                  s.pattern === "Other"
                    ? (patternDescription = null)
                    : (patternDescription = s.pattern);
                  return (
                    <div className="flex w-[375px] p-2" key={s.id}>
                      <button onClick={() => navigate(`/socks/${s.id}`)}>
                        <img
                          src={s.photo}
                          alt=""
                          className="w-[40px] h-[40px] object-cover  hover:scale-[165%] rounded-lg border-blue border-2"
                        />
                      </button>
                      <button
                        className="flex content-center items-center"
                        onClick={() => {
                          matchSock === s.id
                            ? setMatchSock(null)
                            : setMatchSock(s.id);
                        }}
                      >
                        <p className="flex flex-1 pl-5 text-l w-[100%] h-[100%] hover:text-yellow">
                          {colorDescription} {patternDescription} {s.type}
                        </p>
                        {s.id === matchSock ? (
                          <img
                            src={sockstar}
                            className="w-[30px]"
                            alt="single orange and yellow sock"
                          />
                        ) : null}
                      </button>
                    </div>
                  );
                })}
              </div>
              {matchSock !== null ? (
                <button
                  className="bg-green text-l border-2 border-blue rounded-lg h-[63px] p-2 hover:scale-105"
                  onClick={() => handleCreateMatch(receive_sock, gift_sock)}
                >
                  Match With This Sock!
                </button>
              ) : null}
            </>
          ) : (
            <button
              onClick={() => setDropdown(!dropdown)}
              className="hover:scale-105 flex items-center justify-center gap-x-2 p-2 border-2 border-blue rounded-lg bg-lorange w-[410px] text-xl"
            >
              <p className="text-xl mt-1">Choose a Sock to Match!</p>
              <img
                src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
                alt="blue circle with a chevron pointing down"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SockDetail;
