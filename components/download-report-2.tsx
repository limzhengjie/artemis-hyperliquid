'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const REPORT_LINK = 'https://artemis.xyz/stablecoin-report-2025' // Replace with actual report link

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email' })
    .refine(
      email => {
        // Check for common email format issues
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
      },
      { message: 'Please enter a valid email' }
    )
    .transform(email => email.toLowerCase().trim())
})

type FormData = z.infer<typeof formSchema>

export default function DownloadReportForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/download-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSuccess(true)

      setTimeout(() => {
        window.open(REPORT_LINK, '_blank')
      }, 1000)
    } catch (err) {
      form.setError('email', {
        type: 'manual',
        message: 'Something went wrong. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-2 text-[var(--color-pluto-purple-500)] font-medium">
        <p>Thank you for downloading the report!</p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-2 items-center"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full relative">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="bg-white"
                  disabled={isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="cta" type="submit" disabled={isLoading || isSuccess}>
          {isSuccess
            ? 'Success!'
            : isLoading
            ? 'Processing...'
            : 'Download Report'}
        </Button>
      </form>
    </Form>
  )
}
