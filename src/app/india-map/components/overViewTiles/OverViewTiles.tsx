import React from "react";
import styles from "./OverViewTiles.module.css";

type TileContent = {
  title: string;
  subtitle: string;
};

type Props = {
  tileContent: TileContent[];
};

const OverViewTiles = ({ tileContent }: Props) => {
  return (
    <div className={styles.container}>
      {tileContent.map((tile, index: number) => {
        return (
          <div className={styles.tile} key={index}>
            <p className={styles.tileTitle}>{tile.title}</p>
            <p className={styles.tileSubTitle}>{tile.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OverViewTiles;
