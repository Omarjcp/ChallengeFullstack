import { ButtomModalFile } from "../ButtonModalFile";
import { InputSearch } from "./search";

import "./index.scss";
import { OwnerPage } from "./ownerPage";
import { SelectHeader } from "./select";
import { useLocation } from "react-router-dom";

export const HeaderNav = ({
  setToggleLoading,
  documents,
  setImagesUploaded,
  setDocuments,
}) => {
  const location = useLocation();
  return (
    <div className="containerHearder">
      <OwnerPage />
      <br />
      {location.pathname === "/" ? (
        <InputSearch
          documents={documents}
          setImagesUploaded={setImagesUploaded}
          setToggleLoading={setToggleLoading}
        />
      ) : (
        <></>
      )}
      <br />
      <SelectHeader
        setToggleLoading={setToggleLoading}
        setDocuments={setDocuments}
        setImagesUploaded={setImagesUploaded}
      />
    </div>
  );
};
