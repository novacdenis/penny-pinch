import dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";

export const timeConfig = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  dayjs.extend(customParseFormat);
};

export const timeFormats = {
  dateMDY: "MM/DD/YYYY",
};
