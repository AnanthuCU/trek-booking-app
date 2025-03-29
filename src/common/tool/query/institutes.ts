import { gql } from "@apollo/client";

export const INSTITUTES_QUERY = gql`
  query GetAllInstitutesDetails(
    $page: Int!
    $getAllInstitutesDetailsId: [String]
    $stateId: String!
    $universityId: [String]
    $instituteTypeId: [String]
    $itemsPerPage: Int
    $degreeTypeId: String!
  ) {
    getAllInstitutesDetails(
      page: $page
      id: $getAllInstitutesDetailsId
      stateId: $stateId
      universityId: $universityId
      instituteTypeId: $instituteTypeId
      itemsPerPage: $itemsPerPage
      degreeTypeId: $degreeTypeId
    ) {
      error
      totalPages
      totalRecordsInTable
      success
      status
      message
      itemsPerPage
      itemsInCurrentPage
      institutesDetails {
        Authority {
          id
          name
          short_name
        }
        id
        name
        short_name
        official_link
        DegreeType {
          id
          name
          short_name
        }
        InstituteType {
          id
          name
          short_name
        }
        State {
          id
          name
          short_name
        }
        University {
          id
          name
          short_name
        }
        beds
        bond_penalty
        brochure_link
        counselling_board_link
      }
      currentPage
    }
  }
`;

export const INSTITUTES_DROPDOWN_QUERY = gql`
  query GetDropDownDetailsForInstitutes(
    $stateId: String!
    $degreeTypeId: String!
  ) {
    getDropDownDetailsForInstitutes(
      stateId: $stateId
      degreeTypeId: $degreeTypeId
    ) {
      columns {
        InstituteTypes {
          id
          name
        }
        Institutes {
          id
          name
        }
        Universities {
          id
          name
        }
      }
      error
      message
      status
      success
    }
  }
`;
