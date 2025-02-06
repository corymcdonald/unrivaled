import React from 'react';
import axios from 'axios';
import Entry from './components/entry';
import Round from './components/round';

const HelloWorld = () => {
    // create a useeffect to fetch data from the current url + .json
    const [bracket, setBracket] = React.useState({entries: []});
    const [players, setPlayers] = React.useState([]);

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

    const selectWinner = (entryId, player) => {
        if(!player || player.last_name === 'BYE') {
            return;
        }

        let entryToUpdate = bracket.entries.find((entry) => entry.id === entryId);

        let updatedBracket = {...bracket};

        let parentEntry = updatedBracket.entries.find((entry) => entry.id == entryToUpdate.parent_bracket_id);
        let oldPlayer1 = null;
        let oldPlayer2 = null;

        if(parentEntry.previous_entry1_id == entryId) {
            oldPlayer1 = parentEntry.player1;
            parentEntry.player1 = player;
            

        } else if (parentEntry.previous_entry2_id == entryId) {
            oldPlayer2 = parentEntry.player2;
            parentEntry.player2 = player;
        }
        console.log({oldPlayer1, oldPlayer2})


        // clear out any entries that aren't in the first round that had the oldPlayer1 or oldPlayer2
        updatedBracket.entries.forEach((entry) => {
            if(entry.round == 'First Round') {
                console.log('returning early')

                return;
            }
            if( entry.id <= entryId) {
                console.log('returning early')
                return;
            }


            if(oldPlayer2 && entry.player2 == oldPlayer2) {
                console.log('Found oldPlayer2 in a later round as player2')
                console.log(entry)
                entry.player2 = null;
            }
            if(oldPlayer2 && entry.player1 == oldPlayer2) {
                console.log('Found oldPlayer2 in a later round as player1')
                console.log(entry)
                entry.player1 = null;
            }

            if(oldPlayer1 && entry.player2 == oldPlayer1) {
                console.log('Found oldPlayer1 in a later round as player2')
                console.log(entry)
                entry.player2 = null;
            }

            if(oldPlayer1 && entry.player1 == oldPlayer1) {
                console.log('Found oldPlayer1 in a later round as player1')
                console.log(entry)
                entry.player1 = null
            }

            
        })

        setBracket(updatedBracket);

        console.log(updatedBracket.entries)
        console.log(parentEntry)
    }

    return (
        <div className="bracket">
       
            <Round name="First Round" entries={bracket.entries} selectWinner={selectWinner} />

            <Round name="Second Round" entries={bracket.entries} selectWinner={selectWinner} />
            <Round name="Quarter Final" entries={bracket.entries} selectWinner={selectWinner} />
            <Round name="Semi Final" entries={bracket.entries} selectWinner={selectWinner} />
            <Round name="Final" entries={bracket.entries} selectWinner={selectWinner} />
            <Round name="Winner" entries={bracket.entries} selectWinner={selectWinner} />
{/* 
            <section aria-labelledby="round-2">
                <h2 id="round-2" className="round-title">Round 2</h2>
                <ol>
                    {bracket.entries.filter(entry => entry.round === 'Second Round').map((entry) => (
                        <Entry key={entry.id} entry={entry} />
                    ))}
                </ol>
            </section> */}

        </div>
    );
};
console.log('hi')

import {createRoot} from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<HelloWorld />);
