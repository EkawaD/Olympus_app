import styles from "./History.module.css"
import * as React from 'react'
import { Button } from "@mantine/core";

export default function History({ data, cta }: { data: Transaction[], cta: (id: number) => Promise<void> }) {


    if (data.length === 0) return <div> No transactions...</div>
    return (
        <>
            {data.map((t, k) =>
                <div className={styles.container} key={k}>
                    <p>{new Date(t.createdAt).toLocaleDateString()}</p>
                    <p><span>{t.payer}</span>à payé<span>{t.amount}€</span>
                        à<span>{t.payee}</span>pour le motif<span>{t.name}</span>
                    </p>
                    <p onClick={() => cta(t.id as number)}>X</p>
                </div>
            )}

        </>
    )
}

