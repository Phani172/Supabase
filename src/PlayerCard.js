import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const PlayerCard = ({ player, onDelete, onEdit }) => {
  return (
    <div className="max-w-sm rounded flex justify-between px-2 overflow-hidden shadow-lg py-4 m-2 bg-green-300">
      <div>
        <div className="font-bold text-xl mb-2">{player.player_name}</div>
        <p className="text-gray-700 text-lg">Country: {player.country}</p>
        <p className="text-gray-700 text-base">Age: {player.age}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(player.id)}
          className="text-blue-500 hover:text-blue-700"
        >
          <PencilIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => onDelete(player.id)}
          className="text-red-500 hover:text-red-700"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
