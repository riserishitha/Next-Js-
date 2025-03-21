import { useState, ChangeEvent } from "react";

export default function Home() {
  const [items, setItems] = useState<string[]>([
    "Apple",
    "Banana",
    "Mango",
    "Grapes",
  ]);
  const [newItem, setNewItem] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const addItem = (): void => {
    if (newItem.trim()) {
      setItems((prevItems) => [...prevItems, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index: number): void => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleNewItemChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewItem(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl transition transform hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          🛒 List Manager
        </h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={newItem}
            onChange={handleNewItemChange}
            placeholder="Add new item"
            className="flex-1 px-5 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={addItem}
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            ➕ Add
          </button>
        </div>

        <div className="flex mb-6">
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search items..."
            className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <ul className="space-y-4">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gradient-to-r from-indigo-300 to-purple-400 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <span className="text-lg font-medium">{item}</span>
              <button
                onClick={() => removeItem(index)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                🗑️ Remove
              </button>
            </li>
          ))}
        </ul>

        {filteredItems.length === 0 && (
          <p className="text-gray-600 text-center mt-6">
            🚫 No items found. Try adding some!
          </p>
        )}
      </div>
    </div>
  );
}
