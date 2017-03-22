//  This file was automatically generated and should not be edited.
/* tslint:disable */

export interface RegisterMutationVariables {
  username: string;
  email: string;
  password: string;
}

export interface RegisterMutation {
  register: string | null;
}

export interface UsersQuery {
  users: Array< {
    id: string | null,
    username: string | null,
  } > | null;
}
/* tslint:enable */
