import { gql } from "@apollo/client";

export const STATES_QUERY = gql`
  query GetAllStates {
    getAllStates {
      error
      message
      states {
        id
        name
        short_name
      }
      status
      success
    }
  }
`;

export const COUNSELLING_TYPE_QUERY = gql`
  query GetCounsellingTypes {
    getCounsellingTypes {
      message
      status
      data {
        createdAt
        id
        name
        short_name
        updatedAt
      }
    }
  }
`;

export const DEGREE_TYPE_QUERY = gql`
  query GetDegreeTypes {
    getDegreeTypes {
      data {
        id
        name
        short_name
      }
      message
      status
    }
  }
`;

export const DROPDOWN_QUERY = gql`
  query GetDropDownDetailsForRank(
    $stateId: [String!]!
    $degreeTypeId: String!
    $counsellingTypeId: String!
  ) {
    getDropDownDetailsForRank(
      stateId: $stateId
      degreeTypeId: $degreeTypeId
      counsellingTypeId: $counsellingTypeId
    ) {
      columns {
        categories {
          name
          id
        }
        courseTypes {
          id
          name
        }
        courses {
          id
          name
        }
        degrees {
          id
          name
        }
        instituteTypes {
          id
          name
        }
        institutes {
          id
          name
        }
        quotas {
          id
          name
        }
        rankYearAndRound {
          rounds
          year
        }
      }
      error
      message
      status
      success
    }
  }
`;

export const CLOSING_RANK_QUERY = gql`
  query GetAllRankDetails(
    $degreeTypeId: String!
    $page: Int!
    $stateId: [String!]!
    $courseId: [String]
    $courseTypeId: [String]
    $degreeId: [String]
    $categoryId: [String]
    $instituteId: [String]
    $instituteTypeId: [String]
    $quotaId: [String]
    $yearRound: [YearRoundInput]
    $itemsPerPage: Int
    $counsellingTypeId: String!
  ) {
    getAllRankDetails(
      degreeTypeId: $degreeTypeId
      page: $page
      stateId: $stateId
      courseId: $courseId
      courseTypeId: $courseTypeId
      degreeId: $degreeId
      categoryId: $categoryId
      instituteId: $instituteId
      instituteTypeId: $instituteTypeId
      quotaId: $quotaId
      yearRound: $yearRound
      itemsPerPage: $itemsPerPage
      counsellingTypeId: $counsellingTypeId
    ) {
      currentPage
      error
      itemsInCurrentPage
      itemsPerPage
      message
      status
      success
      totalItems
      totalPages
      totalRecordsInTable
      rankData {
        institute_details {
          name
        }
        rank_details {
          round
          rank
          year
          id
        }
        quota_details {
          id
          name
        }
        category_details {
          id
          name
        }
        course_details {
          id
          name
        }
        coursetype_details {
          name
          id
        }
        degree_details {
          id
          name
        }
        degreetype_details {
          id
          name
        }
        institutetype_details {
          name
          id
        }
      }
    }
  }
`;

export type BasicResponse = {
  id: string;
  name: string;
};

export type RankDetail = {
  round: number;
  rank: number;
  year: number;
  id: string;
};

export type RankData = {
  institute_details: {
    name: string;
  };
  rank_details: RankDetail[];
  quota_details: BasicResponse;
  category_details: BasicResponse;
  course_details: BasicResponse;
  coursetype_details: BasicResponse;
  degree_details: BasicResponse;
  degreetype_details: BasicResponse;
  institutetype_details: BasicResponse;
};

export type ClosingRank = {
  getAllRankDetails: {
    currentPage: number;
    error: string;
    itemsInCurrentPage: number;
    itemsPerPage: number;
    message: string;
    status: string;
    success: string;
    totalItems: number;
    totalPages: number;
    totalRecordsInTable: number;
    rankData: RankData[];
  };
};

export type FormattedData = {
  name: string | null;
  category: string | null;
  quota: string | null;
  institute_type: string | null;
  degree: string | null;
  course: string | null;
  rank: number;
};

export const CLOSING_RANK_ANALYSIS_QUERY = gql`
  query GetAllRankDetails(
    $degreeTypeId: String!
    $page: Int!
    $stateId: [String!]!
    $courseId: [String]
    $courseTypeId: [String]
    $degreeId: [String]
    $categoryId: [String]
    $instituteId: [String]
    $instituteTypeId: [String]
    $quotaId: [String]
    $yearRound: [YearRoundInput]
    $itemsPerPage: Int
    $counsellingTypeId: String!
  ) {
    getAllRankDetails(
      degreeTypeId: $degreeTypeId
      page: $page
      stateId: $stateId
      courseId: $courseId
      courseTypeId: $courseTypeId
      degreeId: $degreeId
      categoryId: $categoryId
      instituteId: $instituteId
      instituteTypeId: $instituteTypeId
      quotaId: $quotaId
      yearRound: $yearRound
      itemsPerPage: $itemsPerPage
      counsellingTypeId: $counsellingTypeId
    ) {
      error
      itemsInCurrentPage
      message
      status
      success
      totalItems
      rankData {
        institute_details {
          name
        }
        max_rank_by_year {
          maxRank
          year
        }
      }
    }
  }
`;
