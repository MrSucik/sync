import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import superagent from "superagent";
import { RootState } from "../../store";

const endpoints = {
  "bakalari-suplovani":
    "https://europe-west3-wigymtv.cloudfunctions.net/availableBakaSuplDates",
  "bakalari-plan-akci":
    "https://europe-west3-wigymtv.cloudfunctions.net/availableBakaPlanDates",
};

export const useAvailableDates = () => {
  const type = useSelector<
    RootState,
    "bakalari-suplovani" | "bakalari-plan-akci" | null
  >((state) => state.app.configureMediaModalOpen);
  const [dates, setDates] = useState<string[]>([]);
  useEffect(() => {
    if (type) {
      superagent
        .get(endpoints[type])
        .then((response) => setDates(response.body));
    }
  }, [type]);
  return dates;
};
