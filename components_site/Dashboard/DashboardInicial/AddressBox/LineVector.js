import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  line_svg: {
    transform: "rotate(90deg) translateY(-50%)",
    transformOrigin: "left top"
  }
}));
export default function LineVector() {
  const classes = useStyles();
  return (
    <div className={classes.link_container}>
      <svg
        id="line_svg"
        width="60px"
        height="60px"
        className={classes.line_svg}
      >
        <g
          xmlns="http://www.w3.org/2000/svg"
          transform="matrix(1 0 0 1 -734 -803 )"
        >
          <path
            d="M 735 805  L 878 805  "
            strokeWidth="2"
            stroke="#d7d7d7"
            fill="none"
            strokeOpacity="0.682352941176471"
          />
        </g>
      </svg>
    </div>
  );
}
