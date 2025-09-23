import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../services/system-service';
import { Dashboard } from '../../models/dashboard';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  dashboardInfo?: Dashboard

  constructor(private systemService: SystemService) {}

  ngOnInit(): void {
    this.selectDashboardInfo()
  }

  selectDashboardInfo() {
    this.systemService.selectDashboardInfo().subscribe({
      next: (response) => {
        this.dashboardInfo = response
      }
    })
  }
}
