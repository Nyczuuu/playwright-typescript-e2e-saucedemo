export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    role: 'standard'
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
    role: 'problem'
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    role: 'locked'
  }
} as const;

export type UserKey = keyof typeof users;