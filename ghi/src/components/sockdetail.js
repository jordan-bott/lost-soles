import { useParams } from "react-router-dom";
import { useGetOneSockQuery } from "../store/socksApi";
import { useGetTokenQuery } from "../store/authApi";
import { useGetSocksByUserQuery } from "../store/socksApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMatchMutation } from "../store/matchApi";
import { toast } from "react-toastify";
import sockstar from "../images/sockstar.png";
import { useSendRequestMutation } from "../store/emailApi";
import { useUpdateSockMutation } from "../store/socksApi";

function SockDetail() {
  const { id } = useParams();
  const { data: sock, isLoading: sockLoading } = useGetOneSockQuery(`${id}`);
  const { data: user, isLoading: userLoading } = useGetTokenQuery();
  const [createMatch] = useCreateMatchMutation();
  const accountId = user?.account?.id;
  const { data: userSocks, isLoading: userSocksLoading } =
    useGetSocksByUserQuery(accountId);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const [matchSock, setMatchSock] = useState(null);
  const [sendRequest] = useSendRequestMutation();
  const [updateSock] = useUpdateSockMutation();

  const [color, setColor] = useState("");
  const [colorDropdown, setColorDropdown] = useState(false);

  const [pattern, setPattern] = useState("");
  const [patternDropdown, setPatternDropdown] = useState(false);

  const [size, setSize] = useState("");
  const [sizeDropdown, setSizeDropdown] = useState(false);

  const [type, setType] = useState("");
  const [typeDropdown, setTypeDropdown] = useState(false);

  const [fabric, setFabric] = useState("");
  const [fabricDropdown, setFabricDropdown] = useState(false);

  const [style, setStyle] = useState("");
  const [styleDropdown, setStyleDropdown] = useState(false);

  const [brand, setBrand] = useState("");
  const [brandDropdown, setBrandDropdown] = useState(false);

  useEffect(() => {
    async function setSockData() {
      setColor(sock?.color);
      setPattern(sock?.pattern);
      setSize(sock?.size);
      setType(sock?.type);
      setFabric(sock?.fabric);
      setStyle(sock?.style);
      setBrand(sock?.brand);
    }
    setSockData();
  }, [sock]);

  console.log(color);

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
        toast("Match request sent!!");
        navigate("/");
      }
    } else {
      toast("Uh oh, something bad happened. Please try again later");
    }
  };

  const handleUpdateSock = async () => {
    let info = {
      photo: sock?.photo,
      condition: sock?.condition,
      color: color,
      pattern: pattern,
      size: size,
      type: type,
      fabric: fabric,
      style: style,
      brand: brand,
      gift: sock.gift,
    };
    const result = await updateSock({
      user_id: accountId,
      sock_id: sock?.id,
      info: info,
    });
    if (!result.hasOwnProperty("error")) {
      toast("Your sock has been updated!");
    } else {
      toast("Uh oh, something bad happened. Please try again later.");
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

  const colorList = [
    "Black",
    "Blue",
    "Brown",
    "Green",
    "Grey",
    "Orange",
    "Pink",
    "Purple",
    "Rainbow",
    "Red",
    "Multi",
    "White",
    "Yellow",
    "Other",
  ];

  const sizeList = ["KS", "KM", "KL", "WS", "WM", "WL", "S", "M", "L"];

  const patternList = [
    "Artistic",
    "Checkered",
    "Plaid",
    "Polka Dots",
    "Solid",
    "Stripped",
    "Zig Zag",
    "Other",
  ];

  const typeList = [
    "Ankle",
    "Anklet",
    "Crew",
    "No-Show",
    "Knee High",
    "Low Cut",
    "Thigh High",
    "Tube",
    "Toe Cover",
  ];

  const fabricList = [
    "Bamboo",
    "Cashmere",
    "Cotton",
    "Merino Wool",
    "Nylon",
    "Polyester",
    "Polypropylene",
    "Spandex",
    "Wool",
    "Other",
  ];

  const styleList = [
    "Athletic",
    "Cute",
    "Fashion",
    "Novelty",
    "Sport",
    "Toe",
    "Vintage",
    "Other",
  ];

  const brandList = [
    "Adidas",
    "Bombas",
    "BOSS",
    "Calvin Klein",
    "Carhartt",
    "Darn Tough",
    "FALKE",
    "GANT",
    "Hanes",
    "Happy Socks",
    "Nike",
    "Puma",
    "Stance",
    "Tommy Hilfiger",
    "Other",
    "Unknown",
  ];

  return (
    <div className="flex gap-x-20 w-[100%] pl-[550px] pt-12">
      {sock?.user_id === accountId ? (
        <div className="flex flex-col gap-y-3 p-2 relative h-[700px] w-[300px]">
          <div className="absolute z-[100] ">
            <p className="text-xl pb-1 pl-2 pr-44">Color</p>
            <button onClick={() => setColorDropdown(!colorDropdown)}>
              <div className="flex flex-col divide-y-2 px-2 bg-yellow border-blue border-2 rounded-lg w-[250px] max-h-[190px] overflow-scroll scrollbar-thin scrollbar-thumb-orange scrollbar-thumb-rounded-lg">
                <div className="flex justify-between pt-1 px-2 mt-2 mb-0">
                  <p className="text-lg">{color}</p>
                  <img
                    src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
                    alt="blue circle with a chevron pointing down"
                  />
                </div>
                {colorDropdown
                  ? colorList.map((c) => {
                      return (
                        <button onClick={() => setColor(c)}>
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </button>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>
          <div className="absolute top-[15%] z-[90]">
            <p className="text-xl pb-1 pl-2 pr-44">Pattern</p>
            <button onClick={() => setPatternDropdown(!patternDropdown)}>
              <div className="flex flex-col divide-y-2 px-2 bg-yellow border-blue border-2 rounded-lg w-[250px] max-h-[190px] overflow-scroll scrollbar-thin scrollbar-thumb-orange scrollbar-thumb-rounded-lg">
                <div className="flex justify-between pt-1 px-2 mt-2 mb-0">
                  <p className="text-lg">{pattern}</p>
                  <img
                    src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
                    alt="blue circle with a chevron pointing down"
                  />
                </div>
                {patternDropdown
                  ? patternList.map((c) => {
                      return (
                        <button onClick={() => setPattern(c)}>
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </button>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>
          <div className="absolute top-[30%] z-[80]">
            <p className="text-xl pb-1 pl-2 pr-44">Size</p>
            <button onClick={() => setSizeDropdown(!sizeDropdown)}>
              <div className="flex flex-col divide-y-2 px-2 bg-yellow border-blue border-2 rounded-lg w-[250px] max-h-[190px] overflow-scroll scrollbar-thin scrollbar-thumb-orange scrollbar-thumb-rounded-lg">
                <div className="flex justify-between pt-1 px-2 mt-2 mb-0">
                  <p className="text-lg">{size}</p>
                  <img
                    src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
                    alt="blue circle with a chevron pointing down"
                  />
                </div>
                {sizeDropdown
                  ? sizeList.map((c) => {
                      return (
                        <button onClick={() => setSize(c)} className="z-40">
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </button>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>
          <div className="absolute top-[45%] z-[70]">
            <p className="text-xl pb-1 pl-2 pr-44">Type</p>
            <button onClick={() => setTypeDropdown(!typeDropdown)}>
              <div className="flex flex-col divide-y-2 px-2 bg-yellow border-blue border-2 rounded-lg w-[250px] max-h-[190px] overflow-scroll scrollbar-thin scrollbar-thumb-orange scrollbar-thumb-rounded-lg">
                <div className="flex justify-between pt-1 px-2 mt-2 mb-0">
                  <p className="text-lg">{type}</p>
                  <img
                    src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
                    alt="blue circle with a chevron pointing down"
                  />
                </div>
                {typeDropdown
                  ? typeList.map((c) => {
                      return (
                        <button onClick={() => setType(c)} className="z-40">
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </button>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>
          <div className="absolute top-[60%] z-[60]">
            <p className="text-xl pb-1 pl-2 pr-44">Fabric</p>
            <button onClick={() => setFabricDropdown(!fabricDropdown)}>
              <div className="flex flex-col divide-y-2 px-2 bg-yellow border-blue border-2 rounded-lg w-[250px] max-h-[190px] overflow-scroll scrollbar-thin scrollbar-thumb-orange scrollbar-thumb-rounded-lg">
                <div className="flex justify-between pt-1 px-2 mt-2 mb-0">
                  <p className="text-lg">{fabric}</p>
                  <img
                    src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
                    alt="blue circle with a chevron pointing down"
                  />
                </div>
                {fabricDropdown
                  ? fabricList.map((c) => {
                      return (
                        <button onClick={() => setFabric(c)} className="z-40">
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </button>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>
          <div className="absolute top-[75%] z-40">
            <p className="text-xl pb-1 pl-2 pr-44">Style</p>
            <button onClick={() => setStyleDropdown(!styleDropdown)}>
              <div className="flex flex-col divide-y-2 px-2 bg-yellow border-blue border-2 rounded-lg w-[250px] max-h-[190px] overflow-scroll scrollbar-thin scrollbar-thumb-orange scrollbar-thumb-rounded-lg">
                <div className="flex justify-between pt-1 px-2 mt-2 mb-0">
                  <p className="text-lg">{style}</p>
                  <img
                    src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
                    alt="blue circle with a chevron pointing down"
                  />
                </div>
                {styleDropdown
                  ? styleList.map((c) => {
                      return (
                        <button onClick={() => setStyle(c)} className="z-40">
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </button>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>
          <div className="absolute top-[90%] z-30">
            <p className="text-xl pb-1 pl-2 pr-44">Brand</p>
            <button onClick={() => setBrandDropdown(!brandDropdown)}>
              <div className="flex flex-col divide-y-2 px-2 bg-yellow border-blue border-2 rounded-lg w-[250px] max-h-[140px] overflow-scroll scrollbar-thin scrollbar-thumb-orange scrollbar-thumb-rounded-lg">
                <div className="flex justify-between pt-1 px-2 mt-2 mb-0 z-[200]">
                  <p className="text-lg">{brand}</p>
                  <img
                    src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
                    alt="blue circle with a chevron pointing down"
                  />
                </div>
                {brandDropdown
                  ? brandList.map((c) => {
                      return (
                        <button onClick={() => setBrand(c)} className="z-40">
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </button>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>
          <button
            className="absolute left-[103%] -bottom-[2%] w-[160px] bg-lorange border-2 border-blue rounded-lg py-2 text-xl px-2 hover:scale-105"
            onClick={() => handleUpdateSock()}
          >
            Update Sock
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-3 p-8">
          <div>
            <p className="text-xl pl-2 pb-0">Color</p>
            <div className="bg-yellow border-blue border-2 rounded-lg p-3 w-[250px]">
              {sock?.color}
            </div>
          </div>
          <div>
            <p className="text-xl pl-2 pb-0.5">Pattern</p>
            <div className="bg-yellow border-blue border-2 rounded-lg p-3 w-[250px]">
              {sock?.pattern}
            </div>
          </div>
          <div>
            <p className="text-xl pl-2 pb-0">Size</p>
            <div className="bg-yellow border-blue border-2 rounded-lg p-3 w-[250px]">
              {sock?.size}
            </div>
          </div>
          <div>
            <p className="text-xl pl-2 pb-0">Type</p>
            <div className="bg-yellow border-blue border-2 rounded-lg p-3 w-[250px]">
              {sock?.type}
            </div>
          </div>
          <div>
            <p className="text-xl pl-2 pb-0">Fabric</p>
            <div className="bg-yellow border-blue border-2 rounded-lg p-3 w-[250px]">
              {sock?.fabric}
            </div>
          </div>
          <div>
            <p className="text-xl pl-2 pb-0">Style</p>
            <div className="bg-yellow border-blue border-2 rounded-lg p-3 w-[250px]">
              {sock?.style}
            </div>
          </div>
          <div>
            <p className="text-xl pl-2 pb-0">Brand</p>
            <div className="bg-yellow border-blue border-2 rounded-lg p-3 w-[250px]">
              {sock?.brand}
            </div>
          </div>
        </div>
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
          {sock?.user_id === user?.account?.id ? null : dropdown ? (
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
