import styles from "./History.module.css"
import * as React from 'react'
import { Button } from "@mantine/core";

export default function History({ data, cta }: { data: Transaction[], cta: (id: number) => Promise<void> }) {


    if (data.length === 0) return <div> No transactions...</div>
    return (
        <>
            {data.map((t, k) =>

                <div className={styles.container} key={k}>
                    <p>{t.payer} à payé {t.amount}€ </p>
                    <p>Motif: {t.name} </p>
                    <p>Le: {new Date(t.createdAt).toLocaleDateString()}</p>
                    <p>Pour: {t.payee}</p>
                    <Button size="sm" color="red" onClick={() => cta(t.id as number)}>X</Button>

                </div>
            )}

        </>
    )
}

