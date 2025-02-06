import React from 'react';
import Player from './player';

const Entry = ({ entry, selectWinner }) => {
    return (
        <li>
            <div>
                <Player player={entry.player1} id={entry.previous_entry1_id} onClick={() => selectWinner(entry.id, entry.player1)} />
                <Player player={entry.player2} id={entry.previous_entry2_id} onClick={() => selectWinner(entry.id, entry.player2)} />
            </div>
        </li>
    );
};

export default Entry;