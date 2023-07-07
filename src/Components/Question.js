import React from 'react'
import Box from '@mui/material/Box';
// import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

function Question(props) {
    const choices = props.choices
    let options = {}
    for( let i=0;i<choices.length;i++)
    {
        options[choices[i]]=false
    }
    const [state, setState] = React.useState(options);
    // const [ temp , setTemp] = React.useState(props.choices)
      const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };
    
    //   const { gilad, jason, antoine } = state;
    //   const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <div>
       <h3>Question : {props.name}</h3> 
       <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
        <FormGroup>
            {
                choices.map((choice)=>{
                    return <FormControlLabel
                    control={
                      <Checkbox checked={state[{choice}]} onChange={handleChange} name={choice} />
                    }
                    label={choice}
                  />
                })
            }
          {/* <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name={choices[0]} />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          /> */}
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
      
    </Box>
    </div>
  )
}

export default Question;