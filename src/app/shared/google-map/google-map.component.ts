import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: google.maps.Map;

  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoom: 14,
    center: {
      lat: 34.863439,
      lng: 139.001569,
    },
    mapId: '6c669e37c1a4135',
  } as google.maps.MapOptions;

  currentPosition: google.maps.LatLngLiteral;
  currentPositionMarkerOption: google.maps.MarkerOptions = {
    icon: {
      url: 'assets/icons/current-position-marker.svg',
      scaledSize: new google.maps.Size(28, 28),
    },
    draggable: false
  };
  markerOptions = { draggable: false };

  constructor() { }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

  panToCenter(): void {
    this.map.panTo(this.options.center);
  }

  panToCurrentPosition(): void {
    this.map.panTo(this.currentPosition);
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  onCurrentPositionMarkerClicked(): void {
    this.map.panTo(this.currentPosition);
  }

}
