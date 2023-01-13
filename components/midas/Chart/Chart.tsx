import styles from "./Chart.module.css"
import * as React from 'react'

export default function ChartItem({ data }: { data: Chart }) {

    if (!data) return <div> Loading...</div>
    if (data.length === 0) return <div> No data...</div>
    return (
        <>
            <div className={styles.container}>

                {data.map((t, k) =>
                    <div className={styles.user} key={k}>
                        <p className={t[1] >= 0 ? styles.positive : styles.negative}><span>{t[0]}</span> {t[1].toFixed(2)}</p>
                    </div>
                )}
            </div>

        </>
    )
}

