import {useState} from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import styled from 'styled-components'

function PreferenceForm({user, setPreferenceClick}) {
  
    const [formData, setFormData] = useState({
        "user_id": user.id,
        size: '',
        distance: '',
        personality: ''
    })
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };

    const preferenceFetch = (obj, type, id = '') => {
        fetch(`/preferences/${id}`, {
            method: type,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...obj, id: user.id})
        })
        .then(resp => resp.json())
        .then(console.log)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.preference) {
            preferenceFetch(formData, 'POST')
        } else {
            preferenceFetch(formData, 'PATCH', user.preference.id)
        }
        setPreferenceClick(false)
    }
    // next steps: 
        // auto populate form with existing preferences
        // add ability to clear preferences
        // filter users based on preferences


    const sizeOptions = ['Tiny', 'Small', 'Medium', 'Large', 'Huge']
    const personalityOptions = ['Timid', 'Lazy', 'Calm', 'Outgoing', 'Independent']
  
    return (
    <ProfileFormStyle>
        <div className="preference-edit">
            <Paper elevation={4} variant="outlined">
                <IconButton type="button" className="cancel-button" size="large">
                    <CancelIcon onClick={() => setPreferenceClick(false)}/>
                </IconButton>
                <form onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    label="Max Distance (miles)"
                    type="number"
                    name="distance"
                    min="0"
                    max="100"
                    value={formData.distance}
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    />
                <TextField
                    select
                    label="Size"
                    name="size" 
                    id="size" 
                    value={formData.size} 
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                >
                    {sizeOptions.map((size) => {
                        return (
                            <MenuItem key={size} value={size}>
                            {size}
                            </MenuItem>
                        )
                    })}
                </TextField>
                <TextField
                    select
                    label="Personality"
                    type="text"
                    name="personality"
                    value={formData.personality}
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                >
                    {personalityOptions.map((size) => {
                        return (
                            <MenuItem key={size} value={size}>
                            {size}
                            </MenuItem>
                        )
                    })}
                </TextField>
                {errors.map((err) => (
                    <Alert severity="error" key={err}>{err}</Alert>
                ))}
                <Button type="submit" variant="contained" color="primary">
                    Edit Preferences
                </Button>
                </form>
            </Paper>
        </div>
    </ProfileFormStyle>
  )
}

export default PreferenceForm

const ProfileFormStyle = styled.div`

    position: relative;
    top: 3.5em;
    width: 60%;
    margin: auto;

  form {
    margin: auto;
    width: 80%;
    margin-bottom: 1em;
    margin-top: 2.5em;
  }

  form > div {
      margin: 0.5em 1em 0.5em 1em;
      width: 35%;
  }

  form > button {
      display: block;
      margin: 1em auto 1.5em auto;
  }

  .form-separator {
    display: flex;
    justify-content: space-between;
  }

  .form-separator > div {
      width: 25%;
  }

  .profile-edit:first-child {
    margin: auto;
    width: 60%;
  }

  .cancel-button {
    float: right;
    margin: 0.15em;
  }

  .button-holder {
    text-align: center;
  }

  .location-alert {
    display: inline-block;
    position: relative;
    top: 1.75em;
    margin: auto;
    width: 100%;
    text-align: center;
    font-family: Roboto;
    color: #7b7b7b;
  }

  @media screen and (max-width: 480px) {
        
        top: 1em;
        
        .profile-edit:first-child {
            width: 95% !important;
        }
        form {
            text-align: center;
        }
        form > div {
            width: 100% !important;
            margin: auto;
            margin-bottom: 0.5em;
        }
    }

`