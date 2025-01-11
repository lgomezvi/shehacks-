'use client'
import React, { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import { connectDB } from '@/lib/mongodb'

const ALLOWED_DOMAINS = ['uwo.ca']

export default function AuthForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')

  const validateEmail = (email: string): boolean => {
    const domain = email.split('@')[1]
    if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
      setEmailError('Email domain not allowed')
      return false
    }
    setEmailError('')
    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    
    if (validateEmail(email)) {
      try {
        console.log('test')
        await connectDB()
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setMessage(`Authentication successful for ${email}`)
      } catch (error) {
        setMessage('Authentication failed')
      }
    }
    
    setLoading(false)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
        <CardDescription>Sign up or log in to your account.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                required
              />
              {emailError && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {emailError}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={loading}>
            {loading ? 'Processing...' : 'Sign In / Sign Up'}
          </Button>
        </CardFooter>
      </form>
      {message && (
        <p className="text-sm text-center mt-2 text-green-600">{message}</p>
      )}
    </Card>
  )
}