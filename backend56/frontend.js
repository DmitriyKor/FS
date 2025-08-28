import io from 'socket.io-client';

const socket = io.connect('http:/localhost:3000');

const sendMessage = async () => {
    socket.emit('myEvent1', {'id':33, 'name':'John'});
}

const Component = ()=>{

const [receiveMessage, setReceiveMessage] = useState();

useEffect(()=>{
    socket.on('respondToMyEvent1', (data)=>{
        setReceiveMessage(data);
    })

    return ()=> {
        socket.off('myEvent1');
    }

}, [])//once

return (
    <>

    </>
)

}