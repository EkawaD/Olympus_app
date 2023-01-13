import styles from "./Title.module.css"

type TitleProps = {
    icon: React.ReactNode
    children: React.ReactNode
    description: string
}


export default function Title({ icon, children, description }: TitleProps) {

    return (
        <>

            <h1 className={styles.main}> {icon} {children} <span>{description}</span></h1>
        </>
    )
}
