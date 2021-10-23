import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px 50px',
    },
    title: {
        position: 'left',
    },
    button: {
        color: '#fff',
        position: 'right'
    }
}));