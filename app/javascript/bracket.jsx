import React, { Children } from 'react';
import axios from 'axios';
import Round from './components/round';
import Player from './components/player';
import CSRFToken from './components/cookie';
import { createRoot } from 'react-dom/client';
import { domToPng } from 'modern-screenshot'


const ViewButton = ({ view, setView, name, children }) => {
    return (
        <button
            className={`w-1/8 h-14 text-xs text-gray-700 border border-gray-300 rounded-lg shadow-sm transition ${view === name ? 'bg-purple-950 text-white' : 'bg-white hover:bg-gray-100'}`}
            onClick={() => setView(name)}
        >
            {children}
        </button>
    )
}

const HelloWorld = () => {
    // create a useeffect to fetch data from the current url + .json
    const [bracket, setBracket] = React.useState({ entries: [] });
    const [players, setPlayers] = React.useState([]);
    const [saving, setSaving] = React.useState(false);
    const [view, setView] = React.useState(
        window.innerWidth > 1024 ? 'all' : 'left'
    );
    const [saveImageRunning, setSaveImageRunning] = React.useState(false);

    const [showToolbar, setShowToolbar] = React.useState(true);

    const [readOnly, setReadOnly] = React.useState(true);

    const ONE_MINUTE = 3000;
    const [timestamp, setTimestamp] = React.useState(Date.now());

    React.useEffect(() => {
        axios.get(window.location.href + '.json')
            .then((response) => {
                setBracket(response.data);
                setReadOnly(response.data.read_only)

                console.log(response.data)
            });
    }, []);
    
    React.useEffect(() => {
        if(saveImageRunning) {
            console.log('saving image')
            
            setSaveImageRunning(false)
            setShowToolbar(false)

            console.log('domToPNg')
            console.log(document.querySelector('#root'))
            domToPng(document.querySelector('#root')).then(dataUrl => {
                console.log('yep')
                console.log(dataUrl)
                const link = document.createElement('a')
                link.download = 'Unrivaled Bracket.png'
                link.href = dataUrl
                link.click()
            })
        }
    }, [saveImageRunning]);

    const share = () => {
        if (readOnly) {
            return;
        }
        save();
        navigator.clipboard.writeText(window.location.href)
        alert("Copied!")
    }

    const save = () => {
        if (readOnly) {
            return;
        }
        setSaving(true);
        axios.patch(window.location.href, { bracket: { bracket_entries: bracket.entries } }, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": CSRFToken(document.cookie)
            }
        })
            .then((response) => {
                setSaving(false);
            });


    }

    const saveImage = () => {
        setView('all')
        setShowToolbar(false)
        setSaveImageRunning(true)
    }


    const selectWinner = (entryId, player) => {
        if (readOnly) {
            return;
        }
        if (!player || player.last_name === 'BYE') {
            return;
        }


        let updatedBracket = { ...bracket };
        let entryToUpdate = updatedBracket.entries.find((entry) => entry.id === entryId);
        entryToUpdate.predicted_winner = player;

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

        // clear out any entries that aren't in the first round that had the oldPlayer1 or oldPlayer2
        updatedBracket.entries.forEach((entry) => {
            if (entry.round == 'First Round') {

                return;
            }
            if (entry.id <= entryId) {
                return;
            }


            if (oldPlayer2 && entry.player2 == oldPlayer2) {
                entry.player2 = null;
            }
            if (oldPlayer2 && entry.player1 == oldPlayer2) {
                entry.player1 = null;
            }

            if (oldPlayer1 && entry.player2 == oldPlayer1) {
                entry.player2 = null;
            }

            if (oldPlayer1 && entry.player1 == oldPlayer1) {
                entry.player1 = null
            }

        })

        setBracket(updatedBracket);

        const now = Date.now();
        if (timestamp && now - timestamp >= ONE_MINUTE) {
            setTimestamp(now);
            save();
        }
    }
    let winner = bracket.entries.find(entry => entry.round === 'Winner');

    // check if the device is a desktop and set the view to all


    return (
        <div className={`flex flex-col ${view == 'all' ? 'max-lg:min-w-725' : ''}`} >
            <h1 className="tournament-title syncopate">Unrivaled<br /> 1-on-1 Tournament</h1>
            {showToolbar && <div className="toolbar flex flex-col">
                <a className="px-6 py-2 mb-3 w-1/2 text-gray-700 border border-gray-300  text-white rounded-lg shadow-sm hover:bg-gray-100 transition self-center"
                    href="/"
                >
                    Create New Bracket
                </a>
                <div className="flex mb-5 justify-between items-center">
                    <ViewButton view={view} setView={setView} name='left'>Second Round</ViewButton>
                    <ViewButton view={view} setView={setView} name='left-second'>Quarter Round</ViewButton>
                    <ViewButton view={view} setView={setView} name='left-quarter'>Semi Finals</ViewButton>

                    <ViewButton view={view} setView={setView} name='finals'>Finals</ViewButton>

                    <ViewButton view={view} setView={setView} name='right-quarter'>Semi Finals</ViewButton>
                    <ViewButton view={view} setView={setView} name='right-second'>Quarter Finals</ViewButton>
                    <ViewButton view={view} setView={setView} name='right'>Second Round</ViewButton>
                </div>
                <div className="flex mb-5 justify-between items-center">
                    {readOnly ? null :
                        <button
                            className="px-6 py-2 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition"
                            onClick={() => share()}
                        >
                            🔗 Share
                        </button>
                    }
                    {/* {readOnly ? null :
                        <button
                            className="px-6 py-2 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition "
                            onClick={() => saveImage()}
                        >
                            📸 Screenshot
                        </button>
                    } */}
                    <button
                        className={`px-6 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm transition ${view === 'all' ? 'bg-purple-950 text-white' : 'bg-white hover:bg-gray-100'}`}
                        onClick={() => setView('all')}
                    >
                        Entire Bracket
                    </button>
                    {readOnly ? null :
                        <button
                            className="px-6 py-2 text-gray-700 border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition"
                            onClick={() => save()}
                        >
                            {saving && "Saving..."}
                            {!saving && "💾 Save"}
                        </button>
                    }
                </div>
            </div>

            }
            <div className="bracket">
                {(view == 'left') &&
                    <React.Fragment>
                        <Round name="First Round" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Second Round" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                    </React.Fragment>
                }

                {(view == 'left-second') &&
                    <React.Fragment>
                        <Round name="Second Round" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Quarter Finals" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                    </React.Fragment>
                }

                {(view == 'left-quarter') &&
                    <React.Fragment>
                        <Round name="Quarter Finals" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Semi Finals" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                    </React.Fragment>
                }


                {(view == 'finals') &&
                    <React.Fragment>
                        <Round name="Semi Finals" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Final" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Semi Finals" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                    </React.Fragment>
                }


                {(view == 'right-quarter') &&
                    <React.Fragment>
                        <Round name="Semi Finals" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                        <Round name="Quarter Finals" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                    </React.Fragment>
                }

                {(view == 'right-second') &&
                    <React.Fragment>
                        <Round name="Quarter Finals" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                        <Round name="Second Round" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                    </React.Fragment>
                }

                {(view == 'right') &&
                    <React.Fragment>
                        <Round name="Second Round" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                        <Round name="First Round" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                    </React.Fragment>
                }

                {(view == 'all') &&
                    <React.Fragment>
                        <Round name="First Round" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Second Round" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Quarter Finals" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Semi Finals" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Final" entries={bracket.entries} selectWinner={selectWinner} side="left" />
                        <Round name="Semi Finals" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                        <Round name="Quarter Finals" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                        <Round name="Second Round" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                        <Round name="First Round" entries={bracket.entries} selectWinner={selectWinner} side="right" />
                    </React.Fragment>
                }


            </div>
            {winner && (view == 'finals' || view == 'all') &&
                <div className={`w-screen flex justify-center  ${view == 'all' ? 'max-lg:min-w-725' : ''}`}>
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

console.log('Mounting React');
// on document load, render the HelloWorld component to the root element
document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('root'));
    root.render(<HelloWorld />);
})