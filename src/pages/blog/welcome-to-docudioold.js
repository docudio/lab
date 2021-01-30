import React from 'react'
import { Card, makeStyles, CardHeader, CardContent, Typography } from '@material-ui/core'
import { withTranslation } from '../../i18n'
import ShareBlockStandard from '../../sharedComponents/ShareBlockStandard'
import ShareButtonCircle from '../../sharedComponents/ShareButtonCircle'

import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import EmailIcon from '@material-ui/icons/Email'
import FacebookIcon from '@material-ui/icons/Facebook'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginBottom: '10px'
  }
}))

function Examples ({ t }) {
  const classes = useStyles()

  const handleSubmit = () => {
    setsubmitted(!submitted)
    setemail('')
  }

  const handleEmail = (event) => {
    setemail(event.target.value)
  }

  const [submitted, setsubmitted] = React.useState(false)
  const [email, setemail] = React.useState('')
  const shareBlockProps = {
    url: 'https://www.docudio.com/blog/welcome-to-docudio',
    button: ShareButtonCircle,
    buttons: [
      { network: 'Twitter', icon: TwitterIcon },
      { network: 'Facebook', icon: FacebookIcon },
      { network: 'Email', icon: EmailIcon },
      { network: 'Linkedin', icon: LinkedInIcon }
    ],
    text: 'Checkout this blog Post!',
    longtext: 'This Docudio blog post is awesome, check it out!'
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={t('cardtitle')} />
      <CardContent>
        <Typography align='center' variant='h3'>
          {t('title')}
        </Typography>
        <Typography align='center' variant='h5' style={{ marginBottom: '30px' }}>
          {t('statement')}        </Typography>
        <ShareBlockStandard {...shareBlockProps} />
      </CardContent>
    </Card>
  )
}

Examples.getInitialProps = async () => ({
  namespacesRequired: ['examples']
})
export default withTranslation('examples')(Examples)
