//  This file was automatically generated and should not be edited.
/* tslint:disable */

export interface LoginMutationVariables {
  usernameOrEmail: string;
  password: string;
}

export interface LoginMutation {
  login: {
    id: string | null,
    username: string | null,
    token: string | null,
  } | null;
}

export interface RegisterMutationVariables {
  username: string;
  email: string;
  password: string;
}

export interface RegisterMutation {
  register: {
    id: string | null,
    username: string | null,
    token: string | null,
  } | null;
}

export interface UsersQuery {
  users: Array< {
    id: string | null,
    username: string | null,
  } > | null;
}
/* tslint:enable */
