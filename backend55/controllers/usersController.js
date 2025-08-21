const getUsers = (req, res) => {
     res.send('Users. query='+JSON.stringify(req.query));
}

const getUserById = (req, res) => {
    const userId = req.params.id;
    res.send('User Id '+userId);
}

export {getUsers, getUserById}