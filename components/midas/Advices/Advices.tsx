import styles from "./Advices.module.css"
import * as React from 'react'
import { Button } from "@mantine/core"



export default function Advices({ data }: { data: string[] }) {




    if (!data) return <div> Loading...</div>
    if (data.length === 0) return <div>...</div>
    return (
        <>
            <div className={styles.container}>

                {data.map((t, k) =>
                    <div key={k}>
                        <p >{t}</p>
                    </div>
                )}
            </div>

        </>
    )
}

