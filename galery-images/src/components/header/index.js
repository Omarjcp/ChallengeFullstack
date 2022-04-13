import { ButtomModalFile } from "../ButtonModalFile";
import { InputSearch } from "./search";

import "./index.scss";
import { OwnerPage } from "./ownerPage";
import { SelectHeader } from "./select";
import { useLocation } from "react-router-dom";

export const HeaderNav = ({ setToggleLoading }) => {
  const location = useLocation();

  return (
    <div className="containerHearder">
      <OwnerPage />
      <br />
      {location.pathname === "/" ? (
        <InputSearch setToggleLoading={setToggleLoading} />
      ) : (
        <></>
      )}
      <br />
      <SelectHeader />
    </div>
  );
};
