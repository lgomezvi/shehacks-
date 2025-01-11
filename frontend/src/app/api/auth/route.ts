// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { hash, compare } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;

    // Encrypt password
    const hashedPassword = await hash(password, 10);

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Check if password is correct
      const isPasswordCorrect = await compare(password, existingUser.password);
      if (isPasswordCorrect) {
        return NextResponse.json({ 
          user: existingUser,
          message: 'Login successful'
        });
      } else {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 401 }
        );
      }
    }

    // If user doesn't exist, create new account
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ 
      user,
      message: 'Registration successful'
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}