import { USER_ROLE } from "./const";

export const getUserRoleOptions = () => {
  return Object.keys(USER_ROLE).map((key) => {
    return {
      label: key.replaceAll("_", " ").toLowerCase(),
      value: USER_ROLE[key],
    };
  });
};
