"use server";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectToDb from "@/database";
import User from "@/models/user";

export async function RegisterUser(formData) {
  await connectToDb();
  try {
    const { userName, email, password } = formData;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return {
        success: false,
        message: "user already exist ! try again please ",
      };
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newlyUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newlyUser.save();
    if (savedUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(savedUser)),
      };
    } else {
      return {
        success: false,
        message: "Something went wrong try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something error ocurred",
    };
  }
}

export async function LogInUserAction(formData) {
  await connectToDb();
  try {
    const { email, password } = formData;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return {
        success: false,
        message: "Please Sign up",
      };
    }
    const checkPassword = await bcryptjs.compare(password, checkUser.password);
    if (!checkPassword) {
      return {
        success: false,
        message: "Incorrect password try again",
      };
    }
    const creatTokenData = {
      id: checkUser._id,
      userName: checkUser.userName,
      email: checkUser.email,
    };
    const token = jwt.sign(creatTokenData, "DEFAULT_KEY", {
      expiresIn: "1d",
    });
    const getCookies = cookies();
    getCookies.set("token", token);

    return {
      success: true,
      message: "User Successfully Log In",
    };
  } catch (error) {
    return {
      success: false,
      message: "Try again later",
    };
  }
}
export async function FetchUserAction() {
  await connectToDb();
  try {
    const getCookies = cookies();
    const token = getCookies.get("token")?.value || "";
    if (token == "") {
      return {
        success: false,
        message: "Token inavalid",
      };
    }
    const decoadedToken = jwt.verify(token, "DEFAULT_KEY");
    const getInfo = await User.findOne({ _id: decoadedToken.id });
    if (getInfo) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getInfo)),
      };
    } else {
      return {
        success: false,
        message: "User invalid",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "try again later",
    };
  }
}

export async function LogoutUserAction(){
  const getCookies = cookies()
  getCookies.set("token", "")
}
