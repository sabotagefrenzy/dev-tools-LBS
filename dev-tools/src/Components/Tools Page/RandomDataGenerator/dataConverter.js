export function js2csv(data) {
    const replacer = (_, value) => (value === null ? "" : value);
    const header = Object.keys(data[0]);
    const csv = [
      header.join(","),
      ...data.map((row) =>
        header.map((field) => JSON.stringify(row[field], replacer)).join(",")
      ),
    ].join("\r\n");
    return csv;
  }
  
  export function js2tsv(data) {
    const replacer = (_, value) => (value === null ? "" : value);
    const header = Object.keys(data[0]);
    const tsv = [
      header.join("\t"),
      ...data.map((row) =>
        header.map((field) => JSON.stringify(row[field], replacer)).join("\t")
      ),
    ].join("\r\n");
    return tsv;
  }
  