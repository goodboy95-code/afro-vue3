export const rulesForNotice = {
    noticeTitle: [
        {required: true, message: '请输入通知标题', trigger: 'blur'},
        {min: 1, max: 20, message: '通知标题长度在 1 到 20 个字符', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    noticeType: [
        {required: true, message: '请选择通知类型', trigger: 'change'},
        {pattern: /^[01]$/, message: '请输入0或1', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    status: [
        {required: true, message: '请选择通知状态', trigger: 'change'},
        {pattern: /^[01]$/, message: '请输入0或1', trigger: 'blur'},
        {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    ],
    noticeContent: [
        {required: false, message: '通知内容', trigger: 'change'},
        {min: 1, max: 200, message: '通知内容长度在 1 到 200 个字符', trigger: 'blur'},
    ],
    remark: [
        {required: false, message: '备注', trigger: 'change'},
        {min: 1, max: 30, message: '备注长度在 1 到 30 个字符', trigger: 'blur'},
    ]
};
