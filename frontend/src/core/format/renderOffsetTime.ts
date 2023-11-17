import dayjs from "dayjs";
import { OFFSET_TIME_FORMAT } from "../../dataProvider/graphqlDataProvider";

export function renderOffsetTime(offsetTime: string) {
  return offsetTime == null || offsetTime === ""
    ? ""
    : dayjs(offsetTime, OFFSET_TIME_FORMAT).format("LT");
}
