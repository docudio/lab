import { Link } from '@material-ui/core'
import React from 'react'
import AZFaq from '../../utils/AZFAQ'

export default function FrequentlyAskedQuestions () {
  return (
    <AZFaq
      questions={[
        {
          question: 'What can we do?',
          answer: (
            <>
              - Issue Internal InfoSec Signed Certificates using <Link target='_blank' rel='noreferrer' href='https://letsencrypt.org/how-it-works/'>ACME </Link>
              <br />
              - Create Load Balancers that use and renew Internal InfoSec Signed Certificates using ACME
            </>)
        },
        {
          question: 'What if my application cannot support ACME?',
          answer: <>- We have a <Link target='_blank' rel='noreferrer' href='https://infosec.autozone.com/wiki/Tickets_and_Requests#Encryption_Certificates'>manual procedure </Link> that is used only when ACME isn't available or a certificate from Digicert is needed.</>
        },
        {
          question: 'What can we not do yet?',
          answer: <>- Issue Internet Facing Certificates from CA's like Digicert using <Link target='_blank' rel='noreferrer' href='https://letsencrypt.org/how-it-works/'>ACME </Link> (On the Roadmap)</>
        },
        {
          question: 'When should I use an InfoSec signed certificate?',
          answer: '- Internal InfoSec CA certificates may only be used for internal-only applications. This excludes any applications exposed to the internet.'
        }]}
    />
  )
}
