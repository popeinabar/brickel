import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./Search.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const timingf = props.timingf;
  const subjectf = props.subjectf;
  const topicf = props.topicf;
  const data=props.data;
  const isTeachingf=props.isTeachingf;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    data
    .filter((user)=>{
      const timing = isTeachingf ? user.LTiming : user.TTiming;
      const subjects = isTeachingf
        ? user.LSubject
        : user.TSubject;
      const topics = isTeachingf ? user.LTopic : user.TTopic;

      if (timingf === "" && subjectf === "" && topicf === "") {
        return true;
      } else if (
        timing.toLowerCase().includes(timingf) &&
        subjects.some((subject) =>
          subject.toLowerCase().includes(subjectf)
        ) &&
        topics.some((topic) => topic.toLowerCase().includes(topicf))
      ) {
        return true;
      }

      return false;
    })
    .map((user,key)=>(
      
      <Card sx={{ maxWidth: 345 }} key={key} className='mui-card'>
      <CardHeader
        action={
          <IconButton aria-label="settings">
           
          </IconButton>
        }
        title={user.Name}
      />
      <CardMedia
        component="img"
        height="294"
        image={user.Image.url}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {props.subject}:{" "}
                {isTeachingf
                  ? user.LSubject.map((item) => `${item.subject}`).join(", ")
                  : user.TSubject.map((item) => `${item.subject}`).join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.topic}:{" "}
                {isTeachingf
                  ? user.LTopic.map((item) => `${item.Chapter}`).join(", ")
                  : user.TTopic.map((item) => `${item.Chapter}`).join(", ")}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
       
        <Button variant="contained">Connect
        <a href={"mailto:" + user?.Email}>

        </a>
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {props.timing}: {isTeachingf ? user.LTiming : user.TTiming}{" "}
          </Typography>
          <Typography paragraph>
          {props.occupation}: {user.Occupation}
          </Typography>
          <Typography paragraph>
          {props.impression}: {user.Impression}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>


    ))
   
  );
}
