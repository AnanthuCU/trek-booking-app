import { gql } from "@apollo/client";

export const COUNSELLING_QUERY = gql`
  query GetAllCounsellingDetails(
    $page: Int!
    $itemsPerPage: Int
    $counsellingTypeId: [String]
    $stateTypeId: [String]
    $stateId: [String]
    $counselling: [String]
  ) {
    getAllCounsellingDetails(
      page: $page
      itemsPerPage: $itemsPerPage
      counsellingTypeId: $counsellingTypeId
      stateTypeId: $stateTypeId
      stateId: $stateId
      id: $counselling
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
      counsellingData {
        state_details {
          id
          name
          short_name
        }
        stateType_details {
          id
          name
          short_name
        }
        counselling_details {
          CounsellingTypeId
          StateId
          StateTypeId
          brochure_link
          id
          name
          registration_link
          short_name
          website_link
        }
        counsellingType_details {
          id
          name
          short_name
        }
      }
    }
  }
`;

export const COUNSELLING_DROPDOWN = gql`
  query GetDropDownDetailsForCounselling {
    getDropDownDetailsForCounselling {
      error
      message
      status
      success
      columns {
        states {
          id
          name
        }
        stateTypes {
          id
          name
        }
        counsellingTypes {
          id
          name
          short_name
        }
        counsellingNames {
          id
          name
        }
      }
    }
  }
`;
