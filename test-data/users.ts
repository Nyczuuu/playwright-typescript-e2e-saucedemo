export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    firstName: 'Jan',
    lastName: 'Kowalski',
    postalCode: '00-123'
  },

  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
    firstName: 'Anna',
    lastName: 'Nowak',
    postalCode: '12-345'
  },

  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  }
} as const;

export type User = typeof users.standard;