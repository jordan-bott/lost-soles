import { useParams } from "react-router-dom";
import { useGetOneSockQuery } from "../../store/socksApi";
import { useGetTokenQuery } from "../../store/authApi";
import {
  useUnmatchedByUserQuery,
  useMatchPendingMutation,
} from "../../store/socksApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMatchMutation } from "../../store/matchApi";
import { toast } from "react-toastify";
import sockstar from "../../images/sockstar.png";
import { useSendRequestMutation } from "../../store/emailApi";
import { useUpdateSockMutation } from "../../store/socksApi";
import {
  colorList,
  sizeList,
  patternList,
  typeList,
  fabricList,
  brandList,
  styleList,
} from "../../data/dropDownLists";
import Dropdown from "../Dropdown";

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
  const [updateSock] = useUpdateSockMutation();
  const [matchPending] = useMatchPendingMutation();

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

  return (
    <div className="flex gap-x-20 w-[100%] pl-[550px] pt-12">
      {sock?.user_id === accountId ? (
        <div className="flex flex-col gap-y-3 p-2 relative h-[700px] w-[300px]">
          <div className="absolute z-[100] ">
            <p className="text-xl pb-1 pl-2 pr-44">Color</p>
            <Dropdown
              setDropdown={setColorDropdown}
              dropdown={colorDropdown}
              category={color}
              setCategory={setColor}
              list={colorList}
            />
          </div>
          <div className="absolute top-[15%] z-[90]">
            <p className="text-xl pb-1 pl-2 pr-44">Pattern</p>
            <Dropdown
              setDropdown={setPatternDropdown}
              dropdown={patternDropdown}
              category={pattern}
              setCategory={setPattern}
              list={patternList}
            />
          </div>
          <div className="absolute top-[30%] z-[80]">
            <p className="text-xl pb-1 pl-2 pr-44">Size</p>
            <Dropdown
              setDropdown={setSizeDropdown}
              dropdown={sizeDropdown}
              category={size}
              setCategory={setSize}
              list={sizeList}
            />
          </div>
          <div className="absolute top-[45%] z-[70]">
            <p className="text-xl pb-1 pl-2 pr-44">Type</p>
            <Dropdown
              setDropdown={setTypeDropdown}
              dropdown={typeDropdown}
              category={type}
              setCategory={setType}
              list={typeList}
            />
          </div>
          <div className="absolute top-[60%] z-[60]">
            <p className="text-xl pb-1 pl-2 pr-44">Fabric</p>
            <Dropdown
              setDropdown={setFabricDropdown}
              dropdown={fabricDropdown}
              category={fabric}
              setCategory={setFabric}
              list={fabricList}
            />
          </div>
          <div className="absolute top-[75%] z-40">
            <p className="text-xl pb-1 pl-2 pr-44">Style</p>
            <Dropdown
              setDropdown={setStyleDropdown}
              dropdown={styleDropdown}
              category={style}
              setCategory={setStyle}
              list={styleList}
            />
          </div>
          <div className="absolute top-[90%] z-30">
            <p className="text-xl pb-1 pl-2 pr-44">Brand</p>
            <Dropdown
              setDropdown={setBrandDropdown}
              dropdown={brandDropdown}
              category={brand}
              setCategory={setBrand}
              list={brandList}
            />
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
