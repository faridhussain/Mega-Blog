// this file handles all Appwrite authentication related work like signup, login, logout and getting current user
import conf from '../conf/conf.js'

// importing appwrite classes
// Client -> used to connect our app with Appwrite
// Account -> used for login/signup/logout related work
// ID -> used to generate unique ids automatically
import { Client, Account, ID } from 'appwrite'

// this class is used to handle all authentication related work like signup, login, logout, getting current user
export class AuthService {
    client = new Client()
    account;

    // constructor runs automatically when AuthService object is created
    // here we setup Appwrite connection and account service
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.account = new Account(this.client)
    }

    // method for creating new user account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            // if user created successfully, automatically login the user
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    // method for login
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    // method to check currently logged in user
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error)
            return null 
        }
    }

    // method for logout
    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite service :: logout :: error', error)
        }
    }
}

// creating one object of AuthService
// so whole app can use same authentication service
const authService = new AuthService()
export default authService