export const rulesForDepartment = {
    parentId: [
        {required: true, message: '请输入父部门ID', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^(0|[1-9]\d*)$/, message: '不能以0开头', trigger: 'blur'}],
    ancestors: [
        {required: true, message: '请输入祖级列表', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^\d+(,\d+)*$/, message: '只能输入以逗号分隔的数字', trigger: 'blur'}
    ],
    departmentName: [
        {required: true, message: '请输入部门名称', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {min: 1, max: 8, message: '菜单名长度在 1 到 8 个字符', trigger: 'blur'}
    ],
    orderNum: [
        {required: true, message: '请输入显示顺序', trigger: 'blur'},
        {pattern: /^[1-9][0-9]*$/, message: '请输入数字', trigger: 'blur'},
    ],
    leader: [
        {required: true, message: '负责人', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    phone: [
        {required: true, message: '请输入负责人电话', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
    ],
    email: [
        {required: true, message: '请输入部门邮箱', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
    ],
    status: [
        {required: true, message: '部门状态', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^[01]$/, message: '请输入0或1', trigger: 'blur'}
    ],
    delFlag: [
        {required: true, message: '删除标志', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^[01]$/, message: '请输入0或1', trigger: 'blur'}
    ],
    abbreviation: [
        {required: true, message: '缩写', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
};
