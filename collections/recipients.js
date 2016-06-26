Recipients = new Mongo.Collection('recipients');


Gift = new SimpleSchema({
    giftType: {
        type: String,
        label: "Gift",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
        }
    },
    size: {
        type: String,
        label: "Size",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
        }
    },
    selected: {
        type: Boolean,
        label: "Selected",
        autoform: {
            class: "ui slider checkbox",
        }
    },
    checkedIn: {
        type: Boolean,
        label: "Checked In",
        autoform: {
            class: "ui toggle checkbox",
        }
    },
    outForDelivery: {
        type: Boolean,
        label: "Out for Delivery",
        autoform: {
            class: "ui toggle checkbox",
        }
    },
    deliveryPerson: {
        type: String,
        label: "Delivery Person Name",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
        }
    },
    deliveryPhone: {
        type: String,
        label: "Delivery Person Phone",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
        }
    }
});

RecipientSchema = new SimpleSchema({
    bastasId: {
        type: String,
        label: "Recipient ID",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient IDs"
        }
    },
    firstName: {
        type: String,
        label: "First Name",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient"
        }
    },
    lastName: {
        type: String,
        label: "Last Name",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient"
        }
    },
    gender: {
        type: String,
        label: "Gender",
        allowedValues: ['Male', 'Female'],
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient"
        }
    },
    route: {
        type: String,
        label: "Route",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient IDs"
        }
    },
    streetAddress: {
        type: String,
        label: "Street Address",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient Address"
        }
    },
    aptComplex: {
        type: String,
        label: "Apt. Complex Name",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient Address"
        }
    },
    aptNo: {
        type: String,
        label: "Apt #",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient Address"
        }
    },
    city: {
        type: String,
        label: "City",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient Address"
        }
    },
    state: {
        type: String,
        label: "State",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient Address"
        }
    },
    zip: {
        type: String,
        label: "Zip Code",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient Address"
        }
    },
    homePhone: {
        type: String,
        label: "Home Phone",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient Other Information"
        }
    },
    cellPhone: {
        type: String,
        label: "Cell Phone",
        autoform: {
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient Other Information"
        }
    },
    notes: {
        type: String,
        label: "Notes",
        max: 2000,
        autoform: {
            rows: 5,
            placeholder: placeholder="schemaLabel",
            class: "column field",
            group: "Add Recipient Other Information"
        }
    },
    gifts: {
        type: [Gift],
        autoform: {
            group: "Recipient Gifts"
        }
    },
    addedAt: {
        type: Date,
        label: "Date Added",
        autoValue: function() {
            return new Date()
        },
        autoform: {
            type: "hidden"
        }
    },
    lastEditedOn: {
        type: Date,
        label: "Last Edited On",
        autoform: {
            type: "hidden"
        }
    }
});

Recipients.attachSchema( RecipientSchema );
