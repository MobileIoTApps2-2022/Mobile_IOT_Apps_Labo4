@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public data;
  private hubConnection: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:5001/pin')
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    
    public addPinStatusListener = () => {
      this.hubConnection.on('PinStatus', (data) => {
        this.data = data;
        console.log(data);
      });
    }
}