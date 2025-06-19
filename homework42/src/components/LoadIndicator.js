import { BeatLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export function LoadIndicator(props) {
    return (<BeatLoader
        color="black"
        loading={props.state}
        cssOverride={override}
        size={25}
        aria-label="Loading data"
        data-testid="loader"
    />)
}