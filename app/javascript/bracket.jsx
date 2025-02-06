import React from 'react';
import axios from 'axios';
import Round from './components/round';
import Player from './components/player';

const HelloWorld = () => {
    // create a useeffect to fetch data from the current url + .json
    const [bracket, setBracket] = React.useState({ entries: [] });
    const [players, setPlayers] = React.useState([]);
    const [view, setView] = React.useState(
        window.innerWidth > 1024 ? 'all' : 'left'
    );

    const ONE_MINUTE = 1;
    const [timestamp, setTimestamp] = React.useState(Date.now());

    React.useEffect(() => {
        axios.get(window.location.href + '.json')
            .then((response) => {
                setBracket(response.data);

                let convertedPlayers = response.data.players.reduce((acc, player) => {
                    acc[player.id] = player;
                    return acc;
                }, {});

                setPlayers(convertedPlayers);
            });
    }, []);

    const share = () => {
        // save();
        navigator.clipboard.writeText(window.location.href)
        alert("Copied!")
    }

    const save = () => {
        console.log('saving..')
        axios.patch(window.location.href, { bracket: bracket })
            .then((response) => {
                console.log(response);
            });


    }

    const selectWinner = (entryId, player) => {
        if (!player || player.last_name === 'BYE') {
            return;
        }

        let entryToUpdate = bracket.entries.find((entry) => entry.id === entryId);

        let updatedBracket = { ...bracket };

        let parentEntry = updatedBracket.entries.find((entry) => entry.id == entryToUpdate.parent_bracket_id);
        let oldPlayer1 = null;
        let oldPlayer2 = null;

        if (parentEntry.previous_entry1_id == entryId) {
            oldPlayer1 = parentEntry.player1;
            parentEntry.player1 = player;


        } else if (parentEntry.previous_entry2_id == entryId) {
            oldPlayer2 = parentEntry.player2;
            parentEntry.player2 = player;
        }
        console.log({ oldPlayer1, oldPlayer2 })


        // clear out any entries that aren't in the first round that had the oldPlayer1 or oldPlayer2
        updatedBracket.entries.forEach((entry) => {
            if (entry.round == 'First Round') {
                console.log('returning early')

                return;
            }
            if (entry.id <= entryId) {
                console.log('returning early')
                return;
            }


            if (oldPlayer2 && entry.player2 == oldPlayer2) {
                console.log('Found oldPlayer2 in a later round as player2')
                console.log(entry)
                entry.player2 = null;
            }
            if (oldPlayer2 && entry.player1 == oldPlayer2) {
                console.log('Found oldPlayer2 in a later round as player1')
                console.log(entry)
                entry.player1 = null;
            }

            if (oldPlayer1 && entry.player2 == oldPlayer1) {
                console.log('Found oldPlayer1 in a later round as player2')
                console.log(entry)
                entry.player2 = null;
            }

            if (oldPlayer1 && entry.player1 == oldPlayer1) {
                console.log('Found oldPlayer1 in a later round as player1')
                console.log(entry)
                entry.player1 = null
            }

        })

        setBracket(updatedBracket);

        console.log(updatedBracket.entries)
        console.log(parentEntry)

        const now = Date.now();
        if (timestamp && now - timestamp >= ONE_MINUTE) {
            setTimestamp(now);
            save();
        }
    }
    let winner = bracket.entries.find(entry => entry.round === 'Winner');

    // check if the device is a desktop and set the view to all


    return (
        <div className='flex flex-col' >
            <h1 className="tournament-title syncopate">Unrivaled<br /> 1-on-1 Tournament</h1>
            <div className="flex mb-5 justify-between items-center">
                <button
                    className={`px-6 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm transition ${view === 'left' ? 'bg-purple-950 text-white' : 'bg-white hover:bg-gray-100'}`}
                    onClick={() => setView('left')}
                >
                    Left Side
                </button>
                <button
                    className={`px-6 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm transition ${view === 'finals' ? 'bg-purple-950 text-white' : 'bg-white hover:bg-gray-100'}`}
                    onClick={() => setView('finals')}
                >
                    Finals
                </button>
                <button
                    className={`px-6 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm transition ${view === 'right' ? 'bg-purple-950 text-white' : 'bg-white hover:bg-gray-100'}`}
                    onClick={() => setView('right')}
                >
                    Right Side
                </button>
            </div>
            <div className="flex mb-5 justify-between items-center">
                <button
                    className="px-6 py-2 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition"
                    onClick={() => share()}
                >
                    🔗 Share
                </button>
                <button
                    className={`px-6 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm transition ${view === 'all' ? 'bg-purple-950 text-white' : 'bg-white hover:bg-gray-100'}`}
                    onClick={() => setView('all')}
                >
                    Entire Bracket
                </button>
                <button
                    className="px-6 py-2 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition"
                    onClick={() => save()}
                >
                    💾 Save
                </button>
            </div>



            <div className="bracket">
                {(view == 'left' || view == 'all') &&
                    <React.Fragment>
                        <Round name="First Round" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Second Round" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                    </React.Fragment>
                }
                {(view == 'finals' || view == 'all') &&
                    <React.Fragment>
                        <Round name="Quarter Final" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Semi Final" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Final" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Semi Final" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                        <Round name="Quarter Final" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                    </React.Fragment>
                }
                {(view == 'right' || view == 'all') &&
                    <React.Fragment>
                        <Round name="Second Round" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                        <Round name="First Round" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                    </React.Fragment>
                }


             
            </div>
            {winner && (view == 'finals' || view == 'all') &&
                    <div className="w-screen flex justify-center ">
                    <div className='w-md  '>
                        <h2 className="text-5xl font-black syncopate">
                            WINNER
                        </h2>
                        <Player player={winner.player1} id={winner.previous_entry1_id} isWinner={true} />
                    </div>
                    </div>

                }

        </div>
    );
};
console.log('hi')

import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<HelloWorld />);
