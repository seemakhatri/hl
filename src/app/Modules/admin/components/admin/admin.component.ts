import { AfterViewInit, Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  {
  public showFooter: boolean = false;
  private cursor!: HTMLElement;
  private targetX: number = 0;
  private targetY: number = 0;
  private currentX: number = 0;
  private currentY: number = 0;
  private isMouseMoving: boolean = false;

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showFooter = event.urlAfterRedirects.includes('/admin/home');
    });
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }





}
