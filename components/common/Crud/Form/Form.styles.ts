import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    form: {
        margin: "1rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        alignItems: "center",
        [" > button"]: {
            width: "200px"
        },
    },
    input: {
        marginRight: "2rem",
        marginBottom: "1rem",
    },
    fileInput: {
        display: "flex",
        flexDirection: "column",
        gridTemplateColumns: "1fr",
        margin: "1rem",
        justifyContent: "center",
        ["img"]: {
            width: "250px",
            height: "250px",
        }
    },
    textarea: {
        gridColumn: "span 4"
    },
    long: {
        gridColumn: "span 2"
    },
    checkbox: {
        position: "relative",
        top: "15px"
    }
    

}));