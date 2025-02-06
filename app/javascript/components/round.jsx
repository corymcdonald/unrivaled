import React from 'react';
import Entry from './entry';


const Round = ({ name, entries, selectWinner, side }) => {
    let roundEntries = entries.filter(entry => entry.round === name);
    const half = Math.ceil(roundEntries.length / 2);
    roundEntries = side === 'right' ?  roundEntries.slice(half) : roundEntries.slice(0, half) ;
    let className = `${side}-bracket`;
    if(['Final', 'Semi Final'].indexOf(name) > -1) {
        className = 'final-bracket';
    }

    return (
        <section aria-labelledby={name} className={className}>
            <h2 className="round-title matchup p-1 uppercase italic">{name}</h2>
            <ol className="min-w-45">
                {roundEntries.map((entry) => (
                    <Entry key={entry.id} entry={entry} selectWinner={selectWinner}  />
                ))
                }
            </ol>
        </section>
    );
};

export default Round;