import React from 'react';
import Entry from './entry';


const Round = ({ name, entries, selectWinner }) => {
    return (
        <section aria-labelledby={name}>
            <h2 className="round-title">{name}</h2>
            <ol>
                {entries.filter(entry => entry.round === name).map((entry) => (
                    <Entry key={entry.id} entry={entry} selectWinner={selectWinner} />
                ))
                }
            </ol>
        </section>
    );
};

export default Round;