import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CardHeader } from "@mui/material";
import { format } from 'date-fns';

const RapidMediaDisplays = (props) => {
  const { userData } = props;

  return (
    <Grid container spacing={1} justifyContent="center">
      {
        userData?.map((item, index) => (
          <Grid item key={index} xs={12} sm={4}>
            <Card sx={{ maxWidth: 600, margin: "auto" }}>
              <CardHeader
                title={item?.media?.user.full_name}
                subheader={format(new Date(item?.media?.caption?.created_at * 1000), "MMM dd, yyyy")}
              />
              <CardMedia
                component={'video'}
                controls
                height="300"
                src={item?.media.video_versions[0].url}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    URL: {item?.media?.url}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      ♥ {item?.media?.like_count}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      💬 {item?.media?.comment_count}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      👁️ {item?.media?.play_count ?? '-'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

        ))
      }
    </Grid>
  );
};

export default RapidMediaDisplays;
