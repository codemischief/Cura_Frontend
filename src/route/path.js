function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = { root: "/dashboard", admin: "admin" };

export const PATH_DASHBOARD = {
  root: ROOTS.root,
  admin: {
    root: ROOTS.admin,
    manageUsers: path(ROOTS.admin, "/app"),
    manageemployees: path(ROOTS.admin, "/manageemployees"),
    analytics: path(ROOTS.admin, "/managebuilder"),
    banking: path(ROOTS.admin, "/manageprojectinfo"),
    booking: path(ROOTS.admin, "/booking"),
  },
};
