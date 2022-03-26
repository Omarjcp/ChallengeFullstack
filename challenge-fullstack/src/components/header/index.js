import { ButtomModalFile } from "../ButtonModalFile";
import { InputSearch } from "./search";

import "./index.scss";
import { OwnerPage } from "./ownerPage";

export const HeaderNav = ({
  setToggleLoading,
  documents,
  getData,
  setImagesUploaded,
}) => {
  return (
    <div className="containerHearder">
      <OwnerPage />
      <br />
      <InputSearch
        documents={documents}
        setImagesUploaded={setImagesUploaded}
        setToggleLoading={setToggleLoading}
      />
      <br />
      <ButtomModalFile setToggleLoading={setToggleLoading} getData={getData} />
    </div>
  );
};
