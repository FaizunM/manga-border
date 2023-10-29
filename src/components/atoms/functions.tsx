export const array2CSV = (
  array: string[][] | number[][] | (string | number)[][]
) => {
  let csvres = "";
  array.filter((item) => {
    let str = "";
    item.filter((item1, index1) => {
      if (typeof item1 === "string") str = str + '"';
      str = str + String(item1);
      if (typeof item1 === "string") str = str + '"';
      if (index1 !== item.length - 1) str = str + ",";
    });
    str = str + "\n";
    csvres = csvres + str;
  });

  return csvres;
};

export const setupCSV = (
  canvasName: string,
  imageSize: number[],
  array: (string | number)[][]
) => {
  const newarr: (string | number)[][] = [];
  array.forEach(
    (item, index) =>
      (newarr[index] = [
        canvasName,
        index + 1,
        array.length,
        item[0],
        item[1],
        item[2],
        item[3],
        imageSize[0],
        imageSize[1],
      ])
  );
  return newarr;
};

export const handleExport = (
  canvasName: string,
  imageSize: number[],
  array: (string | number)[][],
  filename: string
) => {
  if (!filename) {
    alert("Need filename");
    return;
  }
  const csv = array2CSV(setupCSV(canvasName, imageSize, array));
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(new Blob([csv], { type: "csv" }));
  link.download = filename;
  link.click();
};