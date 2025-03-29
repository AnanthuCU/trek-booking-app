export type Distributions = "Seats" | "Colleges";
export type CounsellingType = "State" | "MCC" | "All";
export type MapView = "dashboard" | "table";

export type InstituteData = {
  State: string;
  "Institute Name": string;
  "Institute Type": string;
  "Institute Type Division": string;
  Seats: number;
  Year: number;
};

export type RawInstituteData = {
  Course: string;
  StateName: string;
  InstituteName: string;
  InstituteType: string;
  InstituteTypeDivision: string;
  MCC: string;
  State: string;
  Total: string;
  Year: string;
  Website: string;
  DegreeType: string;
};

export type StateSummary = {
  State: string;
  Seats: number;
  Colleges: number;
};

export type InstituteSummary = {
  InstituteType: string;
  Seats: number;
  Colleges: number;
};

export type StateData = {
  State: string;
  Seats: number;
  Colleges: number;
  difference: {
    Seats: number;
    Colleges: number;
  };
};

export type CollegeData = {
  State: string;
  Seats: number;
  InstituteType: string;
  difference: {
    Seats: number;
    Colleges: number;
  };
};

export type YearData = {
  [year: number]: StateData[];
};

export type View = "Absolute View" | "Difference View";
export type Mark = "Location View" | "Density View";

export type CollegeMetaData = {
  name: string;
  instituteType: string;
  state: string;
  coordinates: {
    x: number;
    y: number;
  };
};
