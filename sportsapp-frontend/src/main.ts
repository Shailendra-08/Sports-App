import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient } from '@angular/common/http';

// Lucide Icons
import {
  Home,
  Heart,
  User,
  LogOut,
  Sun,
  Moon,
  Search,
  SearchX,
  Zap,
  MapPin,
  Hash,
  Tag,
  Youtube,
  Globe,
  ArrowRight,
  HeartOff,
  Compass,
  UserCircle,
  Settings,
  BarChart3,
  ShieldCheck,
  Edit,
  Key,
  Download,
  Trash2,
  Bot,
  Calendar,
  Users,
  Trophy,
  Star,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      LucideAngularModule.pick({
        Home,
        Heart,
        User,
        LogOut,
        Sun,
        Moon,
        Search,
        SearchX,
        Zap,
        MapPin,
        Hash,
        Tag,
        Youtube,
        Globe,
        ArrowRight,
        HeartOff,
        Compass,
        UserCircle,
        Settings,
        BarChart3,
        ShieldCheck,
        Edit,
        Key,
        Download,
        Trash2,
        Bot,
        Calendar,
        Users,
        Trophy,
        Star,
        ExternalLink,
        Facebook,
        Instagram,
        Twitter
      })
    )
  ],
}).catch((err) => console.error(err));