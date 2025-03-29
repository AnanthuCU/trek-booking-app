import React from "react";
import { CounsellingType, RawInstituteData } from "../../types";
import styles from "./CollegeCard.module.css";
import Image from "next/image";
import { getSeats } from "../../utils";

type Props = {
  college: RawInstituteData;
  counsellingType: CounsellingType;
  id: string;
};

const CollegeCard = ({ id, college, counsellingType }: Props) => {
  const collegeLogoFallback = "/college-compare/college.png";

  //   const collegeLogoFallback =
  //   "/college-and-seats/college_and_seat_college_logo.png";

  const getDirectionLink = (college: RawInstituteData) => {
    const encodedCollegeName = encodeURIComponent(college.InstituteName);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedCollegeName}`;
    return googleMapsUrl;
  };

  return (
    <div className={styles.container} id={id}>
      <Image width={24} height={24} src={collegeLogoFallback} alt="college" />
      <div className={styles.content}>
        <p className={styles.title}>{college.InstituteName}</p>
        <div className={styles.subtitle}>
          <p>
            <b>Seats: </b>
            {getSeats(college, counsellingType)}
          </p>
          <p>
            {" "}
            <b>Institute: </b>
            {college.InstituteType}
          </p>
        </div>
        <div className={styles.actions}>
          <a
            className={styles.actionButton}
            href={college.Website}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3.11754 3.22664C2.4255 3.94574 2 4.92318 2 6C2 8.20915 3.79086 10 6 10C6.5404 10 7.0558 9.89285 7.52605 9.6986C7.58355 9.32335 7.4574 8.9633 7.4058 8.8373C7.291 8.5575 6.91205 8.0791 6.27945 7.4154C6.1106 7.2379 6.12145 7.10175 6.1818 6.69715L6.18875 6.65145C6.22975 6.3743 6.29855 6.21045 7.2311 6.0624C7.70485 5.9873 7.82945 6.17665 8.00215 6.43885C8.02125 6.4679 8.04035 6.4964 8.0599 6.52495C8.22395 6.76485 8.3455 6.8197 8.5291 6.9032C8.61135 6.9405 8.714 6.98755 8.85155 7.0657C9.17755 7.252 9.17755 7.46235 9.17755 7.9236V7.9759C9.17755 8.1717 9.1584 8.3436 9.1283 8.49295C9.6739 7.80925 10 6.9427 10 6C10 4.35045 9.0015 2.9341 7.57595 2.32241C7.29935 2.50907 6.9199 2.77363 6.7875 2.955C6.7198 3.04769 6.6241 3.52083 6.31285 3.55988C6.2313 3.57012 6.1219 3.56295 6.006 3.55549C5.69525 3.53529 5.2701 3.50803 5.134 3.87748C5.0476 4.1116 5.0324 4.74722 5.31195 5.07715C5.3567 5.12985 5.36535 5.22735 5.33495 5.33675C5.295 5.4804 5.2143 5.5678 5.18915 5.58585C5.14095 5.55815 5.0448 5.44655 4.97969 5.3706C4.82277 5.18825 4.62702 4.96117 4.37398 4.89088C4.28197 4.86542 4.18083 4.84433 4.08274 4.82368C3.8082 4.76613 3.49721 4.70067 3.42496 4.54651C3.37221 4.4336 3.37244 4.27811 3.37264 4.11382C3.37264 3.9056 3.37264 3.67014 3.27064 3.44128C3.23123 3.35271 3.17844 3.28223 3.11754 3.22664ZM6 11C3.23857 11 1 8.7614 1 6C1 3.23857 3.23857 1 6 1C8.7614 1 11 3.23857 11 6C11 8.7614 8.7614 11 6 11Z"
                fill="#888888"
              />
            </svg>
            <p>Website</p>
          </a>
          <a
            className={styles.actionButton}
            target="_blank"
            href={getDirectionLink(college)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <g clipPath="url(#clip0_5800_51285)">
                <path
                  d="M4.50004 5.00054C4.2239 5.00054 4.00004 5.22439 4.00004 5.50054V7.50054H5.00005V6.00054H6.50005V7.25054L8.25005 5.50054L6.50005 3.75053V5.00054H4.50004ZM6.3536 0.69723L11.3034 5.64699C11.4986 5.84224 11.4986 6.15884 11.3034 6.35409L6.3536 11.3038C6.15835 11.4991 5.84175 11.4991 5.6465 11.3038L0.696742 6.35409C0.501477 6.15884 0.501477 5.84224 0.696742 5.64699L5.6465 0.69723C5.84175 0.501965 6.15835 0.501965 6.3536 0.69723Z"
                  fill="#888888"
                />
              </g>
              <defs>
                <clipPath id="clip0_5800_51285">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>Direction</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
