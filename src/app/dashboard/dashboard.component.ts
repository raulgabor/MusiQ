import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpParams, HttpUrlEncodingCodec} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  codec = new HttpUrlEncodingCodec();
  isLoading: boolean = false;
  isEmpty: boolean = false;
  oauthResponse: any;
  account: any;
  topSongArtistL: string;
  topSongNameL: string;
  topSongCoverL: any;
  topSongArtistM: any;
  topSongNameM: string;
  topSongCoverM: any;
  topSongArtistS: string;
  topSongNameS: string;
  topSongCoverS: any;
  movieIdS: any;
  movieNameS: any;
  moviePosterS: any;
  movieIdM: any;
  movieNameM: any;
  moviePosterM: any;
  movieIdL: any;
  movieNameL: any;
  moviePosterL: any;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.code) {
        this.getAccessToken(params.code);
      }
    });
    }, 3000);
  }

  getAccessToken(code: string) {
    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('redirect_uri', 'http://localhost:4200/dashboard')
      .append('client_id', environment.client_id);

    this.http.post('https://accounts.spotify.com/api/token', payload, {
      headers: {
        'Authorization': 'Basic ' + btoa(environment.client_id + ':' + environment.client_secret),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe((response: any) => {
      this.isLoading = false;
      this.oauthResponse = response;
    });
    window.history.pushState({}, null, '/dashboard');
  }

  getProfile() {
    this.http.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + this.oauthResponse.access_token
      }
    }).subscribe(response => {
      // @ts-ignore
      this.account = response.display_name;
    });
  }

  getTopSongs() {
    this.http.get('https://api.spotify.com/v1/me/top/tracks?offset=0&limit=1&time_range=short_term', {
      headers: {
        Authorization: 'Bearer ' + this.oauthResponse.access_token
      }
    }).subscribe(response => {
      // @ts-ignore
      this.topSongArtistS = response.items[0].artists[0].name;
      // @ts-ignore
      this.topSongNameS = response.items[0].name;
      // @ts-ignore
      this.topSongCoverS = response.items[0].album.images[1].url;
    });

    this.http.get('https://api.spotify.com/v1/me/top/tracks?offset=0&limit=1', {
      headers: {
        Authorization: 'Bearer ' + this.oauthResponse.access_token
      }
    }).subscribe(response => {
      // @ts-ignore
      this.topSongArtistM = response.items[0].artists[0].name;
      // @ts-ignore
      this.topSongNameM = response.items[0].name;
      // @ts-ignore
      this.topSongCoverM = response.items[0].album.images[1].url;
    });

    this.http.get('https://api.spotify.com/v1/me/top/tracks?offset=0&limit=1&time_range=long_term', {
      headers: {
        Authorization: 'Bearer ' + this.oauthResponse.access_token
      }
    }).subscribe(response => {
      // @ts-ignore
      this.topSongArtistL = response.items[0].artists[0].name;
      // @ts-ignore
      this.topSongNameL = response.items[0].name;
      // @ts-ignore
      this.topSongCoverL = response.items[0].album.images[1].url;
    });
  }

  findArtistsAndMovies() {
    setTimeout(() => {
      this.http.get('https://online-movie-database.p.rapidapi.com/title/find?q=' + this.codec.encodeValue(this.topSongArtistS), {
        headers: {
          'X-RapidAPI-Key': environment.rapidApiKey,
          'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
      }).subscribe(response => {
        // @ts-ignore
        for (let i = 0; i < response.results.length; i++) {
          // @ts-ignore
          if (this.topSongArtistS === response.results[i].name) var personFoundS = response.results[i].knownFor;
        }
        for (let j = 0; j < personFoundS.length; j++) {
          if (personFoundS[j].summary.category === 'soundtrack') {
            this.movieIdS = (personFoundS[j].id).substr(7, 10);
          }
        }
      });
      setTimeout(() => {
        this.http.get('https://online-movie-database.p.rapidapi.com/title/get-details?tconst=' + this.codec.encodeValue(this.movieIdS), {
          headers: {
            'X-RapidAPI-Key': environment.rapidApiKey,
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        }).subscribe(response => {
          // @ts-ignore
          this.movieNameS = response.title;
          // @ts-ignore
          this.moviePosterS = response.image.url;
        })
      }, 3000);

      this.http.get('https://online-movie-database.p.rapidapi.com/title/find?q=' + this.codec.encodeValue(this.topSongArtistM), {
        headers: {
          'X-RapidAPI-Key': environment.rapidApiKey,
          'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
      }).subscribe(response => {
        // @ts-ignore
        for (let i = 0; i < response.results.length; i++) {
          // @ts-ignore
          if (this.topSongArtistM === response.results[i].name) var personFoundM = response.results[i].knownFor;
        }
        for (let j = 0; j < personFoundM.length; j++) {
          if (personFoundM[j].summary.category === 'soundtrack') {
            this.movieIdM = (personFoundM[j].id).substr(7, 10);
          }
        }
      });
      setTimeout(() => {
        this.http.get('https://online-movie-database.p.rapidapi.com/title/get-details?tconst=' + this.codec.encodeValue(this.movieIdM), {
          headers: {
            'X-RapidAPI-Key': environment.rapidApiKey,
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        }).subscribe(response => {
          // @ts-ignore
          this.movieNameM = response.title;
          // @ts-ignore
          this.moviePosterM = response.image.url;
        })
      }, 3000);

      this.http.get('https://online-movie-database.p.rapidapi.com/title/find?q=' + this.codec.encodeValue(this.topSongArtistL), {
        headers: {
          'X-RapidAPI-Key': environment.rapidApiKey,
          'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
      }).subscribe(response => {
        // @ts-ignore
        for (let i = 0; i < response.results.length; i++) {
          // @ts-ignore
          if (this.topSongArtistL === response.results[i].name) var personFoundL = response.results[i].knownFor;
        }
        for (let j = 0; j < personFoundL.length; j++) {
          if (personFoundL[j].summary.category === 'soundtrack') {
            this.movieIdL = (personFoundL[j].id).substr(7, 10);
          }
        }
      });
      setTimeout(() => {
        this.http.get('https://online-movie-database.p.rapidapi.com/title/get-details?tconst=' + this.codec.encodeValue(this.movieIdL), {
          headers: {
            'X-RapidAPI-Key': environment.rapidApiKey,
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        }).subscribe(response => {
          // @ts-ignore
          this.movieNameL = response.title;
          // @ts-ignore
          this.moviePosterL = response.image.url;
        })
      }, 3000);
    }, 11000);
  }

  giveRandomMovie() {
    setTimeout(() =>{
      let randomNumber = Math.floor(Math.random() * 2 + 1);
      if (this.movieIdS === undefined && this.movieIdM === undefined && this.movieIdL === undefined) {
        this.isEmpty = true;
      } else if(this.movieIdS === undefined) {
          if (randomNumber === 1) {
            document.getElementById("movieM").style.visibility = "hidden";
            document.getElementById("movieM").style.animationDuration = '1s';
            document.getElementById("movieM").style.animationName = 'fromBelow';
            document.getElementById("movieM").style.animationFillMode = 'forwards';
            document.getElementById("movieL").style.visibility = "hidden";
          }
          if (randomNumber === 2) {
            document.getElementById("movieM").style.visibility = "hidden";
            document.getElementById("movieL").style.visibility = "hidden";
            document.getElementById("movieL").style.animationDuration = '1s';
            document.getElementById("movieL").style.animationName = 'fromBelow';
            document.getElementById("movieL").style.animationFillMode = 'forwards';
          }
      } else if(this.movieIdM === undefined) {
          if (randomNumber === 1) {
            document.getElementById("movieS").style.visibility = "hidden";
            document.getElementById("movieS").style.animationDuration = '1s';
            document.getElementById("movieS").style.animationName = 'fromBelow';
            document.getElementById("movieS").style.animationFillMode = 'forwards';
            document.getElementById("movieL").style.visibility = "hidden";
          }
          if (randomNumber === 2) {
            document.getElementById("movieS").style.visibility = "hidden";
            document.getElementById("movieL").style.visibility = "hidden";
            document.getElementById("movieL").style.animationDuration = '1s';
            document.getElementById("movieL").style.animationName = 'fromBelow';
            document.getElementById("movieL").style.animationFillMode = 'forwards';
          }
      } else if(this.movieIdL === undefined) {
          if (randomNumber === 1) {
            document.getElementById("movieS").style.visibility = "hidden";
            document.getElementById("movieS").style.animationDuration = '1s';
            document.getElementById("movieS").style.animationName = 'fromBelow';
            document.getElementById("movieS").style.animationFillMode = 'forwards';
            document.getElementById("movieM").style.visibility = "hidden";
          }
          if (randomNumber === 2) {
            document.getElementById("movieS").style.visibility = "hidden";
            document.getElementById("movieM").style.visibility = "hidden";
            document.getElementById("movieM").style.animationDuration = '1s';
            document.getElementById("movieM").style.animationName = 'fromBelow';
            document.getElementById("movieM").style.animationFillMode = 'forwards';
          }
      } else {
          randomNumber = Math.floor(Math.random() * 3 + 1);
          if (randomNumber === 1) {
            document.getElementById("movieS").style.visibility = "hidden";
            document.getElementById("movieS").style.animationDuration = '1s';
            document.getElementById("movieS").style.animationName = 'fromBelow';
            document.getElementById("movieS").style.animationFillMode = 'forwards';
            document.getElementById("movieM").style.visibility = "hidden";
            document.getElementById("movieL").style.visibility = "hidden";
          }
          if (randomNumber === 2) {
            document.getElementById("movieS").style.visibility = "hidden";
            document.getElementById("movieM").style.visibility = "hidden";
            document.getElementById("movieM").style.animationDuration = '1s';
            document.getElementById("movieM").style.animationName = 'fromBelow';
            document.getElementById("movieM").style.animationFillMode = 'forwards';
            document.getElementById("movieL").style.visibility = "hidden";
          }
          if (randomNumber === 3) {
            document.getElementById("movieS").style.visibility = "hidden";
            document.getElementById("movieM").style.visibility = "hidden";
            document.getElementById("movieL").style.visibility = "hidden";
            document.getElementById("movieL").style.animationDuration = '1s';
            document.getElementById("movieL").style.animationName = 'fromBelow';
            document.getElementById("movieL").style.animationFillMode = 'forwards';
          }
      }
    }, 16000);
  }

  backToLogin() {
    close();
  }
}
