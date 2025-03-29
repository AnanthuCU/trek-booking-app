import React, { useEffect, useState } from 'react';
import styles from "./religionClaimTable.module.css"
import { ReligionClaimData } from '../../types';
import CircleSvg from '@/utils/svgs/ExamPaper/CircleSvg';
import UserSvg from '@/utils/svgs/merit-list-new/UserSvg';


type Props = {
  data: ReligionClaimData[];
  colors: string[];
  activeColors: string[];
  activeRowValue: string | null;
};

const ReligionClaimTable = ({ data, colors,activeColors, activeRowValue }: Props) => {
  let total = 0;
  


  return (
    <div className={styles.mainTableContainer}>
      <table>
        <thead>
          <tr>
            <th>Seat Type</th>
            <th>Total Seats</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            total += item.value

            return (
              <tr key={key} style={activeRowValue === item.religion?{backgroundColor:`${activeColors[key % activeColors.length]}`}:{}}
              
              // className={`${activeRowValue === item.religion ? styles.activeClass : ""}`}
              
              >
                <td>
                  <CircleSvg color={colors[key % colors.length]} /> {item.religion}
                </td>
                <td>
                  <UserSvg /> {item.value}
                </td>
              </tr>
            );
          })}

          <tr className={styles.totalRow}>
            <td>Total</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ReligionClaimTable