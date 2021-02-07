import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ConfigureMediaModalState } from "../../store/slices/media";
import client from "../../utils/client";

const endpoints = {
  "bakalari-suplovani": client.bakalariSuplovaniDates,
  "bakalari-plan-akci": client.bakalariPlanAkciDates,
};

export const useAvailableDates = () => {
  const type = useSelector<RootState, ConfigureMediaModalState>(
    (state) => state.media.configureMediaModalState
  );
  const [dates, setDates] = useState<string[]>([]);
  useEffect(() => {
    if (type !== "closed") {
      endpoints[type]().then((response) => setDates(response.data));
    }
  }, [type]);
  return dates;
};
