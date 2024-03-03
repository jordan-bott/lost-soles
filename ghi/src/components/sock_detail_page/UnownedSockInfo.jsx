export default function UnownedSockInfo({ sock }) {
  return (
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
  );
}
