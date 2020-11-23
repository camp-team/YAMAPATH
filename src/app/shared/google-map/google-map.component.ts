import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, AfterViewInit {
  @Input() type: 'full' | 'small';
  @ViewChild(GoogleMap, { static: false }) map: google.maps.Map;

  posts$: Observable<Post[]> = this.postService.getPosts();

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
    draggable: false,
  };
  markerOptions = { draggable: false };

  constructor(private postService: PostService) {}

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

  ngAfterViewInit(): void {
    this.map.data.loadGeoJson('assets/amagiTrail.geojson');

    this.map.data.setStyle({
      strokeColor: '#4dc0b2',
      strokeWeight: 5,
      strokeOpacity: 0.8,
    });
  }

  panToCenter(): void {
    this.map.panTo(this.options.center);
  }

  panToCurrentPosition(): void {
    this.map.panTo(this.currentPosition);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

  onCurrentPositionMarkerClicked(): void {
    this.map.panTo(this.currentPosition);
  }

  markerClicked(marker: MapMarker, window: MapInfoWindow) {
    window.open(marker);
  }

  changeMarkerIcons(category: string) {
    switch (category) {
      case 'danger': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/danger.svg',
            scaledSize: new google.maps.Size(40, 40),
          },
        };
        return markerOptions;
      }
      case 'view': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/camera.svg',
            scaledSize: new google.maps.Size(40, 40),
          },
        };
        return markerOptions;
      }
      case 'toilet': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/wc.svg',
            scaledSize: new google.maps.Size(40, 40),
          },
        };
        return markerOptions;
      }
      case 'water': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/water.svg',
            scaledSize: new google.maps.Size(40, 40),
          },
        };
        return markerOptions;
      }
      case 'rest': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/rest.svg',
            scaledSize: new google.maps.Size(40, 40),
          },
        };
        return markerOptions;
      }
      case 'other': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/other.svg',
            scaledSize: new google.maps.Size(40, 40),
          },
        };
        return markerOptions;
      }
      default:
    }
  }
}
