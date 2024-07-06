import React, { useEffect, useState } from 'react'
import {Card,Box,Flex,Stack,Input,Text,Button, CardHeader, CardBody, FormLabel, FormControl} from '@chakra-ui/react';

const Shipping = ({address,setAddress}) => {

  const [editAddress,setEditAddress]=useState(false);
  return (
    <>
        <Card m="2rem">
            <CardHeader as="b" fontSize="24px" pb="0">
              Ship to:
            </CardHeader>
            <CardBody>
              <FormControl>
                {['room','floor','hostel','contact_number'].map((field)=>(
                  <>
                  <FormLabel mb="0">{field.toUpperCase()}</FormLabel>
                    <Input placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                      value={address[field]}
                      onChange={(e)=>setAddress({...address,[field]:e.target.value})}
                      readOnly={!editAddress}
                      mb="1rem"
                      variant={editAddress ?"outline" :'filled'}
                      borderColor={editAddress?'teal':'white'}
                      style={{ pointerEvents: editAddress ? 'auto' : 'none' }}
                    />
                  </>
                ))}
                
               <Button onClick={() => setEditAddress(!editAddress)} mt={4} colorScheme="blue">
                  {editAddress ? 'Save' : 'Edit'}
               </Button>
              </FormControl>                
            </CardBody>
        </Card>
    </>
  )
}

export default Shipping;