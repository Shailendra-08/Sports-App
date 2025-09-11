export interface LeagueData {
  idLeague: string;
  strSport: string;
  strLeague: string;
  strCurrentSeason: string;
  intFormedYear: string;
  dateFirstEvent: string;
  strCountry: string;
  strWebsite: string;
  strFacebook: string;
  strInstagram: string;
  strTwitter: string;
  strYoutube: string;
  strRSS: string;
  strDescriptionEN: string;
  strDescriptionDE: string;
  strDescriptionFR: string;
  strDescriptionIT: string;
  strDescriptionCN: string;
  strFanart1: string;
  strFanart2: string;
  strFanart3: string;
  strFanart4: string;
  strBanner: string;
  strBadge: string;
  strLogo: string;
  strPoster: string;
  strTrophy: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
  descriptionKey: keyof Pick<LeagueData, 'strDescriptionEN' | 'strDescriptionDE' | 'strDescriptionFR' | 'strDescriptionIT' | 'strDescriptionCN'>;
}