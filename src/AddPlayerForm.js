import React, { useState } from "react";
import supabase from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const AddPlayerForm = ({ onPlayerAdded, onCancel }) => {
  const navigate = useNavigate();
  const [newPlayer, setNewPlayer] = useState({
    id: "",
    player_name: "",
    country: "",
    age: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    if (!newPlayer.player_name || !newPlayer.country || !newPlayer.age) {
      return "All fields are required.";
    }
    if (isNaN(newPlayer.age) || newPlayer.age <= 0) {
      return "Age must be a positive number.";
    }
    return "";
  };

  const handleAddPlayer = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    const { data, error } = await supabase.from("play").insert([newPlayer]);

    if (error) {
      console.error("Error adding player:", error);
      setError("Failed to add player. Please try again later.");
      return;
    }
    if (data) {
      onPlayerAdded(data[0]);
      setNewPlayer({ player_name: "", country: "", age: "" });
    }
    navigate("/");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Player</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          name="id"
          placeholder="Player Id"
          value={newPlayer.id}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="text"
          name="player_name"
          placeholder="Player Name"
          value={newPlayer.player_name}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="text"
          name="country"
          placeholder="Player Country"
          value={newPlayer.country}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="text"
          name="age"
          placeholder="Player Age"
          value={newPlayer.age}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <div className="flex justify-between">
          <button
            className="w-1/2 p-2 bg-green-500 text-white rounded-lg mr-2"
            onClick={handleAddPlayer}
          >
            Add Player
          </button>
          <button
            className="w-1/2 p-2 bg-red-500 text-white rounded-lg ml-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerForm;
