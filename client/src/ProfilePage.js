import React, { useState } from "react";
import FullProfileCard from "./FullProfileCard";
import ProfileForm from "./ProfileForm";
import PreferenceForm from "./PreferenceForm";
import Button from "@mui/material/Button";
import styled from "styled-components";

function ProfilePage({ user, setUser }) {
  const [editClick, setEditClick] = useState(false);
  const [preferenceClick, setPreferenceClick] = useState(false);

  return (
    <div>
      {editClick ? (
        <ProfileForm
          user={user}
          type="edit"
          setUser={setUser}
          setEditClick={setEditClick}
        />
      ) : null}
      {!editClick && !preferenceClick ? (
        <ButtonStyle>
          <Button
            type="button"
            variant="contained"
            onClick={() => setEditClick(true)}
          >
            Edit Profile
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => setPreferenceClick(true)}
          >
            Edit Preferences
          </Button>
          <FullProfileCard user={user} />
        </ButtonStyle>
      ) : null}
      {preferenceClick ? (
        <PreferenceForm user={user} setPreferenceClick={setPreferenceClick}/>
      ) : null
      }
    </div>
  );
}

export default ProfilePage;

const ButtonStyle = styled.div`
  button {
    margin: 0.5em 1em 0.5em 1em;
  }
`;
