import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import Form from "../../components/common/Crud/Form";
import Input from "../../components/common/Crud/Form/Input";
import useSessionStorage from "../../hooks/useSession";


export default function Heracles() {

    const jwt = useSessionStorage("jwt")
    const baseURL = useSessionStorage("baseURL")
    const [groups, setGroups] = useState<string[]>([])
    const [currentGroup, setCurrentGroup] = useState<string | null>(null)
    const [firstRender, setFirstRender] = useState<boolean>(true)

    const [categories, setCategories] = useState<Category[]>([])
    const categoryForm = useForm<Category>({
        initialValues: {
            name: "",
        }
    })
    const addCategory = async (value: { name: string }) => {
        const res = await fetch(`${baseURL}/heracles/${currentGroup}/category`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        })
        const data = await res.json()
        setCategories((c) => [...c, data])
    }
    const deleteCategory = async (id: number) => {
        const res = await fetch(`${baseURL}/heracles/${currentGroup}/category/${id}`, {
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

        const res = await fetch(`${baseURL}/heracles/${currentGroup}/todo`, {
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
    }
    const updateTodo = async (categoryName: string, id: number) => {
        // TODO update Category
        console.log('update');
    }

    useEffect(() => {
        const getGroup = async () => {
            const res = await fetch(`${baseURL}/users/group/me`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            const groups = await res.json()

            setGroups(groups.map((g: Group) => g.name))
            if (firstRender) {
                setCurrentGroup(groups[0].name)
                setCategories(groups[0].todos)
                setFirstRender(false)
            } else {
                const group = groups.find((g: Group) => g.name === currentGroup)
                setCategories(group.todos)
            }
        }
        if (baseURL && jwt) getGroup()

    }, [baseURL, jwt, firstRender, currentGroup])

    return (
        <>
            <h1>TODO</h1>

            <div className="group">
                <Select data={groups} value={currentGroup} onChange={setCurrentGroup}></Select>
            </div>
            <h2>Catégories</h2>
            <Form form={categoryForm} handler={addCategory}>
                <Input type="text" name="name" form={categoryForm}>Nouvelle Catégorie</Input>
            </Form>
            {categories.map((c, k) =>
                <div className="categoryTodo" key={k}>
                    <h1>{c.name} <button onClick={() => deleteCategory(c.id as number)}>X</button></h1>
                    {c.todos?.map((t, kk) =>
                        <div key={kk} onClick={() => updateTodo(c.name, t.id as number)} >
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