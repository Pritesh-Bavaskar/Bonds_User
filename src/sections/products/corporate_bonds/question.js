import { bgcolor, borderRadius, Box, fontFamily, fontWeight } from '@mui/system'
import react from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import arrow2 from 'src/images/svg/arrow2.svg';


export default function QuestionAnswer() {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            mx: 'auto',
            alignItems: 'center',
            maxWidth: '888px',
            height: '70vh',

        }}>

            <Typography sx={{
                fontSize: {xs:'35px', md:'48px'},
                fontWeight: '700',
                fontFamily: 'public sans',
                color: 'primary.main',
                mb: 3

            }}
            >
                Have Questions?
            </Typography>

            <Typography sx={{
                fontSize: '20px',
                fontWeight: '400',
                fontFamily: 'public sans',
                textAlign: 'center',
                mb: 8

            }}
            >
                Explore our comprehensive FAQ section to learn more about corporate bond investments, processes, and requirements.
            </Typography>
            <Button
                sx={{
                    borderRadius: '0px',
                    border: '1px solid ',
                    borderColor: 'primary.main',
                    width: '146px',
                    height: '34px',
                    gap: 1,
                }}>
                View FAQ
                <Box
                    component='Img'
                    src={arrow2}
                    alt='arrow'
                    sx={{
                        width: '15px', height: '15px',
                    }} />
            </Button>
        </Box>


    )


}