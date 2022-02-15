import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { TableRow, Grid, Button, Hidden, Paper, Typography, Toolbar, TableSortLabel, Table, TableBody, TableCell, TableContainer, TableHead } from "@material-ui/core";

import FilterDrawer from "../FilterDrawer";
import EclipseLine from "../Vectors/EclipseLine";
import SimpleSelect from "../../components/SimpleSelect";

import MenuWithTitle from "../MenuWithTitle";


function createData(numero, trajeto, carga, datas, actions) {
  return { numero, trajeto, carga, datas, actions };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "numero",
    label: "Número"
  },
  { id: "trajeto", label: "Trajeto" },
  { id: "carga", label: "Carga" },
  { id: "datas", label: "Datas" },
  { id: "actions", label: "-" }
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className={classes.labelHeader}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};


const EnhancedTableToolbar = ({ isMobil, title }) => {
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight:
      theme.palette.type === "light"
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
    title: {
      flex: !isMobil ? '0 1 100%' : '0 1 auto',
      fontWeight: theme.typography.fontWeightLight
    },
    textButton: {
      fontWeight: 500,
      fontStyle: 'normal',
      color: '#DF8C0F',
      fontSize: theme.typography.h6
    }
  }));

  const classes = useToolbarStyles();

  return (
    <Toolbar>
      <Typography
        className={classes.title}
        id="tableTitle"
        component="div"
      >
        {title || "Viagens"}
      </Typography>

      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item>
          <SimpleSelect />
        </Grid>
        <Grid item>
          <FilterDrawer />
        </Grid>

        <Grid item>
          <Button
            className={classes.textButton}
          >
            Viagens
          </Button>
        </Grid>
      </Grid>


    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 400
  },
  labelHeader: {
    color: '#949494',
    fontWeight: theme.typography.fontWeightLight
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

export default function FilterDataList({ isMobil, title }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{ borderRadius: 15 }}>

        <EnhancedTableToolbar numSelected={selected.length} isMobil={isMobil} title={title} />

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.numero)}
                      tabIndex={-1}
                      key={row.numero}
                    >
                      <TableCell>
                        <Grid container direction="column" justifyContent="center">
                          <Typography variant="body2">#{row.numero}</Typography>
                          <Typography style={{ color: '#2A8851' }} variant="overline">Em trânsito</Typography>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Grid container alignItems="center">
                          <Hidden smDown>
                            <Grid item>
                              <EclipseLine />
                            </Grid>
                          </Hidden>
                          <Grid item>
                            <Grid container direction="column">
                              <Typography classes={classes.tdText} style={{ marginBottom: '16px' }} variant="body2">São Paulo, SP</Typography>
                              <Typography classes={classes.tdText} variant="body2">Florianópolis, SC</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Grid container direction="column">
                          <Typography className={classes.tdText} variant="body2">Peso: {row.carga}kg</Typography>
                          <Typography className={classes.tdText} variant="body2">342 KM</Typography>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Grid container direction="column">
                          <Typography className={classes.tdText} variant="body2">Coletado: 04/03/2021</Typography>
                          <Typography className={classes.tdText} variant="body2">Entrega: 06/03/2021</Typography>
                        </Grid>
                      </TableCell>
                      <TableCell> <MenuWithTitle /> </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    </div>
  );
}
