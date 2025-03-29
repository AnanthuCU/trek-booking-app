import { gql } from "@apollo/client";

export const kycBycDropDownQuery = gql`
  query GetDropDownDetailsForKycInstitutes(
    $stateId: String!
    $degreeTypeId: String!
    $courseId: [String]
    $instituteId: [String]
  ) {
    getDropDownDetailsForKycInstitutes(
      stateId: $stateId
      degreeTypeId: $degreeTypeId
      courseId: $courseId
      instituteId: $instituteId
    ) {
      status
      success
      message
      error
      kycValues {
        courses {
          id
          name
        }
        institutes {
          id
          name
        }
      }
    }
  }
`;

export const kycBycTableQuery = gql`
  query GetKycInstitutesDetails(
    $degreeTypeId: String!
    $stateId: String!
    $orderBy: String!
    $page: Int!
    $itemsPerPage: Int
    $instituteId: [String]
    $courseId: [String]
  ) {
    getKycInstitutesDetails(
      degreeTypeId: $degreeTypeId
      stateId: $stateId
      orderBy: $orderBy
      page: $page
      itemsPerPage: $itemsPerPage
      instituteId: $instituteId
      courseId: $courseId
    ) {
      success
      status
      message
      error
      currentPage
      itemsPerPage
      totalItems
      totalPages
      itemsInCurrentPage
      kycInstitutesDetails {
        institute_id
        institute
        course_id
        course
      }
    }
  }
`;

export const sendKycEmail = gql`
  query SendEmailKycByc(
    $college: String!
    $course: String!
    $description: String
  ) {
    sendEmailKycByc(
      college: $college
      course: $course
      description: $description
    ) {
      status
      message
      error
    }
  }
`;
