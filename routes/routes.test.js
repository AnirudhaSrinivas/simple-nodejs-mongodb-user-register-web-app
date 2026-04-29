const express = require('express');
const request = require('supertest');
const router = require('./routes');
const User = require('../models/users');

// Completely mock the User Mongoose model
jest.mock('../models/users');

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
