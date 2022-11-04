import { DialogContentText} from '@mui/material';
import * as React from 'react';
import { Button, Container, Dialog, DialogTitle } from '../../../ui-kit';
import './FeedBackDialog.css';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

function FeedBackDialog() {

    const [valueRating, setValueRating] = React.useState<number | null>();

    const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
          color: theme.palette.action.disabled,
        },
      }));
    
      const customIcons: {
        [index: string]: {
          icon: React.ReactElement;
          label: string;
        };
      } = {
        1: {
          icon: <SentimentVeryDissatisfiedIcon color="error" />,
          label: 'Very Dissatisfied',
        },
        2: {
          icon: <SentimentDissatisfiedIcon color="error" />,
          label: 'Dissatisfied',
        },
        3: {
          icon: <SentimentSatisfiedIcon color="warning" />,
          label: 'Neutral',
        },
        4: {
          icon: <SentimentSatisfiedAltIcon color="success" />,
          label: 'Satisfied',
        },
        5: {
          icon: <SentimentVerySatisfiedIcon color="success" />,
          label: 'Very Satisfied',
        },
      };
      
      function IconContainer(props: IconContainerProps) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
      }

    return (
        <Dialog fullWidth={true} open={true}>
            <DialogTitle>
                Avis du jour
            </DialogTitle>
            <Container>
                <DialogContentText>Comment s'est passée votre journée ?</DialogContentText>
                <StyledRating
                    name="highlight-selected-only"
                    onChange={(event, newValue) => {
                        setValueRating(newValue);
                    }}
                    value={valueRating}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value: number) => customIcons[value].label}
                    highlightSelectedOnly
                />
            </Container>
            <Container>
                <Button variant="contained" color="secondary">Envoyer</Button>
            </Container>
        </Dialog>
    );
}

export default FeedBackDialog;