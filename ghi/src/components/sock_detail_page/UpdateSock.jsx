import { useState } from "react";
import Dropdown from "../Dropdown";
import {
  colorList,
  sizeList,
  patternList,
  typeList,
  fabricList,
  brandList,
  styleList,
} from "../../data/dropDownLists";
import { useUpdateSockMutation } from "../../store/socksApi";
import { toast } from "react-toastify";

export default function UpdateSock({ sock, user }) {
  const [updateSock] = useUpdateSockMutation();

  const [color, setColor] = useState(sock.color);
  const [colorDropdown, setColorDropdown] = useState(false);

  const [pattern, setPattern] = useState(sock.pattern);
  const [patternDropdown, setPatternDropdown] = useState(false);

  const [size, setSize] = useState(sock.size);
  const [sizeDropdown, setSizeDropdown] = useState(false);

  const [type, setType] = useState(sock.type);
  const [typeDropdown, setTypeDropdown] = useState(false);

  const [fabric, setFabric] = useState(sock.fabric);
  const [fabricDropdown, setFabricDropdown] = useState(false);

  const [style, setStyle] = useState(sock.style);
  const [styleDropdown, setStyleDropdown] = useState(false);

  const [brand, setBrand] = useState(sock.brand);
  const [brandDropdown, setBrandDropdown] = useState(false);

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
      user_id: user?.account?.id,
      sock_id: sock?.id,
      info: info,
    });
    if (!result.hasOwnProperty("error")) {
      toast("Your sock has been updated!");
    } else {
      toast("Uh oh, something bad happened. Please try again later.");
    }
  };

  return (
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
  );
}
