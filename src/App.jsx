import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("")
  const [id, setId] = useState(0)
  const [list, setList] = useState([]);
  const colors = ["bg-red-100", "bg-blue-100", "bg-yellow-100", "bg-orange-100", "bg-amber-100"]
  const hoverColors = ["bg-red-200", "bg-blue-200", "bg-yellow-200", "bg-orange-200", "bg-amber-200"]

  function handleDragStart(e,id) {
    e.dataTransfer.setData("text/plain", id);
  }

  function handleDrop(e, targetId) {
    e.preventDefault();
    const draggedId = Number(e.dataTransfer.getData("text/plain"));

    const draggedIndex = list.findIndex((item) => item.id === draggedId);
    const targetIndex = list.findIndex((item) => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const updatedList = [...list];
    [updatedList[draggedIndex], updatedList[targetIndex]] = [
      updatedList[targetIndex],
      updatedList[draggedIndex],
    ];
    setList(updatedList);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="my-3">
        <h2 className="font-bold mb-2 text-2xl">Drag and drop the list items</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Enter anything you wish"
          className="p-2 border-1 border-gray-200 rounded-xl w-full focus:border-blue-200"
        />

        <button onClick={(e)=>{
          setList([...list, {id, content: value}]);
          setId((id)=>id+1);
          setValue("");
        }}  className="bg-blue-50 rounded-xl w-50 border-2 border-gray-400 my-4 cursor-pointer hover:bg-blue-100">List Below</button>
      </div>
      {list.length> 0 && list.map((item) => (
        <div
          key={item.id}
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, item.id)}
          draggable="true"
          className={`border-2 border-gray-400 rounded-lg w-100 mx-auto mt-3 h-10 cursor-move ${colors[(item.id)%5]} hover:${hoverColors[(item.id)%5]} flex justify-center items-center`}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

export default App;
