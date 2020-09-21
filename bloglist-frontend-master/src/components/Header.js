import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Typography from '@material-ui/core/Typography'

const Header = ({user, logout}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        main: {
            [theme.breakpoints.down("xs")]: {
                flexGrow: 1
            }
        },
        info: {
            fontSize: 'small'
        },
        appBarContainer: {
            marginBottom: 12
        },
        collapsible: {
            [theme.breakpoints.down("xs")]: {
                display: "none"
            }
        },
        menu: {
            flexGrow: 1,
            paddingTop: 3
        }
    }))

    const classes = useStyles()

    const [anchorMenu, setAnchorMenu] = useState(null);
    const openMenu = Boolean(anchorMenu)

    const [anchorDrawer, setAnchorDrawer] = useState(null);
    const openDrawer = Boolean(anchorDrawer)

    const handleMenu = (event) => {
        setAnchorMenu(event.currentTarget)
    };
    
    const handleCloseMenu = () => {
        setAnchorMenu(null)
    }

    const handleDrawer = (event) => {
        setAnchorDrawer(event.currentTarget)
    };
    
    const handleCloseDrawer = () => {
        setAnchorDrawer(null)
    }

    return (
        <div className={classes.appBarContainer}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true" onClick={handleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorDrawer}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        open={openDrawer}
                        onClose={handleCloseDrawer}
                    >
                        <MenuItem component={Link} href="/">Blogs</MenuItem>
                        <MenuItem component={Link} href="/users">Users</MenuItem>
                    </Menu>
                    <Typography variant="h6" className={classes.main}>
                        Blog App
                    </Typography>                    
                    <div className={`${classes.collapsible} ${classes.menu}`}>
                        <Button color="inherit" href="/">
                            blogs
                        </Button>
                        <Button color="inherit" href="/users">
                            users
                        </Button>
                    </div>   
                    {user
                        ? <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-user"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleMenu}
                            >
                                <AccountCircle />
                                <span className={`${classes.info} ${classes.collapsible}`}>{user.name}</span>
                            </IconButton>
                            <Menu
                                id="menu-user"
                                anchorEl={anchorMenu}
                                getContentAnchorEl={null}
                                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                transformOrigin={{ vertical: "top", horizontal: "center" }}
                                open={openMenu}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                          </div>
                        : <Button color="inherit" component={Link} to="/login">login</Button>
                    }                         
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header