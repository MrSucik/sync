import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import superagent from "superagent";
import { RootState } from "../../store";
import { ConfigureMediaModalState } from "../../store/slices/media";

const endpoints = {
  "bakalari-suplovani":
    "https://europe-west3-wigymtv.cloudfunctions.net/availableBakaSuplDates",
  "bakalari-plan-akci":
    "https://europe-west3-wigymtv.cloudfunctions.net/availableBakaPlanDates",
};

export const useAvailableDates = () => {
  const type = useSelector<RootState, ConfigureMediaModalState>(
    (state) => state.media.configureMediaModalState
  );
  const [dates, setDates] = useState<string[]>([]);
  useEffect(() => {
    if (type !== "closed") {
      superagent
        .get(endpoints[type])
        .then((response) => setDates(response.body));
    }
  }, [type]);
  return dates;
};
