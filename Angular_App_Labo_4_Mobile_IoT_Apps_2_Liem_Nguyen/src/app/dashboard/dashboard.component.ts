import { Component, OnInit } from '@angular/core';
import * as localforage from 'localforage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  async ngOnInit() {

    var response;
    let ip = await localforage.getItem('ip');

    fetch('https://' + ip + ':1880/connect', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "test"
    })
      .then(status => response = status)

    var status1 = document.getElementById("connectStatus1");
    var status2 = document.getElementById("connectStatus2");
    
    if(response == "OK")
    {
      console.log("Connection is OK.");
      status1.innerHTML = "OK";
      status2.innerHTML = "Connected to " + ip;
    }
    else
    {
      console.log("Connection is NOT OK.");
      status1.innerHTML = "Not OK";
      status2.innerHTML = "<i class=\"material-icons\">warning</i> Please check pi profile."
    }
  }

  public async toggleLed1() {

    let ip = await localforage.getItem('ip');

    fetch('https://' + ip + ':1880/leds', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "1"
    })
    .then(log => console.log(log))
  }

  public async toggleLed2() {

    let ip = await localforage.getItem('ip');

    fetch('https://' + ip + ':1880/leds', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "2"
    })
    .then(log => console.log(log))
  }

  public async toggleLed3() {

    let ip = await localforage.getItem('ip');

    fetch('https://' + ip + ':1880/leds', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "3"
    })
    .then(log => console.log(log))
  }

  public async toggleLed4() {

    let ip = await localforage.getItem('ip');

    fetch('https://' + ip + ':1880/leds', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "4"
    })
    .then(log => console.log(log))
  }

}
