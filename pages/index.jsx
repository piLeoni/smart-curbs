import { Grid, Box, Stack, Divider, ButtonBase, Button } from '@mui/material';
import HBlock from "../components/HBlock"
import { useState, useEffect } from 'react';
import FullBodyHeight from '../components/FullBodyHeight'
// import Player from '../components/Player';

export default function Home(props) {


  const [mainAreaHeight, setMainAreaHeight] = useState('100vh');

  function navigate(input){
    window.open(input, 'blank');
  }
  useEffect(() => {
    const topBarHeight = document.getElementsByClassName('MuiAppBar-root')[0].clientHeight;
    setMainAreaHeight(`${(window.innerHeight) - topBarHeight}px`);

  }, [])
  return (
    <>
      {/* <HBlock> */}
      <FullBodyHeight>
        <Box sx={
          {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            typography: { xs: 'h3', sm: 'h2', xl: 'h2' },
            fontWeight: "bold!important",
            mb: 1,
            pb: 1,
            color: 'secondary.main'
          }}>
          {/* {document.getElementsByTagName('header').offsetHeight} */}
          <Box sx={{ display: 'block', width: { xs: '90vw', md: '20ch' }, mx: '5' }} >
            {props.intro.title}

          </Box>

        </Box>
      </FullBodyHeight>
      {/* </HBlock> */}

      {/* <Player url="https://www.youtube.com/embed/-AC8p0AAG9Y"/> */}

      <video width="100%"
        controls
        autoPlay
        muted
        poster={process.env.NEXT_PUBLIC_BASE_PATH + '/video/map_keyframe.jpg'}>
        <source src={process.env.NEXT_PUBLIC_BASE_PATH + '/video/ratp_video.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <HBlock >



        <Box sx={{ py: 3 }}>

          <Box sx={{ typography: 'h5', fontWeight: 'bold', color: 'secondary.main', }}>Credits:</Box>

          <Box sx={{ my: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

            <Stack direction={{ xs: 'column', sm: 'row' }}
              sx={{ mb: { xs: 3, md: 0 } }}
              spacing={{ xs: 3, sm: 6 }}>

              <Box >
                <Box sx={{ typography: 'h6', color: 'secondary.main', mb: 1 }}> {props.credits[0].institution}</Box>
                {props.credits[0].team.map(member => <Box sx={{ whiteSpace: 'nowrap' }} key={member}>{member}</Box>)}
              </Box>
              <Box >
                <Box sx={{ typography: 'h6', color: 'secondary.main', mb: 1 }}> {props.credits[1].institution}</Box>
                {props.credits[1].team.map(member => <Box sx={{ whiteSpace: 'nowrap' }} key={member}>{member}</Box>)}
              </Box>
            </Stack>


            <Divider orientation="vertical" flexItem sx={{ mx: 5 }} />


            <Stack>
              <Box sx={{ typography: 'h6', color: 'secondary.main', mb: 1 }}>Papers</Box>
              {props.papers.map((paper, index) => (
                <Box key={`paper-${index}`} sx={{ mb: 2 }}>
                  <ButtonBase onClick={() => navigate(paper.link)}>
                    <Box sx={{ textAlign: 'left' }}>
                      <Box sx={{ typography: 'body2', fontWeight: 'regular', lineHeight: 1.25, textTransform: 'capitalize' }}>{paper.journal}</Box>
                      <Box sx={{ typography: 'body1', fontWeight: 'medium', lineHeight: 1.25 }}>{paper.title}</Box>
                      <Box sx={{ typography: 'body2', fontWeight: 'light' }}>{paper.authors}</Box>
                    </Box>
                  </ButtonBase>
                </Box>
              ))}

              <Box sx={{ typography: 'body2' }}>
                The material on this website can be used freely in any publication provided that:<br />
                1. It is duly credited as a project by the MIT Senseable City Lab<br />
                2. A PDF copy of the publication is sent to  <b><a href='mailto:senseable-press@mit.edu'>senseable-press@mit.edu</a></b> <br /><br/>
                Contact: More information: <a href='mailto:senseable-contacts@mit.edu'>senseable-contacts@mit.edu</a>
              </Box>
              <Box>

                <Button variant="outlined" sx={{ my: 2, display: 'inline-block!important' }} >download press material</Button>
              </Box>

            </Stack>

          </Box>



        </Box>

      </HBlock>

    </>
  )
}


export async function getStaticProps(context) {
  const contents = (await import('../contents/index.js')).default
  return {
    props: {
      intro: contents.pages.index.intro,
      credits: contents.pages.index.credits,
      papers: contents.pages.index.papers

    },
  }
}
