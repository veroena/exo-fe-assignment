import { useState } from "react"
import { TextField } from "@mui/material"

export const SearchInput = ({ onChangeCallback, label }: {onChangeCallback : (searchTerm: string) => void, label: string}) => {
  const [value, setValue] = useState<string>('')
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue)
    onChangeCallback && onChangeCallback(inputValue)
  }

  return(
    <TextField
      id="outlined-basic"
      label={label}
      value={value}
      onChange={handleChange}
      size="small"
      sx={{margin: '10px 0', input: { color: 'white' }}}
      InputLabelProps={{
        sx: {
          '&:focus-within fieldset, &:focus-visible fieldset': {
            border: '4px solid red!important',
          },
          color: 'white'
        },
      }}
    />
  )
}
