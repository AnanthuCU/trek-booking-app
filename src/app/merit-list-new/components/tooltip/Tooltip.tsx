import React from 'react'
import UserSvg from '../SvgComponents/UserSvg';
import styles from "./tooltip.module.css"
import UpSvg from '@/utils/svgs/merit-list-new/UpSvg';
import DownSvg from '@/utils/svgs/merit-list-new/DownSvg';

const Tooltip = ({ chartInfo }: any) => {
    // console.log(chartInfo, "chartinfo---------------------")
    return (
        <div className={styles.tooltipMainContainer}>
            <div className={styles.marksContainer}>
                <UserSvg />{chartInfo.value}
            </div>
            <div className={`${styles.incrementContainer} ${chartInfo.diff > 0 ? styles.positive : styles.negative}`}>
                {
                    chartInfo.diff && chartInfo.comparison && (
                        <div>
                            {chartInfo.diff > 0 ? `+${chartInfo.diff}` : chartInfo.diff}
                            {chartInfo.comparison && <span>{` (${chartInfo.comparison}%)`}</span>}
                            {chartInfo.diff > 0 ? <UpSvg /> : <DownSvg />}
                        </div>
                    )
                }

            </div>
            <div className={styles.labelContainer}>
                {chartInfo.label2?"Mark :":""} {chartInfo.label2? chartInfo.label2 : chartInfo.clause ? chartInfo.clause:chartInfo.category? chartInfo.category:""}
            </div>
            <div className={styles.yearContainer}>
                year: {chartInfo.year}
            </div>
        </div>
    )
}

export default Tooltip