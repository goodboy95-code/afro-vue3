export const rulesForMenu = {
    menuName: [
        {required: true, message: '请输入菜单名', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {min: 1, max: 6, message: '菜单名长度在 1 到 6 个字符', trigger: 'blur'}
    ],
    icon: [
        {required: true, message: '请输入菜单icon', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    parentId: [
        {required: true, message: '请输入父菜单ID', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^(0|[1-9]\d*)$/, message: '不能以0开头', trigger: 'blur'}
    ],
    orderNum: [
        {required: true, message: '请选择菜单顺位', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^[1-9][0-9]*$/, message: '请输入数字', trigger: 'blur'},
    ],
    menuType: [
        {required: true, message: '请选择菜单类型', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^([BDM])$/, message: 'B（按钮）、D（目录）、M（菜单）', trigger: 'blur'}
    ],
    visible: [
        {required: true, message: '选择菜单可见性', trigger: 'change'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^[01]$/, message: '请输入0或1', trigger: 'blur'}
    ],
    status: [
        {required: true, message: '请选择菜单状态', trigger: 'change'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
        {pattern: /^[01]$/, message: '请输入0或1', trigger: 'blur'}
    ],
    remark: [
        {required: true, message: '备注', trigger: 'change'},
        {min: 1, max: 50, message: '备注长度在 1 到 50 个字符', trigger: 'blur'}
    ]
}
