import { Checkbox } from "@mantine/core"
import styles from "./PostIt.module.css"

type PostItProps = {
    category: Category
    handlerDeleteCategory: (id: number) => Promise<void>,
    handlerUpdateTodo: (todo: Todo) => Promise<void>,
    handlerDeleteTodo: (todo: Todo) => Promise<void>,
}


export default function PostIt({ category, handlerDeleteCategory, handlerUpdateTodo, handlerDeleteTodo }: PostItProps) {

    return (
        <>

            <div className={styles.categoryTodo}>
                <h2>{category.name} <span onClick={() => handlerDeleteCategory(category.id as number)}>X</span></h2>
                {category.todos?.map((t, kk) =>
                    <div key={kk} className={styles.task_container}>
                        <Checkbox checked={t.completed} onChange={() => handlerUpdateTodo(t)} label={t.task} className={t.completed ? styles.task + " " + styles.checked : styles.task} />
                        <span onClick={() => handlerDeleteTodo(t)}>X</span>
                    </div>
                )}
            </div>

        </>
    )
}
