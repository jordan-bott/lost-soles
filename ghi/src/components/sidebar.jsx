import { useGetSocksQuery } from "../store/socksApi";
import lonelies from "../images/lonelies.png";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const { data, isLoading } = useGetSocksQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  const lonelySock = data.slice(-1)[0];
  const lonely2 = data.slice(-2)[0];

  return (
    <>
      <div className="w-[320px] flex flex-col pt-4">
        <div className="row-span-1 content-end">
          <iframe
            className="px-3"
            src="https://open.spotify.com/embed/playlist/7pe8wV4pCqzMhYDuK6yAqV?utm_source=generator"
            height="152"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify"
          ></iframe>
        </div>
        <div className="pt pl-1">
          <div className="pt-4 relative">
            <p className="absolute text-xl left-[5%] top-[5%]">
              LONELIEST SOCKS
            </p>
            <div className="absolute bg-blue rounded-full"></div>
            <img
              src={lonelies}
              className=""
              alt="clothes line holding up two pictures of the oldest socks in the database"
            />
            <button onClick={() => navigate(`socks/${lonelySock.id}`)}>
              <img
                src={lonelySock.photo}
                className="absolute object-cover h-[88px] w-[88px] -rotate-[18.5deg] left-[52.25%] top-[21.25%] border-[1px] hover:scale-105"
                alt=""
              />
            </button>
            <button onClick={() => navigate(`socks/${lonely2.id}`)}>
              <img
                src={lonely2.photo}
                className="absolute object-cover h-[88px] w-[88px] rotate-[37deg] left-[23.75%] top-[55.75%] border-[1px] hover:scale-105"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
