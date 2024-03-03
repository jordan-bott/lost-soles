export default function Dropdown({
  setDropdown,
  dropdown,
  category,
  setCategory,
  list,
}) {
  return (
    <button onClick={() => setDropdown(!dropdown)}>
      <div className="flex flex-col divide-y-2 px-2 bg-yellow border-blue border-2 rounded-lg w-[250px] max-h-[190px] overflow-scroll scrollbar-thin scrollbar-thumb-orange scrollbar-thumb-rounded-lg">
        <div className="flex justify-between pt-1 px-2 mt-2 mb-0">
          <p className="text-lg">{category}</p>
          <img
            src="https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png"
            alt="blue circle with a chevron pointing down"
          />
        </div>
        {dropdown
          ? list.map((c) => {
              return (
                <div key={c} onClick={() => setCategory(c)}>
                  <div className="flex p-2 bg-yellow w-100">
                    <p className="hover:text-orange mt-1 pr-3">{c}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </button>
  );
}
