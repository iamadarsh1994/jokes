import User from "./models.js";
import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import JWT_SECRET from "./config.js";

const signupBody = zod.object({
  email: zod.string(),
  password: zod.string().min(8),
});

export const Signup = async (req, res) => {
  try {
    const parsed = signupBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input data",
        error: parsed.error.errors,
      });
    }
    const { email, password } = parsed.data;

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(411).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    const userId = user._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({
      message: "User registered Successfully",
      token: token,
    });
  } catch (error) {
    console.error("Signup Error.", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const loginBody = zod.object({
  email: zod.string(),
  password: zod.string().min(8),
});

export const Login = async (req, res) => {
  try {
    const parsed = loginBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid inputs",
        error: parsed.error.errors,
      });
    }
    const { email, password } = parsed.data;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.json({ token: token, expiresIn: "7d" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default { Signup, Login };
