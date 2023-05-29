const accountShare = process.env.ACCOUNT_SHARE;
// if (!accountShare) {
//     throw new Error('ACCOUNT_SHARE environment variable is not set');
// }
const accountView = process.env.ACCOUNT_VIEW;
// if (!accountView) {
//     throw new Error('ACCOUNT_VIEW environment variable is not set');
// }

export const config = {
  appName: 'account-share',
  region: 'us-east-1',
  accountShare: accountShare,
  accountView: accountView,
};