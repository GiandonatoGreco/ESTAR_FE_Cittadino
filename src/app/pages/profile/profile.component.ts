import { Component, OnInit, ViewChild } from '@angular/core';
import { routes } from '../../../utils/routes';
import { BreadcrumbI } from 'models/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileService } from 'services/profile.service';
import { ProfileI } from 'models/profile';
import { ModalProfileComponent } from 'components/modals/modal-profile/modal-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @ViewChild(ModalProfileComponent) modalProfile!: ModalProfileComponent;

  id: string | null = null;
  profileDetail?: ProfileI;

  isEmailType: boolean = false;
  isCellulareType: boolean = false;

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

  openModal(type: 'email' | 'phone'): void {
    console.log('Tipo di modifica:', type);
    this.modalProfile.openModal(type);
  }
}
