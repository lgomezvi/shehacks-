// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Simple password check (in reality, use proper password hashing)
      if (existingUser.password === password) {
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
      password,
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