import { Component,OnInit } from '@angular/core';
import { routes } from '../../../utils/routes';
import { BreadcrumbI } from 'models/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileService } from 'services/profile.service';
import { ProfileI } from 'models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {

  id: string | null = null;
  profileDetail?: ProfileI;

  crumbs: BreadcrumbI[] = [
    {
      link: '/' + routes.dashboard.path,
      label: routes.dashboard.title,
    },
    {
      link: '/' + routes.profile.path,
      label: routes.profile.title,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {} 
  ngOnInit(): void {
    this.profileService.getProfileDetails().subscribe((details) => {
      this.profileDetail = details;
    });
  }
}