import * as customParseFormat from "dayjs/plugin/customParseFormat";

export function register() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  dayjs.extend(customParseFormat);
}
