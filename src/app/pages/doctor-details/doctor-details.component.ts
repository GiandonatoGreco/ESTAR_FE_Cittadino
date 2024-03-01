import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbI } from 'models/common';
import { DoctorI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss',
})
export class DoctorDetailsComponent implements OnInit {
  id: string | null = null;
  docDetail?: DoctorI;

  crumbs: BreadcrumbI[] = [
    {
      link: '',
      label: 'Home',
      icon: undefined,
    },
    {
      link: '/doctors',
      label: 'Mappa dottori',
      icon: undefined,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.doctorService.getDoctorsList().subscribe((data) => {
          const details = data.find((d) => d.id.toString() === this.id);
          this.docDetail = details;
          this.crumbs.push({
            label: `Dettaglio ${details?.name || ''}`,
            icon: undefined,
          });
        });
      }
    });
  }
}
