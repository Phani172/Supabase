import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import PlayerCard from "./PlayerCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from("play").select();

      if (error) {
        console.error("Error fetching data:", error);
      }
      if (data) {
        setPlayers(data);
      }
    };

    fetchPlayers();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("play").delete().match({ id });

    if (error) {
      console.error("Error deleting data:", error);
    } else {
      setPlayers(players.filter((player) => player.id !== id));
    }
  };

  const handleEdit = (player) => {
    navigate("/update-player", { state: { player } });
  };

  const handleClick = () => {
    navigate("/add-player");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Players List</h1>
      <div className="grid grid-cols-1 bg-amber-100 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onDelete={handleDelete}
            onEdit={() => handleEdit(player)}
          />
        ))}
      </div>

      <div className="w-full flex justify-center">
        <button
          className="p-3 my-16 rounded-lg bg-blue-500 text-lg font-bold"
          onClick={handleClick}
        >
          Add Player
        </button>
      </div>
    </div>
  );
};

export default Home;
