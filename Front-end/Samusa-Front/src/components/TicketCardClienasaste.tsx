import "../Css/User/Dashboardcard.css"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const varPerfil = sessionStorage.getItem('foto');

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  const CardsTickets = ({ ticket }) => {
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    return (
      <Card sx={{ maxWidth: 345 }} className="p-4 m-4">
      <CardHeader
        avatar={
          <Avatar src={varPerfil} aria-label="recipe">
            
          </Avatar>
        }
        
        title={"Id del ticket: "+ ticket.id}
        subheader={"Prioridad del Ticket: "+ticket.prioridad}
      />
      <CardContent>
        Estado del caso: {ticket.estado}
      </CardContent>
      <CardActions disableSpacing>
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
          <Typography  className="testmonial-body">
            <p >Descripción: {ticket.descripcion}</p>
            <div className="testmonial-body::after"></div>
          </Typography>
          <Typography  className="testmonial-body">
            <p >Respuesta: {ticket.respuesta}</p>
            <div className="testmonial-body::after"></div>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
     
    );
  }
export default  CardsTickets;


// const CardsTickets = ({ ticket }) => {
//     return (
//         <div className="card testimonial-card bg-white shadow-xl rounded p-4 m-4">
//             <h1 class="testmonial-title">Seguimiento #{ticket.id}</h1>
//             <h2 class="testmonial-subtitle">Prioridad: {ticket.prioridad}</h2>
//             <p>{ticket.estado}</p>
//             <div className="testmonial-body">
//                 <p >{ticket.descripcion}</p>
//                 <div className="testmonial-body::after"></div>
//             </div>
            
            
            
            
//         </div>
//     );
// };

// export default CardsTickets;
