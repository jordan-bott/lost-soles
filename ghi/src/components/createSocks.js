import React from "react";
import { useDispatch } from "react-redux";
import { useCreateSockMutation } from "../store/socksApi";
import { useGetTokenQuery } from "../store/authApi";
import detailLogo from "../images/detailLogo.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginError from "./loginError";

function CreateSock() {
  const dispatch = useDispatch();
  const { data: user } = useGetTokenQuery();
  const accountId = user?.account?.id;

  const [createSockMutation] = useCreateSockMutation(accountId);
  const navigate = useNavigate();

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

  const colors = [
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

  const sizes = ["KS", "KM", "KL", "WS", "WM", "WL", "S", "M", "L"];

  const patterns = [
    "Artistic",
    "Checkered",
    "Plaid",
    "Polka Dots",
    "Solid",
    "Striped",
    "Zig Zag",
    "Other",
  ];

  const types = [
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

  const fabrics = [
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

  const styles = [
    "Athletic",
    "Cute",
    "Fashion",
    "Novelty",
    "Sport",
    "Toe",
    "Vintage",
    "Other",
  ];

  const brands = [
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSock = {
      photo: formData.get("photo"),
      color: color,
      pattern: pattern,
      size: size,
      type: type,
      fabric: fabric,
      style: style,
      brand: brand,
      gift: formData.get("gift") === true,
    };
    try {
      await createSockMutation(newSock).unwrap();
      e.target.reset();
      setColor("");
      setPattern("");
      setSize("");
      setType("");
      setFabric("");
      setStyle("");
      setBrand("");
      toast("Sock posted!");
      navigate("/");
    } catch (err) {
      console.log("handleSubmit error", err);
    }
  };

  if (!user) {
    return <LoginError />;
  }

  return (
    <div className="flex items-center justify-around px-60 mt-16">
      <img src={detailLogo} className="h-[375px] mb-20" alt="Logo" />
      <div className="flex pt-24">
        <div className="flex flex-col relative h-[700px] w-[300px] ">
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
                  ? colors.map((c) => {
                      return (
                        <div key={c} onClick={() => setColor(c)}>
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </div>
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
                  ? patterns.map((c) => {
                      return (
                        <div key={c} onClick={() => setPattern(c)}>
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </div>
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
                  ? sizes.map((c) => {
                      return (
                        <div
                          key={c}
                          onClick={() => setSize(c)}
                          className="z-40"
                        >
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </div>
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
                  ? types.map((c) => {
                      return (
                        <div
                          key={c}
                          onClick={() => setType(c)}
                          className="z-40"
                        >
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col relative h-[700px] w-[300px]">
          <div className="absolute z-[60]">
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
                  ? fabrics.map((c) => {
                      return (
                        <div
                          key={c}
                          onClick={() => setFabric(c)}
                          className="z-40"
                        >
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>
          <div className="absolute top-[15%] z-40">
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
                  ? styles.map((c) => {
                      return (
                        <div
                          key={c}
                          onClick={() => setStyle(c)}
                          className="z-40"
                        >
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>
          <div className="absolute top-[30%] z-30">
            <p className="text-xl pb-1 pl-2 pr-44">Brand</p>
            <button onClick={() => setBrandDropdown(!brandDropdown)}>
              <div className="flex flex-col divide-y-2 px-2 bg-yellow border-blue border-2 rounded-lg w-[250px] max-h-[190px] overflow-scroll scrollbar-thin scrollbar-thumb-orange scrollbar-thumb-rounded-lg">
                <div className="flex justify-between pt-1 px-2 mt-2 mb-0">
                  <p className="text-lg">{brand}</p>
                  <img
                    src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
                    alt="blue circle with a chevron pointing down"
                  />
                </div>
                {brandDropdown
                  ? brands.map((c) => {
                      return (
                        <div
                          key={c}
                          onClick={() => setBrand(c)}
                          className="z-40"
                        >
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">{c}</p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="absolute top-[45%]">
              <p className="block mb-2 text-xl -m-1 pl-2" htmlFor="photo">
                Picture URL
              </p>
              <input
                className="text-lg px-2 py-[25.5px] border-2 rounded-lg bg-yellow text-blue w-[250px] h-[55px]"
                type="text"
                id="photo"
                name="photo"
                // required
                placeholder=""
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_PHOTO",
                    payload: e.target.value,
                  })
                }
                style={{ height: "2.6rem" }}
              />
            </div>
            <div className=" absolute top-[60%] flex items-center mb-6">
              <input
                className="w-5 h-5 mr-2 rounded border-2 border-blue bg-red appearance-none checked:bg-green"
                type="checkbox"
                id="isGift"
                name="isGift"
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_IS_GIFT",
                    payload: e.target.checked,
                  })
                }
              />
              <label className="text-md" htmlFor="isGift">
                Is this sock a gift?
              </label>
            </div>
            <div className="absolute top-[70%] right-[10%]">
              <button
                type="submit"
                className="bg-green font-bold py-2 px-4 rounded-lg border-2 mt-1 border-blue float-right text-2xl"
                style={{ lineHeight: "1" }}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSock;
