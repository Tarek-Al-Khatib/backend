import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository.js";
import { jwtHelper } from "../jwt/jwtHelper.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userRepository.findByEmailOrUsername(
      email,
      username
    );
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser(
      {
        username,
        email,
        password: hashedPassword,
      },
      req
    );

    const token = jwtHelper.generateToken({
      userId: user.id,
      email: user.email,
      level: user.level,
      points: user.points,
    });

    res.status(200).json({
      message: "User registered successfully.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.level,
        points: user.points,
        profile_pic: user.profile_pic,
      },
      token,
    });
  } catch (error) {
    console.error("Error in register:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
};

export const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await userRepository.findByEmailOrUsername(
      emailOrUsername,
      emailOrUsername
    );
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwtHelper.generateToken({
      userId: user.id,
      email: user.email,
      level: user.level,
      points: user.points,
    });

    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.level,
        points: user.points,
      },
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};
