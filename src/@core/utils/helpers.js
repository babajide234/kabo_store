


function RoleGetter({ user }) {
  const { role } = user;

  // Check if the user has the superAdmin role
  if (role.superAdmin === "Yes") {
    return 'superadmin'
  }

  // Check if the user has the admin role
  if (role.admin === "Yes") {
    return 'admin';
  }

  // Check if the user has the rider role
  if (role.rider === "Yes") {
    return 'rider';
  }



}

export default RoleGetter;
