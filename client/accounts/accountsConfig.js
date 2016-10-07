AccountsTemplates.addFields([
    {
        _id: 'firstName',
        type: 'text',
        displayName: 'First Name',
        required: true,
    },
    {
        _id: 'lastName',
        type: 'text',
        displayName: 'Last Name',
        required: true,
    },
    {
        _id: 'cellPhone',
        type: 'tel',
        displayName: 'Cell Phone',
    },
]);

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
        _id: 'password',
        type: 'password',
        placeholder: {
            signUp: "At least eight (8) characters"
        },
        required: true,
        minLength: 8,
        re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
});

// need to add email address field?
