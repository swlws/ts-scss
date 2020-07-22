export default {
    home: {
        getTest: {
            url: '/api/test',
            method: 'get',
            params: {
                boolean: Boolean,
                number: Number,
                string: String,
                object: Object,
                array: Array,
                boolean2: {
                    type: Boolean,
                    require: false
                },
                number2: {
                    type: Number,
                    require: true
                },
                string2: {
                    type: String
                },
                object2: {
                    type: Object
                },
                array2: {
                    type: Array
                },
                obj3: {
                    boolean3: Boolean,
                    number3: Number,
                    string3: String,
                    object3: Object,
                    array3: Array,
                },

            }
        },
        getName: {
            url: "/api/name",
            method: "get",
        },
        getAge: {
            url: "/api/age",
            method: "post",
        },
        userList: {
            url: "/api/user/list",
            method: "get",
        }
    }
}