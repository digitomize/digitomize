export const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const USER_ROLE = {
  USER: 1,
  ADMIN: 5,
};

export const COMMUNITY_ROLE = {
  COMMUNITY_MEMBER: 2,
  COMMUNITY_ADMIN: 3,
};

export const ROLE = {
  ...USER_ROLE,
  ...COMMUNITY_ROLE,
  CONTRIBUTOR: 4,
};
