import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux'
import { setAlertMsg } from '../../redux/actions/alert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(5),
    },
    position: 'fixed',
    left: '50%',
    bottom: 20,
    transform: 'translate(-50%, -50%)'
  },
}));

const CustomAlert = () => {
  const classes = useStyles();
  const alert = useSelector(state => state.alert)
  const dispatch = useDispatch();

  console.log(alert)
  return (
    <div className={classes.root}>
        <Collapse in={alert.msg !== ''}>
            <Alert
                severity={alert.type} 
                onClose={() => {dispatch(setAlertMsg('', 'success'))}}
            >
                {alert.msg}
            </Alert>

        </Collapse>
    </div>
  );
}
export default CustomAlert
