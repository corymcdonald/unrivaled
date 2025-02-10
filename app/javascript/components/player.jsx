import React from 'react';

const Player = ({ id, player, onClick, isWinner }) => {
  let textSize = 'text-sm';
  let playerCard = 'player-card';
  if (isWinner) {
    textSize = 'text-lg'; 
    playerCard = 'player-card-winner';
  }

  const selectPlayer = () => {
    if (player && !player.is_out &&  player.last_name != 'BYE') {
      onClick();
    }
  }

  return (
    <div key={id} id={id} className={`matchup flex justify-between items-center m-1 `}  onClick={selectPlayer}>
      {player ? (
        <div className={`flex items-center ${player && player.is_out ? 'opacity-50' : ''}`}>
          {player.last_name == 'BYE' ? (
            <div className={playerCard}></div>
          ) : (
            <img src={player.image} className={playerCard} alt={`${player.first_name} ${player.last_name}`} />
          )}
          <span className={`p-1 ${textSize} text-left syncopate`}>
            <span className="font-light">{player.first_name}</span>
            <div className="font-black">{player.last_name}</div>
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="player-card"></div>
          <span className={`p-1 ${textSize} text-left syncopate`}></span>
        </div>
      )}
      <span>
       {player && player.is_out && <span class="opacity-100 syncopate font-bold"> OUT</span>}

        {player && player.last_name != 'BYE' && 
         <span className={`${textSize} rank px-1 py-1 mr-1`}>{`${player?.rank ? player.rank :''}`}</span>
      }
      </span>
    </div>
  );
};

export default Player;