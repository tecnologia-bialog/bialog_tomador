import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import get from 'lodash/get';

const useStyles = makeStyles({
  table: {
    width: 400
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0),
  createData("Ghemur", 213, 21),
  createData("Totemor", 21, 2.0),
];

export default function index(props) {

  const classes = useStyles();
  const title = get(props, "title", "Últimas propostas recebidas")

  return (
    <TableContainer style={{ minWidth: 400 }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "#7F7F7F", fontWeight: 500 }}>
              {title}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell
                style={{ color: "#7F7F7F", fontWeight: 500 }}
                component="th"
                scope="row"
              >
                <span>Motorista</span>
                <br />
                {row.name}
              </TableCell>
              <TableCell
                style={{ color: "#7F7F7F", fontWeight: 500 }}
                component="th"
                scope="row"
              >
                <span>Oferta</span>
                <br />#{row.calories}
              </TableCell>
              <TableCell
                style={{ color: "#7F7F7F", fontWeight: 500 }}
                component="th"
                scope="row"
              >
                <span>Valor</span>
                <br />
                {row.fat}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
