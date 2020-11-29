
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import { Translation } from 'react-i18next'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PublicIcon from '@material-ui/icons/Public'
import { withTranslation } from '../i18n'
import ChatIcon from '@material-ui/icons/Chat'
import CloudIcon from '@material-ui/icons/Cloud'
import HomeIcon from '@material-ui/icons/Home'

import { Collapse } from '@material-ui/core'

import AppsIcon from '@material-ui/icons/Apps'

import ListItemLink from './ListItemLink'
import BookIcon from '@material-ui/icons/Book'
import DescriptionIcon from '@material-ui/icons/Description'
import GitHubIcon from '@material-ui/icons/GitHub'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

function PageLinks (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Translation ns='pagelinks'>
        {(t) =>
          <Paper elevation={0}>
            <List aria-label='navigation'>
              <ListItemLink handleDrawerClose={props.handleDrawerClose} to='/' primary={t('Home')} icon={<HomeIcon />} />
              <ListItemLink handleDrawerClose={props.handleDrawerClose} to='/start' primary={t('Get Started')} icon={<PlayCircleOutlineIcon />} />
              <ListItemLink handleDrawerClose={props.handleDrawerClose} to='/docs' primary={t('Docs')} icon={<BookIcon />} />
              <ListItemLink handleDrawerClose={props.handleDrawerClose} to='/reachout' primary={t('Talk with Us!')} icon={<ChatIcon />} />
              <ListItemLink handleDrawerClose={props.handleDrawerClose} to='/cloud/as-a-service' primary={t('Cloud')} icon={<CloudIcon />} />
              <CollapsedNavigation handleDrawerClose={props.handleDrawerClose} heading={t('Resources')} headingIcon={<AppsIcon />} routes={resourceRoutes} />
            </List>
          </Paper>
        }
      </Translation>
    </div>
  )
}

function CollapsedNavigation (props) {
  const { headingIcon, heading, routes } = props
  const [open, setOpen] = React.useState(true)
  const classes = useStyles()

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <Translation ns='pagelinks'>
        {(t) =>
          <>
            <ListItem button onClick={handleClick}>
              {headingIcon ? <ListItemIcon>{headingIcon}</ListItemIcon> : null}
              <ListItemText primary={heading} />
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {routes ? routes.map((route, index) =>
                  <ListItemLink
                    handleDrawerClose={props.handleDrawerClose}
                    key={route.name + index}
                    className={classes.nested}
                    to={route.path}
                    icon={route.icon()}
                    primary={t(`${route.name}`)}
                  />) : null}
              </List>
            </Collapse>
          </>
        }
      </Translation>
    </>
  )
}

const resourceRoutes = [
  {
    path: '/docudio/examples',
    name: 'Examples',
    icon: () => <PublicIcon />
  },
  {
    path: '/blog',
    name: 'Blog',
    icon: () => <DescriptionIcon />
  },
  {
    path: '/docudio/github',
    name: 'Github',
    icon: () => <GitHubIcon />
  }

]

PageLinks.getInitialProps = async () => ({
  namespacesRequired: ['pagelinks']
})

export default withTranslation('pagelinks')(PageLinks)
