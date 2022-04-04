export const getData = async (appFirebase, setData, setImagesUpdateded) => {
  const documentsList = await appFirebase
    .firestore()
    .collection("archivos")
    .get();
  setData(documentsList.docs.map((doc) => doc.data()));
  setImagesUpdateded(documentsList.docs.map((doc) => doc.data()));
};
