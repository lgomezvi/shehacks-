'use client'

import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import Dashboard from './Dashboard'

const ALLOWED_DOMAINS = ['uwo.ca']

export default function AuthForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [user, setUser] = useState<{ email: string } | null>(null)

  const validateEmail = (email: string): boolean => {
    const domain = email.split('@')[1]
    if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
      setEmailError('Only @uwo.ca email addresses are allowed')
      return false
    }
    setEmailError('')
    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    
    if (!validateEmail(email)) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: formData.get('password'),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setMessage(data.message)
      setUser({ email: email })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return <Dashboard email={user.email} />
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
        <CardDescription>Sign in with your UWO email</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your uwo.ca email"
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
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" disabled={loading}>
            {loading ? 'Processing...' : 'Sign In'}
          </Button>
          {error && (
            <p className="text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </p>
          )}
          {message && (
            <p className="text-sm text-green-500">{message}</p>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}