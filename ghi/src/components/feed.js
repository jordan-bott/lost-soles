import { useGetSocksQuery } from "../store/socksApi";
import sockstar from "../images/sockstar.png";
import checkmark from "../images/verification-check.png";
import SideBar from "./sidebar";
import { useNavigate } from "react-router-dom";

function SockFeed() {
  const { data, isLoading } = useGetSocksQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row place-content-between max-w-screen divide-blue divide-x-2">
      <div>
        <SideBar />
      </div>
      <div className="w-[100%] overflow-scroll max-h-[calc(100%-8rem)] scrollbar-none">
        <div className="place-items-center align-middle grid grid-cols-3 py-20 gap-y-12">
          {data.map((sock) => {
            return (
              <button
                key={sock.id}
                onClick={() => navigate(`/socks/${sock.id}`)}
              >
                <div className="flex flex-col items-center hover:scale-105 rounded-xl overflow-hidden shadow-2xl card col-auto w-[365px] h-[500px]">
                  <div className="flex justify-between items-center w-[95%]">
                    <div className="flex pt-1.5">
                      <div className="relative">
                        <img
                          src={sock.profile_pic}
                          className="rounded-full w-[67px] h-[67px] object-cover border-blue border-2 mr-2"
                          alt=""
                        />
                        {sock.verified === true ? (
                          <img
                            src={checkmark}
                            className="absolute w-[21px] left-[62%] top-[2%]"
                            alt="orange curvy circle with a tan checkmark"
                          />
                        ) : null}
                      </div>
                      <p className="font-black text-l text-left content-center self-center">
                        @{sock.username}
                      </p>
                    </div>
                    <div className="relative">
                      <img
                        src={sockstar}
                        className="w-[65px] h-[82px] mt-2 object-fill"
                        alt="orange sock with yellow toe and heel that displays the users sockstar points"
                      />
                      <div className="absolute flex w-[100%] top-[40%] font-black text-right place-content-center">
                        <p className="pl-1.5">{sock.sockstar_points}</p>
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
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default SockFeed;
