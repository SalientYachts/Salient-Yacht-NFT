

import * as React from 'react'
import { useEffect, useState } from 'react'
import { HiClipboardCheck, HiClipboardCopy } from 'react-icons/hi'
import { FiShare2 } from 'react-icons/fi'
import { CopyButton, Button, Input, Box } from '@mantine/core';




export default function ReferralClipboard({ ref_id, source = 'direct' }: {
  ref_id: any
  source: any
}) {

  const [value, setValue] = useState('')


  useEffect(() => {
    
    setValue(`${window?.location.protocol}//${window?.location.hostname}/invite?src=${source}&ref=${ref_id}`)

  }, [source])


  return (
    <>
      <Box mb={2} sx={{
        width: '100%', display: 'flex', alignItems: 'center',
        flexDirection: 'row',
      }}  >

        <Input value={value}
          icon={<FiShare2 />}
          readOnly
          placeholder=''
          radius="lg"
          size="md"
          sx={{ width: '100%', }}
        />

        <CopyButton
          value={value}
          timeout={3000}

        >
          {({ copied, copy }) => (
            <Button sx={{ marginLeft: '25px', }}
              radius="xl"
              leftIcon={copied ? <HiClipboardCheck size={16} /> : <HiClipboardCopy size={16} />}
              color={copied ? 'teal' : 'blue'} onClick={copy}>
              {copied ? 'Done ' : 'Copy'}

            </Button>
          )}
        </CopyButton>

      </Box>
    </>
  )
}
