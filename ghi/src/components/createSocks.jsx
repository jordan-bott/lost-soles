import React from "react";
import { useDispatch } from "react-redux";
import { useCreateSockMutation } from "../store/socksApi";
import { useGetTokenQuery } from "../store/authApi";
import detailLogo from "../images/detailLogo.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginError from "./auth/loginError";
import {
  colorList,
  sizeList,
  patternList,
  typeList,
  fabricList,
  styleList,
  brandList,
} from "../data/dropDownLists";
import Dropdown from "./Dropdown";

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
        </div>
        <div className="flex flex-col relative h-[700px] w-[300px]">
          <div className="absolute z-[60]">
            <p className="text-xl pb-1 pl-2 pr-44">Fabric</p>
            <Dropdown
              setDropdown={setFabricDropdown}
              dropdown={fabricDropdown}
              category={fabric}
              setCategory={setFabric}
              list={fabricList}
            />
          </div>
          <div className="absolute top-[15%] z-40">
            <p className="text-xl pb-1 pl-2 pr-44">Style</p>
            <Dropdown
              setDropdown={setStyleDropdown}
              dropdown={styleDropdown}
              category={style}
              setCategory={setStyle}
              list={styleList}
            />
          </div>
          <div className="absolute top-[30%] z-30">
            <p className="text-xl pb-1 pl-2 pr-44">Brand</p>
            <Dropdown
              setDropdown={setBrandDropdown}
              dropdown={brandDropdown}
              category={brand}
              setCategory={setBrand}
              list={brandList}
            />
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
