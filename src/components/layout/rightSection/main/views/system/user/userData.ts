export const rulesForUser = {
    userName: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 1, max: 6, message: '用户名长度在 1 到 6 个字符', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    nickName: [
        {required: true, message: '请输入昵称', trigger: 'blur'},
        {min: 1, max: 6, message: '昵称长度在 1 到 6 个字符', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    selectedRole: [
        {required: true, message: '角色未选择', trigger: 'blur'},
        {type: 'array', min: 1, message: '请至少选择一个角色', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    sex: [
        {required: true, message: '请选择性别', trigger: 'change'},
        {pattern: /^([FMU])$/, message: 'F（女）、M（男）、U（未知）', trigger: 'blur'}
    ],
    status: [
        {required: true, message: '请选择用户状态', trigger: 'change'},
        {pattern: /^[01]$/, message: '请输入0或1', trigger: 'blur'}
    ],
    phoneNumber: [
        {required: true, message: '请输入电话号码', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^1[3456789]\d{9}$/, message: '电话号码格式不正确', trigger: 'blur'}
    ],
    email: [
        {required: true, message: '请输入邮箱', trigger: 'change'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {type: 'email', message: '邮箱格式不正确', trigger: 'change'}
    ]
};
