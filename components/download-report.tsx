/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

'use client'

import { useState } from 'react'

import { ARTEMIS_TERMINAL_URL } from '@/constants/general'

import { ArrowLeftIcon } from 'lucide-react'

const INIT = 'INIT'
const SUBMITTING = 'SUBMITTING'
const ERROR = 'ERROR'
const SUCCESS = 'SUCCESS'
const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const
const formStyles = {
  id: 'cm6ds3qsy024p10fmew0s8r3h',
  name: 'Default',
  formStyle: 'inline',
  placeholderText: 'Enter your email',
  formFont: 'Inter',
  formFontColor: '#070611',
  formFontSizePx: 14,
  buttonText: 'Download',
  buttonFont: 'Inter',
  buttonFontColor: '#ffffff',
  buttonColor: '#684FF8',
  buttonFontSizePx: 14,
  successMessage: 'Redirecting to report...',
  successFont: 'Inter',
  successFontColor: '#684FF8',
  successFontSizePx: 14,
  source: 'Stablecoins 2025 Report Download',
  mailingLists: 'cmapovue005770iwve0e19b2l' // https://app.loops.so/settings?page=lists
}
const domain = 'app.loops.so'
const reportLink =
  'https://reports.artemisanalytics.com/stablecoins/artemis-stablecoin-payments-from-the-ground-up-2025.pdf'

export default function DownloadReport() {
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<(typeof formStates)[number]>(INIT)
  const [errorMessage, setErrorMessage] = useState('')
  const [fields, setFields] = useState({})

  const resetForm = () => {
    setEmail('')
    setFormState(INIT)
    setErrorMessage('')
  }

  /**
   * Rate limit the number of submissions allowed
   * @returns {boolean} true if the form has been successfully submitted in the past minute
   */
  // const hasRecentSubmission = () => {
  //   const time = new Date()
  //   const timestamp = time.valueOf()
  //   const previousTimestamp = localStorage.getItem('loops-form-timestamp')

  //   // Indicate if the last sign up was less than a minute ago
  //   if (
  //     previousTimestamp &&
  //     Number(previousTimestamp) + 60 * 1000 > timestamp
  //   ) {
  //     setFormState(ERROR)
  //     setErrorMessage('Too many signups, please try again in a little while')
  //     return true
  //   }

  //   localStorage.setItem('loops-form-timestamp', timestamp.toString())
  //   return false
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission
    event.preventDefault()

    // boundary conditions for submission
    if (formState !== INIT) return
    if (!isValidEmail(email)) {
      setFormState(ERROR)
      setErrorMessage('Please enter a valid email')
      return
    }
    // if (hasRecentSubmission()) return
    setFormState(SUBMITTING)

    // build additional fields
    const additionalFields = Object.entries(fields).reduce(
      (acc, [key, val]) => {
        if (val) {
          return acc + '&' + key + '=' + encodeURIComponent(val as string)
        }
        return acc
      },
      ''
    )

    // build body
    const formBody = `email=${encodeURIComponent(
      email
    )}&source=${encodeURIComponent(
      formStyles.source
    )}&mailingLists=${encodeURIComponent(formStyles.mailingLists)}`

    // API request to add user to newsletter
    fetch(`https://${domain}/api/newsletter-form/${formStyles.id}`, {
      method: 'POST',
      body: formBody + additionalFields,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((res: any) => [res.ok, res.json(), res])
      .then(([ok, dataPromise, res]) => {
        if (ok) {
          resetForm()
          setFormState(SUCCESS)

          // Send event to Loops
          fetch('/api/loops-event', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              eventName: 'stablecoins2025ReportDownloaded' // Make sure the eventName matches the eventName in the Loops dashboard
            })
          }).then(() => {
            setTimeout(() => {
              window.open(reportLink, '_blank')
            }, 1000)
          })
        } else {
          dataPromise.then((data: any) => {
            setFormState(ERROR)
            setErrorMessage(data.message || res.statusText)
            localStorage.setItem('loops-form-timestamp', '')
          })
        }
      })
      .catch(error => {
        setFormState(ERROR)
        // check for cloudflare error
        if (error.message === 'Failed to fetch') {
          setErrorMessage(
            'Too many signups, please try again in a little while'
          )
        } else if (error.message) {
          setErrorMessage(error.message)
        }
        localStorage.setItem('loops-form-timestamp', '')
      })
  }

  const isInline = formStyles.formStyle === 'inline'

  switch (formState) {
    case SUCCESS:
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%'
          }}
        >
          <p
            style={{
              fontFamily: `'${formStyles.successFont}', sans-serif`,
              color: formStyles.successFontColor,
              fontSize: `${formStyles.successFontSizePx}px`
            }}
          >
            {formStyles.successMessage}
          </p>
        </div>
      )
    case ERROR:
      return (
        <>
          <SignUpFormError />
          <BackButton />
        </>
      )
    default:
      return (
        <>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: isInline ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%'
            }}
          >
            <input
              type="text"
              name="email"
              placeholder={formStyles.placeholderText}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required={true}
              style={{
                color: formStyles.formFontColor,
                fontFamily: `'${formStyles.formFont}', sans-serif`,
                fontSize: `${formStyles.formFontSizePx}px`,
                margin: isInline ? '0px 8px 0px 0px' : '0px 0px 10px',
                height: '32px',
                width: '100%',
                maxWidth: '280px',
                minWidth: '100px',
                background: '#FFFFFF',
                border: '1px solid #D1D5DB',
                boxSizing: 'border-box',
                boxShadow:
                  '0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.40) inset, 0px 0.5px 1px 0px rgba(0, 0, 0, 0.10)',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
            />
            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-2024px' }}
            ></div>
            <SignUpFormButton />
          </form>
        </>
      )
  }

  function SignUpFormError() {
    return (
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            color: 'rgb(185, 28, 28)',
            fontSize: '14px'
          }}
        >
          {errorMessage || 'Oops! Something went wrong, please try again'}
        </p>
      </div>
    )
  }

  function BackButton() {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <button
        style={{
          color: '#6b7280',
          font: '14px, Inter, sans-serif',
          textAlign: 'left',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textDecoration: isHovered ? 'underline' : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
        onMouseOut={() => setIsHovered(false)}
        onMouseOver={() => setIsHovered(true)}
        onClick={resetForm}
      >
        <ArrowLeftIcon className="w-4 h-4" /> <span>Back</span>
      </button>
    )
  }

  function SignUpFormButton({ props }: any) {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <button
        type="submit"
        style={{
          background: formStyles.buttonColor,
          opacity: isHovered ? 0.9 : 1,
          fontSize: `${formStyles.buttonFontSizePx}px`,
          color: formStyles.buttonFontColor,
          fontFamily: `'${formStyles.buttonFont}', sans-serif`,
          width: isInline ? 'min-content' : '100%',
          maxWidth: '300px',
          whiteSpace: isInline ? 'nowrap' : 'normal',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          padding: '8px 12px',
          boxShadow:
            '0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.40) inset, 0px 0.5px 1px 0px rgba(0, 0, 0, 0.10)',
          borderRadius: '8px',
          textAlign: 'center',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '20px',
          border: 'none',
          cursor: 'pointer',
          transition: 'opacity 0.2s ease'
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {formState === SUBMITTING ? 'Please wait...' : formStyles.buttonText}
      </button>
    )
  }
}

function isValidEmail(email: any) {
  return /.+@.+/.test(email)
}
