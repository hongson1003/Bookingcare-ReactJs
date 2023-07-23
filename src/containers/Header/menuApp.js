export const adminMenu = [
    // Quản lý người dùng
    { //hệ thống
        name: 'menu.admin.user',
        menus: [
            { name: 'menu.admin.crud', link: '/system/user-manage' },
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            { name: 'menu.admin.manage-doctor', link: '/system/user-doctor' },
            { name: 'menu.admin.manage-admin', link: '/system/user-admin' },
        ]
    },
    { //Quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            { name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' },
        ]
    },
    { //Quản lý chuyên khoa
        name: 'menu.admin.speciality',
        menus: [
            { name: 'menu.admin.manage-speciality', link: '/system/manage-speciality' },
        ]
    },
    { //Quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            { name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' },
        ]
    },
];