import React, { useState } from "react";
import { Typography, Select, FormControl, MenuItem } from "@material-ui/core";

export default function DashSelect() {
    const [age, setAge] = useState(7);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const personalize = (event) => {
        console.log("Abre modal de personalizar");
    };

    return (
        <FormControl>
            <Select
                style={{
                    width: 150,
                    borderRadius:'10%',
                    textAlign: "center",
                    backgroundColor: "#fdf2d9",
                    color: "#aa834a",
                    opacity: '0.9'
                }}
                disableUnderline
                value={age}
                onChange={handleChange}
            >
                <Typography
                    style={{ borderBottom: "1px solid #ededed", marginBottom: 5 }}
                    align="center"
                >
                    Filtre o período
                </Typography>
                <MenuItem value={7}>Últimos 7 dias</MenuItem>
                <MenuItem value={15}>Últimos 15 dias</MenuItem>
                <MenuItem value={30}>Últimos 30 dias</MenuItem>
                <MenuItem value={60}>Últimos 60 dias</MenuItem>
                <MenuItem disabled onClick={personalize}>
                    Personalizar
                </MenuItem>
            </Select>
        </FormControl>
    );
}
