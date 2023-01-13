import styles from "./Advices.module.css"
import * as React from 'react'



export default function Advices({ data }: { data: string[] }) {




    if (!data) return <div> Loading...</div>
    if (data.length === 0) return <div>No data...</div>
    return (
        <>
            <div className={styles.container}>

                {data.map((t, k) =>
                    <div className={styles.advice} key={k}>
                        <p >{t}</p>
                    </div>
                )}
            </div>

        </>
    )
}

