import { trace, metrics } from '@opentelemetry/api';
import { getAllUsers, getUserById, createUser, deleteUserById } from '../services/user.service.js';

const tracer = trace.getTracer('user-controller-tracer');
const meter = metrics.getMeter('user-controller-meter');

const userCreationCounter = meter.createCounter('user_creation_count', {
    description: 'Counts number of users created',
    unit: "users",
});

const getUsers = (req, res) => {
    const span = tracer.startSpan('getUsers');
    try {
        const users = getAllUsers();
        span.setAttribute('user.count', users.length);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    } finally {
        span.end();
    }
}

const getUser = (req, res) => {
    try {
        const userId = req.params.id;
        const user = getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });  
    }
}

const addUser = (req, res) => {
    try {
        const newUser = createUser(req.body);
        res.status(201).json(newUser);
        userCreationCounter.add(1);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}

const removeUser = (req, res) => {
    try {
        const userId = req.params.id;
        const success = deleteUserById(userId);
        if (success) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

export { getUsers, getUser, addUser, removeUser };