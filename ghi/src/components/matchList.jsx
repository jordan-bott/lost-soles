import { useGetMatchByUserQuery } from "../store/matchApi";
import { useGetTokenQuery } from "../store/authApi";
import { useNavigate } from "react-router-dom";
import LoginError from "./auth/loginError";
import MatchListError from "./matchListError";

function MatchList() {
  const { data: user, isLoading: userLoading } = useGetTokenQuery();
  const accountId = user?.account?.id;
  const { data, isLoading, error } = useGetMatchByUserQuery(accountId);
  const navigate = useNavigate();

  if (isLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <LoginError />;
  }

  if (error) {
    return <MatchListError />;
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let yourSock = null;
  let theirSock = null;

  return (
    <center>
      <div className="box-content w-100 py-16 mx-80 border-0 text-lg">
        <table className="w-[80%] text-center border-collapse">
          <thead className="border-b-4 border-orange">
            <tr>
              <th className="text-xl">Match Date</th>
              <th className="p-2 text-xl">Your Sock</th>
              <th className="p-2 text-xl">Their Sock</th>
              <th className="p-2 text-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((match) => {
              user.account.id === match.gift_sock.user_id
                ? (yourSock = match.gift_sock)
                : (yourSock = match.receive_sock);
              user.account.id === match.gift_sock.user_id
                ? (theirSock = match.receive_sock)
                : (theirSock = match.gift_sock);
              return (
                <tr
                  key={match.id}
                  className="bg-white border-gray-300 border-0 border-b-2 border-blue"
                >
                  <td className="">
                    <center>
                      {new Date(match.created_on).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </center>
                  </td>
                  <td>
                    <center>
                      <img
                        className="my-2 h-[100px] w-[100px] object-cover border-2 border-blue rounded-lg"
                        src={yourSock.photo}
                        alt=""
                      />
                    </center>
                  </td>
                  <td>
                    <center>
                      <img
                        className="my-2 h-[100px] w-[100px] object-cover border-2 border-blue rounded-lg"
                        src={theirSock.photo}
                        alt=""
                      />
                    </center>
                  </td>
                  <td className="p-2">
                    {match.approving_user === user.account.id &&
                    match.match_status === false ? (
                      <button
                        onClick={() => navigate(`/matches/${match.id}`)}
                        className="w-100 hover:text-orange hover:scale-105"
                      >
                        <center>
                          {match.match_status === false
                            ? "Pending"
                            : "Approved"}
                        </center>
                      </button>
                    ) : (
                      <center>
                        {match.match_status === false ? "Pending" : "Approved"}
                      </center>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </center>
  );
}

export default MatchList;
