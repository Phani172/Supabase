import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";

const UpdatePlayerForm = ({ onPlayerUpdated, onCancel }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { player } = location.state || {};

  const [updatedPlayer, setUpdatedPlayer] = useState({
    id: player?.id || "",
    player_name: player?.player_name || "",
    country: player?.country || "",
    age: player?.age || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (player) {
      setUpdatedPlayer({
        id: player.id,
        player_name: player.player_name,
        country: player.country,
        age: player.age,
      });
    }
  }, [player]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPlayer((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    if (
      !updatedPlayer.player_name ||
      !updatedPlayer.country ||
      !updatedPlayer.age
    ) {
      return "All fields are required.";
    }
    if (isNaN(updatedPlayer.age) || updatedPlayer.age <= 0) {
      return "Age must be a positive number.";
    }
    return "";
  };

  const handleUpdatePlayer = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    const { data, error } = await supabase
      .from("play")
      .update({
        player_name: updatedPlayer.player_name,
        country: updatedPlayer.country,
        age: updatedPlayer.age,
      })
      .eq("id", updatedPlayer.id);

    if (error) {
      console.error("Error updating player:", error);
      setError("Failed to update player. Please try again later.");
      return;
    }
    if (data) {
      onPlayerUpdated(data[0]);
    }
    navigate("/");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Update Existing Player</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          name="id"
          placeholder="Player Id"
          value={updatedPlayer.id}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
          disabled
        />
        <input
          type="text"
          name="player_name"
          placeholder="Player Name"
          value={updatedPlayer.player_name}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="text"
          name="country"
          placeholder="Player Country"
          value={updatedPlayer.country}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="text"
          name="age"
          placeholder="Player Age"
          value={updatedPlayer.age}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <div className="flex justify-between">
          <button
            className="w-1/2 p-2 bg-green-500 text-white rounded-lg mr-2"
            onClick={handleUpdatePlayer}
          >
            Update Player
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

export default UpdatePlayerForm;
