module.exports = {
    name: "Todo",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar"
        },
        created_at: {
            nullable: true,
            type: "timestamp",
            default: 'now()',
        },
        updated_at: {
            nullable: true,
            type: "timestamp",
            default: 'now()',

        },
        deleted_at: {
            nullable: true,
            type: "timestamp",
            default: 'now()',
        },
        status: {
            type: "varchar",
        }
    }
};
