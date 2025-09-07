export default function Contestant({ info }) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold">{info ? info.name : "Contestant"}</p>
      <p className="text-xs italic">{info ? info.model : "[model]"}</p>
    </div>
  );
}
