
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");

const createUser = asyncHandler(
    async (req, res) => {
        const email = req.body.email;
        const findUser = await User.findOne({ email: email });
        if (!findUser){
            const newUser = await User.create(req.body);
            res.json(newUser);
        } else {
            throw new Error("Usuario ja cadastrado.")
        }
    }
);

const loginUser = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body
        const findUser = await User.findOne({ email });
        if (findUser && await findUser.isPasswordMatched(password)) {
            res.json({
                _id: findUser?._id,
                firstname: findUser?.firstname,
                lastname: findUser?.lastname,
                email: findUser?.email,
                mobile: findUser?.mobile,
                token: generateToken(findUser?._id)
            });
        } else {
            throw new Error("Credenciais Invalidas");
        }
    }
);

const getUsers = asyncHandler(
    async (req, res) => {
        try{
            const users = await User.find();
            res.json(users);
        } catch (error) {
            throw new Error(error);
        }
    }
);

const getUser = asyncHandler(
    async (req, res) => {
        const { _id } = req.user;
        try{
            const user = await User.findById(_id);
            res.json({user});
        } catch (error) {
            throw new Error(error);
        }
    }
);

const deleteUser = asyncHandler(
    async (req, res) => {
        const { _id } = req.user;
        try {
            const user = await User.findByIdAndDelete(_id);
            res.json({user});
        } catch (error) {
            throw new Error(error);
        }
    }
);

const updateUser = asyncHandler(
    async (req, res) => {
        try {
            const { _id } = req.user;
            const user = await User.findByIdAndUpdate(_id,{
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            });
            res.json(user);
        } catch (error) {
            throw new Error(error);
        }
    }
);

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}