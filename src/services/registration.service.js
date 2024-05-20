exports.registerUser = async (req, res) => {
    const test1 = req.query.username;
    const test2 = req.query.email;
    const test3 = req.query.page;

    console.log(test1);
    console.log(test2);
    console.log(test3);
};

