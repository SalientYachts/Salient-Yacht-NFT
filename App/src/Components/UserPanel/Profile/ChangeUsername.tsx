import { TextInput, TextInputProps, ActionIcon, useMantineTheme, Button } from '@mantine/core';
import { useForceUpdate } from '@mantine/hooks';
import axios from 'axios';
import * as React from 'react' 
import { useState } from 'react';
import { BsArrowRightCircle } from 'react-icons/bs';
import { RiUserSettingsLine, } from 'react-icons/ri';
import Swal from 'sweetalert2';

const API_URL = "https://app.salientyachts.com"


export default function ChangeUsername({ setOpened, setUsername }: any) {
  
  const forceUpdate = useForceUpdate();
  const theme = useMantineTheme();
  const [processing, setprocessing] = useState(false);
  const [data, setData]: any = useState({
    username: '',
  })

  const handleSubmit = async (e: any) => {
        
    forceUpdate()
    const token = localStorage.getItem('SYtoken');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    e.preventDefault();
    setprocessing(true)
    //console.log(data)
    try {
      const response = await axios.post(
        `${API_URL}/changeusername`
        , data
        , { headers: headers })
      
      if (response.data.success === true) {
        console.log("You have changed your Username")
        Swal.fire({
          icon: 'success',
          title: 'Done!',
          text: 'You have changed your Username',
          timer: 3000,
          timerProgressBar: true,
        })
        setUsername(data.username)
        setprocessing(false);
        setOpened(false);
      } 

    }catch (err) {

      if (!err?.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No Server Response',
          footer: 'Please try again!'
        })
      }
      else if (err.response?.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.errors[0].message,
          footer: 'Please try again!'
        })
      }
      else if (err.response?.status === 422) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.errors[0].message,
          footer: 'Please try again!'
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "There was an Error changing your username",
          footer: 'Please try again!',
          timer: 3000,
          timerProgressBar: true,
        })
      }
      
      setprocessing(false)
      setOpened(false);
    }
  }


  return (
    <TextInput
      icon={<RiUserSettingsLine size={18} color='white' />}
      radius="xl"
      size="md"
      maxLength={22}
      onChange={e => setData({ ...data, username: e.target.value })}
      value={data.username}
      placeholder="New Username"
      rightSectionWidth={105}
      rightSection={
        <Button
          leftIcon={<BsArrowRightCircle size={18} />}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          onClick={(e: any) => handleSubmit(e)}
          loading={processing}
        >


          SAVE

        </Button>
      }
      
    />
  );
}