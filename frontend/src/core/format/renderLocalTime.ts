import dayjs from "dayjs";
import { LOCAL_TIME_FORMAT } from "../../dataProvider/graphqlDataProvider";

export function renderLocalTime(localTime: string) {
  return localTime == null || localTime === ""
    ? ""
    : dayjs(localTime, LOCAL_TIME_FORMAT).format("LT");
}
