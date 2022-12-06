import * as React from "react";
import { Button, Table } from '@mantine/core';
import classes from "./Crud.module.css"
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";


type CrudType<T> = {
    children: React.ReactNode,
    newAction: () => void,
    editAction: (data: any) => void,
    deleteAction: (data: any) => Promise<void>,
    payload: T[],
    className?: string,
    title?: string
}

export default function Crud<T extends object>({ children, newAction, editAction, deleteAction, payload, className, title }: CrudType<T>) {

    const doNotDisplay = ["id", "_id", "__v", "userId", "profilId"]
    const columns = payload !== undefined && payload[0] !== undefined ? Object.keys(payload[0]).filter((col) => !doNotDisplay.includes(col)) : []

    const readableProp = (prop: any) => {
        if (prop === false) return "false"
        if (prop === true) return "true"
        if (!isNaN(Date.parse(prop)) && isNaN(prop)) return new Date(prop).toLocaleDateString()
        if (typeof prop === "string" && prop.includes("/uploads")) return prop.substring(9)
        if (Array.isArray(prop)) return prop.map((data) => (data.name || data.title || data) + ", ")
        if (prop === Object(prop)) return prop.name
        if ((typeof prop === 'string' || prop instanceof String) && prop.length >= 20) return prop.substring(0, 100) + "..."
        return prop
    }

    return (
        <>
            <div className={classes.container}>

                <div className={classes.head}>
                    <h2>{title}</h2>
                    <Button type="button" size="sm" data-attr="add" color="orange" variant="outline" onClick={() => newAction()}> + Ajouter </Button>
                </div>

                <Table className={className + " " + classes.table} >
                    <thead>
                        <tr>
                            {columns.map((column, key) => (
                                <th key={key}>{column.toUpperCase()}</ th>
                            ))}
                            <th style={{ minWidth: "100px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {payload && payload.map((data, key) => (
                            <tr key={key}>
                                {columns.map((column, key) => (
                                    <td key={key}>{readableProp(data[column as keyof typeof data])}</td>
                                ))}
                                <td className={classes.actions}>
                                    <button className={classes.b} data-attr="edit" onClick={() => editAction(data)}><AiFillEdit /></button>
                                    <button className={classes.b} data-attr="delete" onClick={() => deleteAction(data)}><AiOutlineClose /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {children}
            </div>



        </>
    );
}