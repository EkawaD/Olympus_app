import styles from "./Chart.module.css"
import * as React from 'react'

export default function ChartItem({ data }: { data: Chart }) {

    if (!data) return <div> Loading...</div>
    if (data.length === 0) return <div> No data...</div>
    return (
        <>
            <div className={styles.container}>

                {data.map((t, k) =>
                    <div key={k}>
                        <p>{t[0]}</p>
                        <p>{t[1]}</p>
                    </div>
                )}
            </div>

        </>
    )
}

