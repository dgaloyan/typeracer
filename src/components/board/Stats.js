import React from 'react'

const Stats = ({stats}) => {
    return (
        <div className={'stats'}>
            {stats.length > 0 && (
                <>
                    {stats.map((stat) => <div key={stat}>{stat}</div>)}
                    <p>You can see your stats by navigating to <a href="/stats">stats</a></p>
                </>
            )}
        </div>
    )
}

export default Stats