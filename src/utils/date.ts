import zeroFill from "zero-fill";

export const getNowDateWithOffset = (
  offset: number = 0,
  name: string = "GMT"
): string => {
  const roundOffset = Math.round(offset * 10) / 10;
  var fakeUTC = new Date(
    Date.now() - (roundOffset * 60 - new Date().getTimezoneOffset()) * 60000
  );
  var year = fakeUTC.getFullYear();
  var month = fakeUTC.getMonth();
  var date = fakeUTC.getDate();
  var time = fakeUTC.toString().split(" ")[4];
  return `${year}-${zeroFill(2, month)}-${zeroFill(
    2,
    date
  )} ${time} ${name} (GMT${roundOffset >= 0 ? "-" : "+"}${zeroFill(
    2,
    Math.abs(roundOffset)
  )}h)`;
};

export const getNowJSTDate = (): string => {
  return getNowDateWithOffset(-9, "JST");
};
