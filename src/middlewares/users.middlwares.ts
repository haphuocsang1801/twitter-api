import { USERS_MESSAGES } from '@/constants/messages'
import userService from '@/services/users.services'
import { validate } from '@/utils/validation'
import { checkSchema } from 'express-validator'
export const loginValidator = validate(
  checkSchema({
    email: {
      isEmail: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_VALID
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const user = await userService.getUserByEmail(value)
          if (user === null) {
            throw new Error(USERS_MESSAGES.USER_NOT_FOUND)
          }
          req.user = user
          return true
        }
      }
    },
    password: {
      isString: {
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRING
      },
      notEmpty: {
        errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
      },
      isLength: {
        options: {
          min: 6,
          max: 50
        },
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_BETWEEN_6_AND_50_CHARACTERS
      }
    }
  })
)
export const registerValidator = validate(
  checkSchema({
    name: {
      isString: {
        errorMessage: USERS_MESSAGES.NAME_MUST_BE_STRING
      },
      isLength: {
        options: {
          min: 1,
          max: 100
        },
        errorMessage: USERS_MESSAGES.NAME_MUST_BE_BETWEEN_1_AND_100_CHARACTERS
      },
      notEmpty: {
        errorMessage: USERS_MESSAGES.NAME_IS_NOT_EMPTY
      },
      trim: true
    },
    email: {
      isEmail: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_VALID
      },
      trim: true,
      notEmpty: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
      },
      custom: {
        options: async (value) => {
          const user = await userService.checkEmailExists(value)
          if (user) {
            throw new Error('Email already exists')
          } else {
            return true
          }
        }
      }
    },
    password: {
      isString: {
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRING
      },
      notEmpty: {
        errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
      },
      isLength: {
        options: {
          min: 6,
          max: 50
        },
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_BETWEEN_6_AND_50_CHARACTERS
      }
    },
    confirm_password: {
      isString: {
        errorMessage: USERS_MESSAGES.PASSWORD_CONFIRM_MUST_BE_STRING
      },
      notEmpty: {
        errorMessage: USERS_MESSAGES.PASSWORD_CONFIRM_IS_REQUIRED
      },
      isLength: {
        options: {
          min: 6,
          max: 50
        },
        errorMessage: USERS_MESSAGES.PASSWORD_CONFIRM_MUST_BE_BETWEEN_6_AND_50_CHARACTERS
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Confirm password does not match')
          } else {
            return true
          }
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_IS_ISO_8601,
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
