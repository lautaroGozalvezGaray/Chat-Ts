export default (data: string) =>
  data.toString().replace(/\s+/g, "").toLowerCase();
