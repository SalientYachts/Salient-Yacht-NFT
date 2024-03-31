import * as React from 'react' 
import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { Card, Button, Text, Group } from '@mantine/core';
// import "./my-node.css";







const propTypes = {
  nodeData: PropTypes.object.isRequired
};
//@ts-ignore
const MyNode = ({ nodeData }) => {
  const selectNode = () => {
    // alert('Ref ID: '+nodeData.ref_id);
    window.location.href = `/admin/user/${nodeData.id}`
  };

  const [rank, setRank]: any = useState("Standard Broker")

  useEffect(() => {

    nodeData.package_id == 1 ? setRank("Standard Broker")
      : nodeData.package_id == 2 ? setRank("Silver Broker")
        : nodeData.package_id == 3 ? setRank("Golden Broker")
          : nodeData.package_id == 4 && setRank("Epic Broker")

  }, [])

  return (
    <div>

      <Card mx={20} shadow="lg" p={0} radius="lg" withBorder className="position"
        sx={{
          height: '126px !important', width: '180px !important',
          boxShadow: '0px 0px 0px 2px #0cfbf8',
          '&:hover': { transform: 'scale(1.1)', }
        }}>
        <Text align="center" size="md" weight={800} mt={10} mb={5}>
          {nodeData.name}
        </Text>


        {nodeData.package_id == 1 ?  // Standard Broker
          <Button style={{
            width: "170px",
            padding: '5px',
            marginTop: '5px',
            marginBottom: '5px',
            color: 'black',
            borderRadius: '40px',
            backgroundColor: '#0288d1',
            boxShadow: '0 0px 15px #0288d1',
          }}>
            {rank}
          </Button>

          : nodeData.package_id == 2 ? //Silver Broker
            <Button style={{
              width: "170px",
              padding: '5px',
              marginTop: '5px',
              marginBottom: '5px',
              fontWeight: '500',
              color: 'black',
              borderRadius: '40px',
              backgroundColor: '#388e3c',
              boxShadow: '0 0px 15px #388e3c',
            }}>
              {rank}
            </Button>

            : nodeData.package_id == 3 ?   // Gold Broker
              <Button style={{
                width: "170px",
                padding: '5px',
                marginTop: '5px',
                marginBottom: '5px',
                fontWeight: '700',
                color: 'black',
                borderRadius: '40px',
                backgroundColor: '#ffca28',
                boxShadow: '0 0px 15px #ffca28',
              }}>
                {rank}
              </Button>

              : nodeData.package_id == 4 ?   //Epic Broker
                <Button style={{
                  width: "170px",
                  padding: '5px',
                  marginTop: '5px',
                  marginBottom: '5px',
                  fontWeight: '900',
                  color: 'black',
                  borderRadius: '40px',
                  backgroundColor: '#9575cd',
                  boxShadow: '0 0px 15px #9575cd',
                }}>
                  {rank}
                </Button>

                :  //standard card
                <Button variant="outline" style={{
                  width: "170px",
                  padding: '5px',
                  marginTop: '5px',
                  marginBottom: '5px',
                  fontWeight: '600',
                  borderRadius: '40px',
                  boxShadow: '0 0px 10px #0cfbf8',
                }}>
                  {rank}
                </Button>
        }

        <Group sx={{ display: 'inline-flex', marginTop: '6px', }}>
          <Text align="center" color="dimmed" size="sm">
            Ref:
          </Text>
          <Text align="center" color="dimmed" size="sm">
            {nodeData.ref_id}
          </Text>
        </Group>
      </Card>




    </div >


  );
};

MyNode.propTypes = propTypes;

export default MyNode;
