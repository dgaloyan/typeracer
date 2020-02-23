import React from 'react';

const Stats = ({stats}) => {
    return (
        <div className={'stats'}>
            {stats.map((stat) => <div key={stat}>{stat}</div>)}
        </div>
    );
};

export default Stats;