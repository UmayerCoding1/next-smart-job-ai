import { User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  contex: { params: Promise<{ username: string }> }
) {
  try {
    const userName = await contex.params;

    const user = await User.findOne({ username: userName.username });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({ user, success: true }, { status: 200 });
  } catch (error) {
    console.log("User find by username error", error);
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    await connectToDatabase();

    const userName = await context.params;

    const body = await request.json();
   

    const user = await User.findOne({ username: userName.username });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    if (body.avatar || body.coverImage) {
      if (body.imageName === "avatar") {
        const oldAvatar = user?.avatar;

        if (user.previesAvatar && user.previesAvatar.length >= 3) {
         
          user.previesAvatar.shift();
          await User.findOneAndUpdate(
            { username: userName.username },
            { previesAvatar: [...user.previesAvatar, oldAvatar] },
            { new: true }
          );
        } else {
          if (user.avatar) {
            await User.findOneAndUpdate(
              { username: userName.username },
              { previesAvatar: [...user.previesAvatar, oldAvatar] },
              { new: true }
            );
          }
        }

        const updatedUser = await User.findOneAndUpdate(
          { username: userName.username },
          { avatar: body.avatar },
          { new: true }
        );

        return NextResponse.json(
          {
            message: "Avatar updated successfully",
            success: true,
            user: updatedUser,
          },
          { status: 200 }
        );
      }

      if (body.imageName === "coverImage") {
        
        const user = await User.findOneAndUpdate(
          { username: userName.username },
          { coverImage: body.coverImage },
          { new: true }
        )
        if (!user) {
          return NextResponse.json(
            { message: "User not found", success: false },
            { status: 404 }
          );
        }

        return NextResponse.json(
          { message: "Cover image updated successfully", success: true,user },
          { status: 200 }
        );
      }
    } else {
      const user = await User.findOneAndUpdate(
        { username: userName.username },
        body,
        { new: true }
      ).populate("resume");

      if (!user) {
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "User updated successfully", success: true, user },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("User update error", error);
    return NextResponse.json(
      { message: "User update error", success: false },
      { status: 500 }
    );
  }
}
