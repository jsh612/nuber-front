import { gql } from "apollo-boost";

//@client
// -> https://www.apollographql.com/docs/link/links/state/#client-directive
// -> local storage에서 데이터 가져올 시 사용
// -> 위의 쿼리 설명: local저장소에서 isLoggedIn 데이터 요청

// export const IS_LOGGED_IN = gql`
//   {
//     auth {
//       isLoggedIn @client
//     }
//   }
// `;

// 위의 gql문과 동일한 작용 (그냥 쿼리에 이름만 적음)
export const IS_LOGGED_IN = gql`
  query checkLogin {
    auth @client {
      isLoggedIn
    }
  }
`;
