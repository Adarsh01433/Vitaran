

interface TCPContextType {
    server : any;
    client : any;
    isConnected : boolean;
    connectedDevice : any;
    sendFiles : any;
    recievedFiles : any;
    totalSentBytes : number;
    startServer:(port : number)=> void;
    connectToServer : (host: string, port : number, deviceName : string)=> void;
    sendMessage : (message : string | Buffer)=> void;
    sendFileAck: (file: any, type :'file' | 'image')=> void;
    disconnect:()=> void;
}