import { Component, OnInit } from '@angular/core';
import * as localforage from 'localforage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public model = { ip:""};

  async ngOnInit():  Promise<void> {
    localforage.config({
      name: 'Labo 3',
      storeName: 'ipStorage',
      description: 'This storage contains ip from raspberry.'
    });
    this.model.ip = await localforage.getItem('ip')||"";
  }

  public async onSubmit() { 
    let value= await localforage.setItem('ip', this.model.ip);
    console.log("Raspberry pi IP adress " + value + " has been saved.");
    window.alert("You have saved your raspberry IP adress. Try controlling it in the dashboard.");

    fetch('https://localhost:5008/api/TodoItems', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: '{"Name":'+this.model.ip+ '}'
    })
    .then(log => console.log(log))
  }

}
