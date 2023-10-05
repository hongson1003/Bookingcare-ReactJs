export const adminMenu = [
    // Quản lý người dùng
    { //hệ thống
        name: 'menu.admin.user',
        menus: [
            // { name: 'menu.admin.crud', link: '/system/user-manage' },
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' },
            { name: 'menu.doctor.manage-schedule', link: '/system/manage-schedule' },
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

export const doctorMenu = [
    // Quản lý người dùng
    { //hệ thống
        name: 'menu.doctor.user',
        menus: [
            { name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient' },
            // { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' },

        ]
    },

];