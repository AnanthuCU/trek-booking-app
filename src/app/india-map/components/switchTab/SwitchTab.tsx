import React from "react";
import styles from "./SwitchTab.module.css";

type Props = {
  setDistributionFilterSelect: React.Dispatch<React.SetStateAction<string>>;
  distributionFilterSelect: string;
};

const SwitchTab = ({
  setDistributionFilterSelect,
  distributionFilterSelect,
}: Props) => {
  const distributions = [
    {
      name: "Seat Wise",
      value: "Seats",
    },
    {
      name: "College Wise",
      value: "Colleges",
    },
  ];

  const handleTabClick = (value: string) => {
    setDistributionFilterSelect(value);
  };

  return (
    <div className={styles.container}>
      {distributions.map((distribution, index) => {
        return (
          <p
            className={
              distribution.value === distributionFilterSelect
                ? `${styles.tab} ${styles.tabActive}`
                : `${styles.tab}`
            }
            key={index}
            onClick={() => handleTabClick(distribution.value)}
          >
            {distribution.name}
          </p>
        );
      })}
    </div>
  );
};

export default SwitchTab;
