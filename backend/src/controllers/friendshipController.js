const { io } = require('../index');
const { Friendship } = require('../data/Schema/friendship');
const { User } = require('../data/Schema/user');
const { Invitation } = require('../data/Schema/invitation');

const getFriends = async (req, res) => {
    try {
        const userId = req.jwtPayload.id;
        console.log('Id del usuario que esta en el token: ', userId);

        const friendships = await Friendship.find({
            $or: [{ userA: userId }, { userB: userId }]
        }).populate({
            path: 'userA userB',
            select: '_id name profilePicture'
        });
        console.log('Id de los amigos del user1: ', friendships);

        if (!friendships.length) {
            return res.status(200).json({ friendships: [] });
        }

        res.status(200).json(friendships);
    } catch (e) {
        res.status(500).send();
    }
};

const sendInvitation = async (req, res) => {
    try {
        const userId = req.jwtPayload.id;
        const userInvite = req.body.friendName;

        const userB = await User.findOne({ userName: userInvite });
        if (!userB) {
            return res.status(404).send();
        }

        const invitation = new Invitation({
            sender: userId,
            receiver: userB._id,
            status: 'PENDING',
        });
        await invitation.save();

        console.log("Principio: ");
        console.log("Esto es io:", io);
        if (!io) {
            console.error('Socket.io no está conectado');
        }
        io.emit('invitation', {
            sender: userId,
            receiver: userB._id,
            message: `¡Tienes una solicitud de amistad de Edgar!`
        });
        console.log("Final: ");
        res.status(200).json({
            message: 'Solicitud de amistad enviada correctamente',
            receiverId: userB._id
        });
    } catch (e) {
        res.status(500).send();
    }
};

module.exports = {
    getFriends,
    sendInvitation
};
