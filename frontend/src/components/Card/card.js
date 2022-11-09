import { Card,  CardMedia, CardContent, Typography, Button, CardActions} from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export const NFTCard = () => {

  return (
    <div className="main">
        <Card sx={{ maxWidth: 700 }} className="card">
          <CardMedia
            component="img"
            src="https://gateway.pinata.cloud/ipfs/QmbPqm8vPuQFnRLw1CJoMnLUeMyfiJqHVKioXEV79KHCjz"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              fontStyle="italic"
            >
              Chaichai
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              <TwitterIcon />
            </Button>
            <Button size="small" color="primary">
              <InstagramIcon />
            </Button>
          </CardActions>
        </Card>
    </div>
  );
}