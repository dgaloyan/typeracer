import React, {useEffect, useState} from 'react'
import {withAppContainer}           from '../../withAppContainer'

const Stats = ({appContainer}) => {

    const [stats, setStats] = useState(null)

    useEffect(() => {

        const statsRepository = appContainer.getStatsRepository()

        Promise.resolve().then(async () => {
            const allStats  = await statsRepository.get()
            const userStats = allStats.data.find(user => user.username === appContainer.getUserRepository().get().username)

            setStats(
                userStats
            )
        })

    }, [appContainer])

    return (
        <div style={{margin: '0 auto', width: 800}}>
            {stats && (
                <>
                    <h1>{stats.username}</h1>
                    {stats.stats.map((stat, key) => {
                        return (
                            <div key={key} style={{marginBottom: 8}}>
                                {stat.map((st, key) => <div
                                    key={st}>{key === stat.length - 1 ? (new Date(st)).toString() : st}</div>)}
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default withAppContainer(Stats)