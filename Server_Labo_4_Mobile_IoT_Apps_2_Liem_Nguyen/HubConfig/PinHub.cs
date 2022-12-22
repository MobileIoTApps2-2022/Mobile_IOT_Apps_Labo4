using Microsoft.AspNetCore.SignalR;
using TodoApi.Models;

namespace TodoApi.HubConfig
{
    public class PinHub : Hub
    {
        public async Task BroadcastChartData(int<PinStatus> status) => 
            await Clients.All.SendAsync("pinStatus", data);
    }
}
