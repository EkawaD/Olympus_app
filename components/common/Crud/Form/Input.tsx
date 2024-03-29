import { useEffect, useState } from "react";
import * as React from "react"
import { TextInput, Textarea, NumberInput, Select, Group, Checkbox, MultiSelect, Button, ColorInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import createStyles from './Form.styles';
import { FileInput } from './FileInput';
import { UseFormReturnType } from '@mantine/form';
import { supabase } from "../../../../middleware/supabase";
import Image from "next/image"

type selectDataType = { value: string, label: string }[] | string[]


type InputProps = {
    type: string,
    name: string,
    form: UseFormReturnType<any>
    children: string,
    selectData?: selectDataType
    propertyToRender?: string,
    handler?: (data: FormData) => void,
}

export default function Input({ type, name, form, children, selectData, propertyToRender, handler }: InputProps) {


    if (type === "select" && selectData === undefined) { throw Error("You must specify the data for a select input") }
    if (type === "file" && handler === undefined) { throw Error("You must specify the handler (handleFile) for a File input") }
    const { classes } = createStyles();
    const [objectURL, setObjectURL] = useState("");



    const dataToRender = selectData !== undefined && typeof selectData[0] !== "string"
        ? selectData.map((d) => d[propertyToRender as keyof typeof d])
        : selectData as unknown as string[]
    const [data, setData] = useState<string[]>([""])


    const valueSelect = Array.isArray(form.values[name]) && form.values[name][0] !== undefined
        ? form.values[name].map((p: any) => p[propertyToRender as keyof typeof p])
        : form.values[name] === Object(form.values[name]) ? form.values[name][propertyToRender as string] : form.values[name]

    const [value, setValue] = useState(valueSelect)


    const [render, setRender] = useState(true)
    useEffect(() => {
        if (render) {
            if (Array.isArray(valueSelect) && valueSelect[0] !== undefined) {
                form.setFieldValue(name, valueSelect)
            } else {
                form.setFieldValue(name, value)
            }
            setRender(false)
        }
    }, [form, render, name, valueSelect, value, dataToRender])

    useEffect(() => {
        setData(selectData as unknown as string[])
    }, [selectData])


    const handlerFile = (event: React.ChangeEvent<HTMLInputElement>, formData: FormData) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setObjectURL(`${i.name}`)
            form.setFieldValue(name, `${i.name}`)
            handler ? handler(formData) : null
        };

    }

    const getFile = (objectURL: string) => {
        const obj = objectURL ? supabase.storage.from('olympus').getPublicUrl(objectURL) : supabase.storage.from('olympus').getPublicUrl(form.values[name] as string)
        return obj.data.publicUrl
    }


    switch (type) {
        case "text":
            return <TextInput
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`)}
            />
        case "long":
            return <TextInput
                label={children}
                className={classes.input + " " + classes.long}
                {...form.getInputProps(`${name}`)}
            />
        case "textarea":
            return <Textarea
                label={children}
                className={classes.input + " " + classes.textarea}
                autosize
                minRows={2}
                maxRows={4}
                {...form.getInputProps(`${name}`)}
            />
        case "content":
            return <Textarea
                label={children}
                className={classes.input + " " + classes.textarea}
                autosize
                minRows={20}
                maxRows={100}
                {...form.getInputProps(`${name}`)}
            />
        case "date":
            return <DatePicker
                initialLevel="month"
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`)}
            />
        case "color":
            return <ColorInput
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`)}
            />;
        case "number":
            return <NumberInput
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`)}
            />
        case "checkbox":
            return <Checkbox
                label={children}
                className={classes.input + " " + classes.checkbox}
                {...form.getInputProps(`${name}`, { type: 'checkbox' })}
            />
        case "multi-select":
            return <MultiSelect
                label={children}
                data={data}
                className={classes.input}
                value={value}
                onChange={(d) => {
                    setValue(d)
                    setRender(true)
                }}
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                    setData((current) => [...current || data, query]);
                    return query;
                }}

            />

        case "euros":
            return <NumberInput
                label={children}
                className={classes.input}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                step={10}
                precision={2}
                defaultValue={1}
                icon={"€"}
                {...form.getInputProps(`${name}`)}
            />
        case "select":
            return (
                <Select
                    label={children}
                    className={classes.input}
                    data={data}
                    value={value}
                    onChange={(data) => {
                        setValue(data)
                        setRender(true)
                    }}
                />
            )
        case "image":
            return (
                <>
                    <Group className={classes.fileInput}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image width={80} height={100} alt="Photo de profil" priority src={getFile(objectURL)} />
                        <FileInput
                            label={children}
                            uploadFileName="theFiles"
                            onChange={handlerFile}
                        />
                    </Group>

                </>
            )
        case "file":
            return (
                <>
                    <Group className={classes.fileInput}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <p>{objectURL ? objectURL : form.values[name] as string}</p>
                        <FileInput
                            label={children}
                            uploadFileName="theFiles"
                            onChange={handlerFile}
                        />
                    </Group>

                </>
            )
        case "_id":
            return null;
        case "id":
            return null;
        case null:
            return null;
        default:
            return <TextInput
                label={children}
                className={classes.input}
                {...form.getInputProps(`${name}`)}
            />
    }


}