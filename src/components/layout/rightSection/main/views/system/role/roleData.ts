export const rulesForRole = {
    roleName: [
        {required: true, message: '请输入角色名', trigger: 'blur'},
        {min: 1, max: 6, message: '角色名长度在 1 到 6 个字符', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    status: [
        {required: true, message: '请选择角色状态', trigger: 'change'},
        {pattern: /^[01]$/, message: '请输入0或1', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    roleSort: [
        {required: true, message: '角色显示顺序', trigger: 'change'},
        {pattern: /^[1-9][0-9]*$/, message: '请输入数字', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    remark: [
        {required: true, message: '备注', trigger: 'change'},
        {min: 1, max: 50, message: '备注长度在 1 到 50 个字符', trigger: 'blur'}
    ]
};