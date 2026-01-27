let users = [
  { id: 1, name: "Rakib", role: "Admin" },
  { id: 2, name: "Updated Agent", role: "Agent" }
];

exports.getAllUsers = () => users;

exports.getUserById = (id) =>
  users.find(u => u.id === id);

exports.updateUser = (id, data) => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...data };
  return users[index];
};

exports.deleteUser = (id) => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;

  return users.splice(index, 1)[0];
};