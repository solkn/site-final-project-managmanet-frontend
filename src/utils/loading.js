import Iconify from '../components/Iconify';

const style = {
    textAlign: 'center',
    top: '50%',
    left: '50%',
    translate: 'transform(-50%, -50%)'
}

export const Loading = () => {
    return (
        <div style={style}>
            <Iconify icon="eos-icons:bubble-loading" sx={{width: 60, height: 60}} />
        </div>
    );
};