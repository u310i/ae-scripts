import "extendscript-es5-shim-ts";
import { funcA } from "./utils";

const func = (str: String): void => {
  const arr = ["foo", "bar"];
  arr.forEach(i => {
    alert(i);
  });
  // const obj = {
  //   foo: "foo",
  //   bar: "bar"
  // };
  // const { foo, ...bbb } = obj;
  // alert(foo);
  alert(str + ": You just sent an alert to After Effects");
};

func(funcA());
