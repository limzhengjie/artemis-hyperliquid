'use client'

import { useState } from 'react'
import Link from 'next/link'
import posthog from 'posthog-js'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRightIcon } from 'lucide-react'

const REPORT_LINK =
  'https://reports.artemisanalytics.com/stablecoins/artemis-stablecoin-payments-from-the-ground-up-2025.pdf'

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

interface Props {
  disableForm?: boolean
}

export default function DownloadReportForm({ disableForm = false }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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

      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )

      // Track successful download
      posthog.capture('report_downloaded', {
        $set: {
          last_report_download: new Date().toISOString(),
          device_type: isMobile ? 'mobile' : 'desktop',
          user_email: data.email
        }
      })

      if (isMobile) {
        window.location.href = REPORT_LINK
      } else {
        const anchor = document.createElement('a')
        anchor.href = REPORT_LINK
        anchor.target = '_blank'
        anchor.rel = 'noopener noreferrer'
        anchor.click()
      }
    } catch (err) {
      console.error(err)
      form.setError('email', {
        type: 'manual',
        message: 'Something went wrong. Please refresh the page and try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-2 text-[var(--color-pluto-purple-500)] font-medium">
        <p>Thank you for downloading the report!</p>
        <p className="text-sm text-muted-foreground">
          If you&apos;re not redirected to the report in 5 seconds, please{' '}
          <Link
            href={REPORT_LINK}
            target="_blank"
            className="underline hover:opacity-80"
          >
            click here to download the report
          </Link>
        </p>
      </div>
    )
  }

  if (disableForm) {
    return (
      <Button variant="cta" asChild className="w-fit">
        <Link href={REPORT_LINK} target="_blank" className="flex items-center">
          Download the Report
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </Button>
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
            <FormItem className="w-full max-w-[320px] relative">
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
          Download
        </Button>
      </form>
    </Form>
  )
}
