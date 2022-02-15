import React, { useState } from "react";
import { MenuItem, Select, FormControl } from "@material-ui/core";

export default function SimpleSelect() {
    const [age, setAge] = useState(7);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <FormControl>
            <Select
                style={{
                    minWidth: 150,
                    textAlign: "center",
                    color: "#7F7F7F",
                    borderRadius: "5%",
                }}
                value={age}
                onChange={handleChange}
            >
                <MenuItem value={7}>Todos</MenuItem>
                <MenuItem value={15}>Em andamento</MenuItem>
                <MenuItem value={30}>Sem Propostas</MenuItem>
                <MenuItem value={60}>Em triagem</MenuItem>
                <MenuItem value={80}>Canceladas</MenuItem>
                <MenuItem value={90}>Finalizadas</MenuItem>
            </Select>
        </FormControl>
    );
}
