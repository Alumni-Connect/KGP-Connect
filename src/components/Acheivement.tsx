import Card from "./Card";

export default function Acheivement(){
  return(
    <div className="flex flex-col gap-4  px-4 py-4 border-2 max-w-[520px] rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-bold  text-2xl">Acheivements</h1>
        <p className="font-semibold text-indigo-600 cursor-pointer">Show all</p>
      </div>
      <div className="flex flex-col gap-3">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  )
}