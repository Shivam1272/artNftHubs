import { Triangle } from "react-loader-spinner";
import Style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={Style.Loader}>
      <Triangle
        color="purple"
        height="200"
        width="200"
        raduis="50"
        visible={true}
        ariaLabel="Loader"
      />
    </div>
  );
};

export default Loader;
