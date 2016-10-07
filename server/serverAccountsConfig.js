var postSignUp = function(userId, info) {
    Roles.addUsersToRoles(userId, 'giver', 'allUsers');
}

AccountsTemplates.configure({
    postSignUpHook: postSignUp,
});
