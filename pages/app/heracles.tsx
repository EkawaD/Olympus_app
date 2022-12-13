import { LoadingOverlay, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import Form from "../../components/common/Crud/Form";
import Input from "../../components/common/Crud/Form/Input";
import useGroup from "../../hooks/useGroup";
import useSession from "../../hooks/useSession";


export default function Heracles() {

    const jwt = useSession("jwt")
    const baseURL = useSession("baseURL")
    const { groups, currentGroup, setCurrentGroup, setGroupName } = useGroup()
    const [render, setRender] = useState(true)


    const [categories, setCategories] = useState<Category[]>([])
    const categoryForm = useForm<Category>({
        initialValues: {
            name: "",
        }
    })
    const addCategory = async (value: { name: string }) => {
        const res = await fetch(`${baseURL}/heracles/${currentGroup.name}/category`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        })
        const data = await res.json()
        setCategories((c) => [...c, data])
        categoryForm.reset()
    }
    const deleteCategory = async (id: number) => {
        const res = await fetch(`${baseURL}/heracles/${currentGroup.name}/category/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
        const data = await res.json()
        setCategories((c) => c.filter((c) => c.id !== id))
    }

    const todoForm = useForm<Todo>({
        initialValues: {
            task: "",
            completed: false,
            category: ""
        }
    })
    const addTodo = async (value: Todo) => {
        const category = categories.find((c) => c.name === value.category) as Category
        const body = {
            task: value.task,
            categoryId: category.id
        }

        const res = await fetch(`${baseURL}/heracles/${currentGroup.name}/todo`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        setCategories((d) => d.map((c) => c.name === value.category ?
            { ...c, todos: [...c.todos || [], data as Todo] } : c))
        todoForm.reset()
    }
    const updateTodo = async (todo: Todo) => {
        const res = await fetch(`${baseURL}/heracles/${currentGroup.name}/todo/${todo.id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ completed: !todo.completed })
        })
        const data = await res.json()
        setCategories((categories) => categories.map((c) => c.id === data.categoryTodoId
            ? {
                ...c, todos: c.todos?.map((t) =>
                    t.id === data.id
                        ? { ...t, completed: !t.completed }
                        : t
                )
            }
            : c))
    }

    useEffect(() => {
        if (currentGroup) {
            setCategories(currentGroup.todos)
        }
    }, [currentGroup])

    if (!currentGroup || !groups) return <LoadingOverlay visible />
    return (
        <>
            <h1>TODO</h1>

            <div className="group">
                <Select data={groups.map((g) => g.name)} value={currentGroup.name} onChange={setGroupName}></Select>
            </div>
            <h2>Catégories</h2>
            <Form form={categoryForm} handler={addCategory}>
                <Input type="text" name="name" form={categoryForm}>Nouvelle Catégorie</Input>
            </Form>
            {categories.map((c, k) =>
                <div className="categoryTodo" key={k}>
                    <h1>{c.name} <button onClick={() => deleteCategory(c.id as number)}>X</button></h1>
                    {c.todos?.map((t, kk) =>
                        <div key={kk} onClick={() => updateTodo(t)} >
                            {t.task}
                            {t.completed.toString()}
                        </div>
                    )}
                </div>
            )}
            <h2>Add Todo</h2>
            <Form form={todoForm} handler={addTodo}>
                <Input type="text" name="task" form={todoForm}>Nouvelle tâche</Input>
                <Input type="select" name="category" form={todoForm} selectData={categories.map((c) => c.name)}>Catégorie</Input>
            </Form>

        </>
    );

}