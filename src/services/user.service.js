const users = [
    {
        id: 1, 
        username: 'León',
        email: 'alemarlam@alum.us.es',
        password: 'verysecurehash123'
    },
]

const getAllUsers = () => {
    return users;
}

const getUserById = (id) => {
    return users.find(user => user.id === parseInt(id));
}

const createUser = (user) => {
    const newUser = {
        id: parseInt(Math.random() * 10000), // Simple random ID generation
        ...user
    };

    users.push(newUser);
    return newUser;
}

const deleteUserById = (id) => {
    const index = users.findIndex(user => user.id === parseInt(id));

    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    
    return false;
}

export { getAllUsers, getUserById, createUser, deleteUserById };