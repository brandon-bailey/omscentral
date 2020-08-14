export interface TestUser {
  email: string;
  password: string;
}

export const user: TestUser = {
  email: 'user@omscentral.com',
  password: '12341234',
};

export const generateTestUser = (): TestUser => ({
  email: `test-${+new Date()}@omscentral.com`,
  password: '12341234',
});
