import React from "react";
import styles from "./OverViewCard.module.css";
import SwitchTab from "../switchTab/SwitchTab";
import OverViewTiles from "../overViewTiles/OverViewTiles";
import { InstituteSummary } from "../../types";
import { formatIndianCurrencyCommas } from "@/common/tool/formatIndianCurrencyCommas/rankPredictor/utils";
import InstituteTypeProgress from "../instituteTypeProgress/InstituteTypeProgress";

type Props = {
  setDistributionFilterSelect: React.Dispatch<React.SetStateAction<string>>;
  distributionFilterSelect: string;
  summarizedInstituteTypes: InstituteSummary[];
};

const OverViewCard = ({
  setDistributionFilterSelect,
  distributionFilterSelect,
  summarizedInstituteTypes,
}: Props) => {
  const getTileData = () => {
    let seats = 0;
    let colleges = 0;

    summarizedInstituteTypes.forEach((item) => {
      seats += item.Seats;
      colleges += item.Colleges;
    });

    return [
      { subtitle: "Seats", title: formatIndianCurrencyCommas(seats) },
      { subtitle: "Colleges", title: formatIndianCurrencyCommas(colleges) },
    ];
  };

  return (
    <div className={styles.container}>
      <SwitchTab
        distributionFilterSelect={distributionFilterSelect}
        setDistributionFilterSelect={setDistributionFilterSelect}
      />
      <OverViewTiles tileContent={getTileData()} />
      <InstituteTypeProgress
        distributionFilterSelect={distributionFilterSelect}
        summarizedInstituteTypes={summarizedInstituteTypes}
      />
    </div>
  );
};

export default OverViewCard;
