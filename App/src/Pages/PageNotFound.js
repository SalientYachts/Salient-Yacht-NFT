import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, Paper, Box } from '@mantine/core';
import { Link as RouterLink } from 'react-router-dom';
import image from './image.svg';


export default function PageNotFound() {






    return (

        <div className="mainContainer">
            <Container sx={{ maxWidth: "none" }}>
                <Paper withBorder p="md" pb={20} my={30} radius="xl" sx={{
                    boxShadow: "1px -1px 12px 3px #0cfbf8",
                    position: 'relative', backgroundColor: '#25262b',
                }}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-around',
                    }}>
                        <Title >Something is not right...</Title>
                        <SimpleGrid spacing={80} cols={2} sx={{alignItems: 'center'}}>
                            <Image src={image} />
                            <div>

                                <Title >Have you found our secret place?</Title>
                                <Text color="dimmed" size="lg">
                                    Page you are trying to open does not exist. You may have mistyped the address, or the
                                    page has been moved to another URL. If you think this is an error contact support.
                                </Text>
                                <Button
                                    component={RouterLink}
                                    to="/"
                                    variant="gradient"
                                    gradient={{ from: 'pink', to: 'yellow' }}
                                    size="xl"
                                    mt={20}
                                >
                                    Get back to home page
                                </Button>
                            </div>
                            <Image src={image.src} />
                        </SimpleGrid>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}