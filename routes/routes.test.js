const express = require('express');
const request = require('supertest');
const router = require('./routes');
const User = require('../models/users');
const fs = require('fs');

// Completely mock the User Mongoose model
jest.mock('../models/users');
// Mock fs to prevent actual file deletions
jest.mock('fs');

describe('POST /add route', () => {
    let app;
    let currentSession;

    beforeEach(() => {
        // Initialize an Express app to use the router
        app = express();
        
        // Middleware to parse URL-encoded bodies and JSON
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        
        // Middleware to mock req.session
        app.use((req, res, next) => {
            req.session = {};
            currentSession = req.session; // Keep a reference to check later
            next();
        });

        // Use the router
        app.use('/', router);
        
        // Clear mock calls before each test
        User.mockClear();
        jest.clearAllMocks();
    });

    it('should save a new user successfully and set a success message in session', async () => {
        // Mock the user.save() function to resolve successfully
        const mockSave = jest.fn().mockResolvedValue(true);
        User.mockImplementation(() => {
            return { save: mockSave };
        });

        // Simulate the HTTP POST request using supertest
        const response = await request(app)
            .post('/add')
            .field('name', 'John Doe')
            .field('email', 'john@example.com')
            .field('phone', '1234567890');

        // Verify the User constructor was called with the correct data
        expect(User).toHaveBeenCalledTimes(1);
        expect(User).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            image: 'user_unknown.png' // default when no image is uploaded
        });

        // Verify the save function was called
        expect(mockSave).toHaveBeenCalledTimes(1);
        
        // Verify the response redirects to '/'
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/');
        
        // Verify the success session message
        expect(currentSession.message).toEqual({
            type: 'success',
            message: 'User added successfully'
        });
    });

    it('should handle errors when user.save() fails and set a danger message in session', async () => {
        // Mock the user.save() function to reject with an error
        const errorMessage = 'Database save error';
        const mockSave = jest.fn().mockRejectedValue(new Error(errorMessage));
        User.mockImplementation(() => {
            return { save: mockSave };
        });

        // Simulate the HTTP POST request using supertest
        const response = await request(app)
            .post('/add')
            .field('name', 'Jane Doe')
            .field('email', 'jane@example.com')
            .field('phone', '0987654321');

        // Verify the User constructor and save were called
        expect(User).toHaveBeenCalledTimes(1);
        expect(mockSave).toHaveBeenCalledTimes(1);
        
        // Verify the response still redirects to '/' on error
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/');

        // Verify the danger session message
        expect(currentSession.message).toEqual({
            type: 'danger',
            message: errorMessage
        });
    });
});

describe('GET /delete/:id route', () => {
    let app;
    let currentSession;

    beforeEach(() => {
        app = express();
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        
        app.use((req, res, next) => {
            req.session = {};
            currentSession = req.session;
            next();
        });

        app.use('/', router);
        
        User.mockClear();
        // Avoid error if unlinkSync isn't explicitly mocked, though jest.mock('fs') does this
        if (fs.unlinkSync.mockClear) {
            fs.unlinkSync.mockClear();
        }
        jest.clearAllMocks();
    });

    it('should delete user, unlink image, and set info message on success', async () => {
        const mockUser = {
            _id: '123',
            name: 'John Doe',
            image: 'test_image.png'
        };
        User.findByIdAndDelete.mockResolvedValue(mockUser);

        const response = await request(app).get('/delete/123');

        expect(User.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(fs.unlinkSync).toHaveBeenCalledWith('./uploads/test_image.png');
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/');
        expect(currentSession.message).toEqual({
            type: 'info',
            message: 'User deleted!'
        });
    });

    it('should delete user but not call unlinkSync if user has no image', async () => {
        const mockUser = {
            _id: '123',
            name: 'Jane Doe'
            // no image property
        };
        User.findByIdAndDelete.mockResolvedValue(mockUser);

        const response = await request(app).get('/delete/123');

        expect(User.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(fs.unlinkSync).not.toHaveBeenCalled();
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/');
        expect(currentSession.message).toEqual({
            type: 'info',
            message: 'User deleted!'
        });
    });

    it('should handle errors when User.findByIdAndDelete fails and set danger message', async () => {
        const errorMessage = 'Database deletion error';
        User.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

        const response = await request(app).get('/delete/123');

        expect(User.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(fs.unlinkSync).not.toHaveBeenCalled();
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/');
        expect(currentSession.message).toEqual({
            type: 'danger',
            message: errorMessage
        });
    });
});

