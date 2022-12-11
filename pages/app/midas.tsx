import Form from "../../components/common/Crud/Form";
import Input from "../../components/common/Crud/Form/Input";

import History from "../../components/midas/History"
import Chart from "../../components/midas/Chart"
import Advices from "../../components/midas/Advices"
import { useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import useSession from "../../hooks/useSession";
import { LoadingOverlay } from "@mantine/core";

export default function Midas() {

    const baseURL = useSession("baseURL")
    const jwt = useSession("jwt")

    const [users, setUsers] = useState<string[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [advices, setAdvices] = useState<string[]>([])
    const [chart, setChart] = useState<Chart>([])

    const transactionForm = useForm<MultiTransaction>({
        initialValues: {
            name: "",
            payer: "",
            payees: [""],
            amount: 0,
            createdAt: new Date()
        }
    })

    const addTransaction = async (values: MultiTransaction) => {
        values.payees.filter((p: any) => p !== values.payer).map(async (username: string) => {
            const transaction = {
                name: values.name,
                id: values.id,
                payer: values.payer,
                amount: Number((values.amount / values.payees.length).toFixed(2)),
                payee: username
            } as Transaction
            const res = await fetch(`${baseURL}/midas/coloc/transactions`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(transaction)
            })
            const newTransac = await res.json()
            setTransactions((t) => [...t, newTransac])
        })

        await updateChartAndAdvices()
    }
    const rmTransaction = async (id: number) => {
        const res = await fetch(`${baseURL}/midas/coloc/transactions/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        })
        const data = await res.json()
        setTransactions((h) => h.filter((t) => t.id !== data.id))
        await updateChartAndAdvices()
    }

    const updateChartAndAdvices = useCallback(() => {
        setAdvices([])
        const getChartAndAdvice = async () => {
            const res = await fetch(`${baseURL}/midas/coloc/chart`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            const chart = await res.json()

            setChart(chart)

            const resAdv = await fetch(`${baseURL}/midas/coloc/advices`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            const advices = await resAdv.json()
            advices.map((a: { debitor: string, amount: number, creditor: string }) => {
                setAdvices((adv) => [...adv, a.debitor + " doit " + a.amount + " € à " + a.creditor])
            })
        }
        getChartAndAdvice()
    }, [baseURL, jwt])

    useEffect(() => {
        const getGroup = async () => {
            const res = await fetch(`${baseURL}/midas/group/me`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            const data = await res.json()
            setUsers(data.anons.map((a: Anon) => a.pseudo))
            setTransactions(data.transactions)
            await updateChartAndAdvices()
        }

        if (baseURL && jwt) getGroup()
    }, [baseURL, jwt, updateChartAndAdvices])




    if (users.length === 0) return <LoadingOverlay visible />
    return (
        <>
            <div className="container">
                <div>
                    <h1>Tricount</h1>
                    <Form form={transactionForm} handler={addTransaction} className="form--transaction" >
                        <Input type={"text"} name={"name"} form={transactionForm}>Motif</Input>
                        <Input type={"euros"} name={"amount"} form={transactionForm}>Montant</Input>
                        <Input type={"select"} name={"payer"} form={transactionForm} selectData={users}>Payeur</Input>
                        <Input type={"multi-select"} name={"payees"} form={transactionForm} selectData={users}>Bénéficiaires</Input>
                    </Form>
                </div>
                <div className="history">
                    <h2> Historique </h2>
                    <History data={transactions} cta={rmTransaction} />
                </div>
                <div className="chart">
                    <h2> Résumé </h2>
                    <Chart data={chart} />
                </div>
                <div className="advices">
                    <h2> Comment rembourser ? </h2>
                    <Advices data={advices} />
                </div>


            </div>
        </>
    );

}