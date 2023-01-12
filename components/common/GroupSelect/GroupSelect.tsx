import { Select } from "@mantine/core"
import styles from "./GroupSelect.module.css"

type GroupProps = {
    data: string[]
    value: string,
    onChange: (value: string | null) => Promise<void>
}


export default function GroupSelect({ data, value, onChange }: GroupProps) {

    return (
        <>
            <Select className={styles.main} label="Mon groupe" data={data} value={value} onChange={onChange}></Select>
        </>
    )
}
