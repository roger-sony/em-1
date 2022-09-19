// function getUsers(users: User[], task: Task): User[] {
//   if (task.assignedToUser && task.assignedToUser.length > 0) {
//     return task.assignedToUser.map(userId => users.find(user => user.id === userId)).filter(user => user);
//   } else {
//     return [];
//   }
// }

// function getRoles(roles: Role[], task: Task): Role[] {
//   if (task.assignedTo && task.assignedTo.length > 0) {
//     return task.assignedTo.map(roleId => roles.find(role => role.id === roleId)).filter(role => role);
//   } else {
//     return [];
//   }
// }

// function getSubtaskString(subtasks: Subtask[]): string {
//   if (subtasks.length > 0) {
//     return subtasks.map(subtask => subtask.configName).join(', ');
//   } else {
//     return '(None)';
//   }
// }

// function getUsersString(users: User[]): string {
//   if (users.length > 0) {
//     return users.map(user => user.userName).join(', ');
//   } else {
//     return '(None)';
//   }
// }

// function getRolesString(roles: Role[]): string {
//   if (roles.length > 0) {
//     return roles.map(role => role.displayName).join(', ');
//   } else {
//     return '(None)';
//   }
// }

// export function addUsersAndRolesToTask(tasks: Task[], users: User[], roles: Role[]): TaskFull[] {
//   return tasks.map(task => {
//     const taskUsers: User[] = getUsers(users, task);
//     const taskRoles: Role[] = getRoles(roles, task);
//     return {
//       ...task,
//       assignedTo: taskRoles,
//       assignedToUser: taskUsers,
//       subtasksString: getSubtaskString(task.subtasks),
//       usersAssigned: getUsersString(taskUsers),
//       rolesAssigned: getRolesString(taskRoles),
//     };
//   });
// }
