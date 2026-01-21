export const ERROR_CODES = {
  //  AUTH

  AUTH_RESET_USER_NOT_FOUND: {
    key: "AUTH_RESET_USER_NOT_FOUND",
    code: "AUTH_1001",
  },
  AUTH_RESET_INVALID_PASSWORD: {
    key: "AUTH_RESET_INVALID_PASSWORD",
    code: "AUTH_1002",
  },

  AUTH_CREATE_PHONE_REQUIRED: {
    key: "AUTH_CREATE_PHONE_REQUIRED",
    code: "AUTH_1003",
  },
  AUTH_CREATE_USER_EXISTS: {
    key: "AUTH_CREATE_USER_EXISTS",
    code: "AUTH_1004",
  },
  AUTH_LOGIN_INVALID_ROLE: {
    key: "AUTH_LOGIN_INVALID_ROLE",
    code: "AUTH_1005",
  },
  AUTH_LOGIN_INVALID_CREDENTIALS: {
    key: "AUTH_LOGIN_INVALID_CREDENTIALS",
    code: "AUTH_1006",
  },
  AUTH_LOGIN_FAILED: {
    key: "AUTH_LOGIN_FAILED",
    code: "AUTH_1007",
  },
  AUTH_LOGOUT_FAILED: {
    key: "AUTH_LOGOUT_FAILED",
    code: "AUTH_1008",
  },
  AUTH_UNAUTHORIZED: {
    key: "AUTH_UNAUTHORIZED",
    code: "AUTH_1009",
  },
  AUTH_REST_FAILED: {
    key: "AUTH_REST_FAILED",
    code: "AUTH_1010",
  },
  //  EXERCISES
  EX_GET_NOT_FOUND: {
    key: "EX_GET_NOT_FOUND",
    code: "EX_2001",
  },

  EX_CREATE_INVALID_VALUES: {
    key: "EX_CREATE_INVALID_VALUES",
    code: "EX_2002",
  },

  EX_UPDATE_INVALID_VALUES: {
    key: "EX_UPDATE_INVALID_VALUES",
    code: "EX_2003",
  },
  EX_UPDATE_NOT_FOUND: {
    key: "EX_UPDATE_NOT_FOUND",
    code: "EX_2004",
  },
  EX_UPDATE_FORBIDDEN: {
    key: "EX_UPDATE_FORBIDDEN",
    code: "EX_2005",
  },

  EX_DELETE_ID_REQUIRED: {
    key: "EX_DELETE_ID_REQUIRED",
    code: "EX_2006",
  },
  EX_DELETE_NOT_FOUND: {
    key: "EX_DELETE_NOT_FOUND",
    code: "EX_2007",
  },
  EX_DELETE_FORBIDDEN: {
    key: "EX_DELETE_FORBIDDEN",
    code: "EX_2008",
  },
  EX_LOAD_FAILED: {
    key: "EX_LOAD_FAILED",
    code: "EX_2009",
  },
  //  PATIENTS
  PT_GET_NOT_FOUND: {
    key: "PT_GET_NOT_FOUND",
    code: "PT_3001",
  },
  PT_SPECIALIST_NOT_FOUND: {
    key: "PT_SPECIALIST_NOT_FOUND",
    code: "PT_3002",
  },

  PT_EXERCISE_NOT_ASSIGNED: {
    key: "PT_EXERCISE_NOT_ASSIGNED",
    code: "PT_3003",
  },
  PT_EXERCISE_NOT_FOUND: {
    key: "PT_EXERCISE_NOT_FOUND",
    code: "PT_3004",
  },

  PT_DELETE_ID_REQUIRED: {
    key: "PT_DELETE_ID_REQUIRED",
    code: "PT_3005",
  },
  PT_DELETE_NOT_FOUND: {
    key: "PT_DELETE_NOT_FOUND",
    code: "PT_3006",
  },
  PT_DELETE_FORBIDDEN: {
    key: "PT_DELETE_FORBIDDEN",
    code: "PT_3007",
  },

  PT_CREATE_USER_REQUIRED: {
    key: "PT_CREATE_USER_REQUIRED",
    code: "PT_3008",
  },

  //  ASSIGN EXERCISE
  AS_ASSIGN_MISSING_FIELDS: {
    key: "AS_ASSIGN_MISSING_FIELDS",
    code: "AS_4001",
  },
  AS_ASSIGN_ALREADY_EXISTS: {
    key: "AS_ASSIGN_ALREADY_EXISTS",
    code: "AS_4002",
  },

  //  GENERIC
  UNAUTHORIZED: {
    key: "UNAUTHORIZED",
    code: "GEN_9001",
  },
  NOT_FOUND: {
    key: "NOT_FOUND",
    code: "GEN_9002",
  },
};
