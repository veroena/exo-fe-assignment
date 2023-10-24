import { AppBar, Typography } from '@mui/material'

export const Header = ({title}: {title: string}) => {
  return (
    <header>
      <AppBar position="relative" sx={{backgroundColor: '#171E2B', color: 'white', padding: '10px 20px'}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </AppBar>
    </header>
  )
}
