const USER = {
  INDEX: '/users',
  ADD_USER: '/users/new'
};

const USER_INVITATIONS = {
  INDEX: '/user_invitation',
  EXPIRED: '/user_invitation/expired',
  INVITATION: '/user_invitation/token/:invitationId'
};

const FILES = {
  INDEX: '/files',
  UPLOAD: '/files/upload'
};

const PASSWORD = {
  INDEX: '/password',
  RESET: '/password/reset/:resetToken',
  FORGOT: '/password/forgot'
};

const ROUTES = {
  INDEX: '/',
  DASHBOARD: '/dashboard',
  ABOUT_US: '/#about',
  CONTACT_US: '/#contact',
  LOGIN: '/login',
  SERVICES: '/#services',
  PROFILE: '/profile',
  USERS: USER.INDEX,
  STUDENT_DATA: '/users/:userId/profile',
  ADD_USERS: USER.ADD_USER,
  LIST_USERS: USER.INDEX,
  USER_INVITATIONS_INDEX: USER_INVITATIONS.INDEX,
  USER_INVITATIONS: USER_INVITATIONS.INVITATION,
  INVALID_INVITATION: USER_INVITATIONS.EXPIRED,
  FILES_INDEX: FILES.INDEX,
  FILES_UPLOAD: FILES.UPLOAD,
  PASSWORD_INDEX: PASSWORD.INDEX,
  FORGOT_PASSWORD: PASSWORD.FORGOT,
  RESET_PASSWORD: PASSWORD.RESET
};

export default ROUTES;
