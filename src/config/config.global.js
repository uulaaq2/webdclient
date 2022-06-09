const apiServer = 'http://AUBOTD9X94HD2:3002'

module.exports = {
    showClientDevelopmentErros: true,
    localStorageType: 'cookie',
    localStorageExpiresIn: 14,    
    app: {
        corporateTitle: 'Indorama Ventures Oxide Pty Ltd',
        name: 'IBOS'
    },
    theme: {
        
    },
    urls: {
        home: {
            path: '/',
            name: 'Home'
        },
        user : {
            signIn: {
                path: '/signin',
                name: 'Sign in'
            },
            signOut: {
                path: '/signout',
                name: 'Sign Out'
            },
            changePassword: {
                path: '/me/changepassword',
                name: 'Change password'
            }
        },
        drawings: { 
            path: '/drawings',
            name: 'Loop PDFs'
        },
        error: {
            path: '/error',
            name: 'Error'
        },
        public: {
            path: '/public',
            name: 'Welcome'
        },
        settings: {
            name: 'Settings',
            path: '/settings',
            groups: {
                path: '/settings/groups',
                name: 'Groups'
            },
            departments: {
                path: '/settings/departments',
                name: 'Departments'
            },  
            users: {
                path: '/settings/users',
                name: 'Users'
            },                      
            sites: {
                path: '/sites',
                name: 'Sites'
            }
        }
    },
    api: {
        urls: {
            user: {
                signIn: apiServer + '/signin',
                verifyPassword: apiServer + '/user/me/verifypassword',
                changePassword: apiServer + '/user/me/changepassword',
                emailResetPasswordLink: apiServer + '/user/me/emailpasswordresetlink',
                generateToken: apiServer + '/user/me/generatetoken',
                verifyToken: apiServer + '/user/me/verifytoken',
                userProfile: apiServer + '/users'
            },
            getDrawings: apiServer + '/getdrawings',
            verifyToken: apiServer + '/verifytoken',
        }

    }
}