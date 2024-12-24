const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'El email no es válido'],
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 1,
    },
    birthDate: {
      type: Date
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: String,
      default: 'user',
      enum: ['admin', 'user'],
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true },
);

// Middleware: Hashear la contraseña antes de guardar
//userSchema.pre('save', async function (next) {
//if (this.isModified('password')) {
//const salt = await bcrypt.genSalt(10);
//this.password = await bcrypt.hash(this.password, salt);
//}
//next();
//});

const User = model('User', userSchema);

module.exports = { User };
