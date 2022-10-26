export default (usernames: string[]) => {
  const counter: any = {};
  return usernames.map((name: string): string => {
    if (!counter[name]) {
      counter[name] = 0;
    }
    counter[name]++;
    return counter[name] > 1 ? `${name}${counter[name]}` : name;
  });
};
