export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_STRING: 'Name must be string',
  NAME_MUST_BE_BETWEEN_1_AND_100_CHARACTERS: 'Name must be between 1 and 100 characters',
  NAME_IS_NOT_EMPTY: 'Name is not empty',

  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_VALID: 'Email is valid',

  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_STRING: 'Password must be string',
  PASSWORD_MUST_BE_BETWEEN_6_AND_50_CHARACTERS: 'Password must be between 6 and 50 characters',

  PASSWORD_CONFIRM_IS_REQUIRED: 'Password confirm is required',
  PASSWORD_CONFIRM_MUST_BE_STRING: 'Password confirm must be string',
  PASSWORD_CONFIRM_MUST_BE_BETWEEN_6_AND_50_CHARACTERS: 'Password confirm must be between 6 and 50 characters',
  DATE_OF_BIRTH_IS_ISO_8601: 'Date of birth is ISO 8601',

  USER_NOT_FOUND: 'User not found',
} as const
