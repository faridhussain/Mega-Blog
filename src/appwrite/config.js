// this file handles all blog related database and storage work like creating posts, updating posts, deleting posts and uploading files
import conf from '../conf/conf.js'

// importing appwrite services
// Client -> used to connect app with appwrite
// ID -> used to generate unique ids
// Databases -> used for database related work
// Query -> used for filtering documents
// Storage -> used for file upload related work
import { Client, ID, Databases, Query, Storage } from 'appwrite'

export class Service {
    client = new Client()
    databases
    bucket
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // method for creating new blog post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            // creating new document(post) in Appwrite database
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content, 
                    featuredImage,
                    status,
                    userId  
                }
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error)
        }
    }

    // method for updating existing blog post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error', error)
        }
    }

    // method for deleting blog post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: deletePost :: error', error)
            return false
        }
    }

    // method for getting single post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('Appwrite service :: getPost :: error', error)
            return false
        }
    }

    // method for getting all active posts
    async getPosts({ queries = [Query.equal('status', 'active')] } = {}) {
        try {
            // getting all documents which match query
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('Appwrite service :: getPosts :: error', error)
        }
    }

    // method for uploading files/images
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error', error)
            return false
        }
    }

    // method for deleting uploaded file
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error', error)
            return false
        }
    }

    // method for getting file preview url
    getFilePreview(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId  
        )
    }
}

// creating one service object, whole app will use this same object
const service = new Service()
export default service