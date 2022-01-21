import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

function ProfileForm({user, type, setUser}) {

    const navigate = useNavigate()

    const [photo, setPhoto] = useState("")
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        "user_id": user.id,
        bio: "",
        age: "",
        size: "",
        location: "",
        personality: ""
    })

    useEffect(() => {
        if (type === "edit") {
            fetch(`/profiles/${user.id}`)
                .then(resp => resp.json())
                .then(setFormData)
            }
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };
    

  const handleProfile = (e) => {

    // if (type === "edit") {
        e.preventDefault()
            fetch(`/profiles/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(resp => resp.json())
            .then(profile => {
                 {
                    fetch('/photos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "profile_id": profile.id,
                            'image': photo
                        })
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        fetch(`/users/${user.id}`)
                        .then(resp => resp.json())
                        .then(user => {
                            setUser(user)
                        })
                    })
                }
            })
            
        
    // } else {
    //     e.preventDefault()
    //     fetch('/profiles', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //     .then(resp => resp.json())
    //     .then(profile => {
    //         if (photo !== "") {
    //             fetch('/photos', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     "profile_id": profile.id,
    //                     'image': photo
    //                 })
    //             })
    //         }

            
            
    //         fetch(`/users/${user.id}`)
    //             .then(resp => resp.json())
    //             .then(user => {
    //                 console.log(user)
    //                 // setUser(user)
    //                 // navigate('/home')
    //             })

    // })
    

    // }
  }

  return (
    <div>
    <form onSubmit={(e) => handleProfile(e)}>
      <label htmlFor="bio">Bio</label>
      <input
        type="text"
        name="bio"
        autoComplete="off"
        value={formData.bio}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="age">Age</label>
      <input
        type="text"
        name="age"
        autoComplete="off"
        value={formData.age}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="size">Size</label>
      <input
        type="text"
        name="size"
        autoComplete="off"
        value={formData.size}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        autoComplete="off"
        value={formData.location}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="personality">Personality</label>
      <input
        type="text"
        name="personality"
        autoComplete="off"
        value={formData.personality}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="photo">Photo</label>
      <input
        type="text"
        id="photo"
        autoComplete="off"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <button type="submit">
        {type === "edit" ? "Edit Profile" : "Create Profile"}
      </button>
      {errors.map((err) => (
        <div key={err}>{err}</div>
      ))}
    </form>
    </div>
  );
}

export default ProfileForm;
