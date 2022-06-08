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
        colors: {
            appMenuBg: 'canvas.default',
            appMenuItemBg: 'canvas.default',
            appMenuItemFont: 'black',
            appMenuItemHoverBg: 'canvas.inset',
            appMenuItemHoverFont: 'accent.fg',
            appMenuItemSelectedBg: 'accent.fg',
            appMenuItemSelectedFont: 'canvas.default',

            secMenuBg: 'canvas.default',
            secMenuItemBg: 'canvas.default',
            secMenuItemFont: 'black',
            secMenuItemHoverBg: 'canvas.inset',
            secMenuItemHoverFont: 'accent.fg',
            secMenuItemSelectedBg: 'accent.fg',
            secMenuItemSelectedFont: 'canvas.default',
        }
    },
    urls: {
        home: {
            path: '/',
            name: 'Welcome'
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
            groups: {
                path: '/groups',
                name: 'Groups'
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