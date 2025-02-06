import React from 'react';

const Player = ({ id, player, onClick }) => {
  return (
    <div key={id} id={id} className="matchup flex justify-between items-center m-1" onClick={onClick}>
      {player ? (
        <div className="flex items-center">
          {player.last_name == 'BYE' ? (
            <div className="player-card"></div>
          ) : (
            <img src={player.image} className="player-card" alt={`${player.first_name} ${player.last_name}`} />
          )}
          <span className="p-1 text-sm text-left syncopate">
            <span className="font-light">{player.first_name}</span>
            <div className="font-black">{player.last_name}</div>
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="player-card"></div>
          <span className="font-black p-1 syncopate text-sm"></span>
        </div>
      )}
      <span>
        <span className="text-xs rank px-1 py-1 mr-1">#1</span>
      </span>
    </div>
  );
};

export default Player;