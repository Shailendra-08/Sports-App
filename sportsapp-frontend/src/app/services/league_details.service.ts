import { Injectable } from '@angular/core';
import {LeagueData} from '../models/league'

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  
  // Mock data - replace with actual API call
  getLeagueData(): LeagueData {
    return {
      idLeague: "4328",
      strSport: "Soccer",
      strLeague: "English Premier League",
      strCurrentSeason: "2025-2026",
      intFormedYear: "1992",
      dateFirstEvent: "1992-08-15",
      strCountry: "England",
      strWebsite: "www.premierleague.com",
      strFacebook: "xen-gb.facebook.com/premierleague/",
      strInstagram: "www.instagram.com/premierleague",
      strTwitter: "twitter.com/premierleague",
      strYoutube: "www.youtube.com/channel/UCG5qGWdu8nIRZqJ_GgDwQ-w",
      strRSS: "https://feeds.bbci.co.uk/sport/football/rss.xml",
      strDescriptionEN: "This is english description of the premier league with lots of details about the history and current status",
      strDescriptionDE: "This is german description of the premier league with lots of details about the history and current status",
      strDescriptionFR: "This is france description of the premier league with lots of details about the history and current status",
      strDescriptionIT: "This is italian description of the premier league with lots of details about the history and current status",
      strDescriptionCN: "This is chinese description of the premier league with lots of details about the history and current status",
      strFanart1: "https://r2.thesportsdb.com/images/media/league/fanart/odberp1725731801.jpg",
      strFanart2: "https://r2.thesportsdb.com/images/media/league/fanart/s0ozu31725731959.jpg",
      strFanart3: "https://r2.thesportsdb.com/images/media/league/fanart/44vpk61725732073.jpg",
      strFanart4: "https://r2.thesportsdb.com/images/media/league/fanart/grmbt01725731922.jpg",
      strBanner: "https://r2.thesportsdb.com/images/media/league/banner/xe1es51638921786.jpg",
      strBadge: "https://r2.thesportsdb.com/images/media/league/badge/gasy9d1737743125.png",
      strLogo: "https://r2.thesportsdb.com/images/media/league/logo/4c377s1535214890.png",
      strPoster: "https://r2.thesportsdb.com/images/media/league/poster/67al0l1719007596.jpg",
      strTrophy: "https://r2.thesportsdb.com/images/media/league/trophy/9a6kw51689108793.png"
    };
  }
}