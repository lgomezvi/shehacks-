'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

// Simulated server action
async function handleAuth(prevState: any, formData: FormData) {
  // This is where you'd typically handle the authentication logic
  // For now, we'll just simulate a successful auth after a delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const email = formData.get('email') as string
  return { success: true, message: `Authentication successful for ${email}` }
}

const ALLOWED_DOMAINS = ['uwo.ca']

export default function AuthForm() {
  const [state, formAction] = useActionState(handleAuth)
  const [emailError, setEmailError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    const domain = email.split('@')[1]
    if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
      setEmailError('Email domain not allowed')
      return false
    }
    setEmailError(null)
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = new FormData(form).get('email') as string
    if (validateEmail(email)) {
      formAction(new FormData(form))
    }
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
          <Button className="w-full">Sign In / Sign Up</Button>
        </CardFooter>
      </form>
      {state?.message && (
        <p className="text-sm text-center mt-2 text-green-600">{state.message}</p>
      )}
    </Card>
  )
}

