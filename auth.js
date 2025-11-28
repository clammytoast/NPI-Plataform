// auth.js - User Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
    }

    loadUsers() {
        try {
            return JSON.parse(localStorage.getItem('npi_users')) || {};
        } catch (error) {
            console.error('Error loading users:', error);
            return {};
        }
    }

    saveUsers() {
        localStorage.setItem('npi_users', JSON.stringify(this.users));
    }

    async register(email, password, name) {
        // Simulate API call delay
        await this.delay(1000);
        
        if (this.users[email]) {
            throw new Error('User already exists');
        }

        const userId = 'user_' + Date.now();
        const user = {
            id: userId,
            email: email,
            name: name,
            createdAt: new Date().toISOString(),
            library: [] // Each user gets their own NPI library
        };

        // In a real app, you'd hash the password
        this.users[email] = {
            ...user,
            password: btoa(password) // Basic encoding - use proper hashing in production
        };

        this.saveUsers();
        this.currentUser = user;
        localStorage.setItem('npi_current_user', JSON.stringify(user));
        
        return user;
    }

    async login(email, password) {
        await this.delay(1000);
        
        const userData = this.users[email];
        if (!userData) {
            throw new Error('User not found');
        }

        // Basic password check - use proper hashing in production
        if (btoa(password) !== userData.password) {
            throw new Error('Invalid password');
        }

        const user = { ...userData };
        delete user.password; // Don't store password in current user
        
        this.currentUser = user;
        localStorage.setItem('npi_current_user', JSON.stringify(user));
        
        return user;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('npi_current_user');
    }

    getCurrentUser() {
        if (!this.currentUser) {
            try {
                const stored = localStorage.getItem('npi_current_user');
                this.currentUser = stored ? JSON.parse(stored) : null;
            } catch (error) {
                console.error('Error loading current user:', error);
                this.currentUser = null;
            }
        }
        return this.currentUser;
    }

    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }

    getUserLibrary() {
        const user = this.getCurrentUser();
        if (!user) return [];
        
        // Get user-specific library
        const userData = this.users[user.email];
        return userData ? userData.library : [];
    }

    saveUserLibrary(library) {
        const user = this.getCurrentUser();
        if (!user) return;

        if (this.users[user.email]) {
            this.users[user.email].library = library;
            this.saveUsers();
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Global auth instance
window.auth = new AuthSystem();
