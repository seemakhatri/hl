import { AfterViewInit, Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  implements AfterViewInit {
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


  ngAfterViewInit() {
    this.cursor = this.el.nativeElement.querySelector('#custom-cursor');
    this.animateCursor();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    
    this.targetX = event.clientX + scrollX;
    this.targetY = event.clientY + scrollY;
    this.isMouseMoving = true;
  }

  @HostListener('document:mousedown')
  onMouseDown() {
    this.renderer.setStyle(this.cursor, 'transform', 'translate(-50%, -50%) scale(0.8)');
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.renderer.setStyle(this.cursor, 'transform', 'translate(-50%, -50%) scale(1)');
  }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.matches('.nav-item, button, a, .resume-button, input, textarea, select, .card, .dark-mode-toggle, span, .left h2, .social, .right i, .left p')) {
      this.renderer.setStyle(this.cursor, 'width', '70px');
      this.renderer.setStyle(this.cursor, 'height', '70px');
      this.renderer.setStyle(this.cursor, 'background-color', 'rgba(0, 0, 0, 0.1)');
    } else {
      this.renderer.setStyle(this.cursor, 'width', '40px');
      this.renderer.setStyle(this.cursor, 'height', '40px');
      this.renderer.setStyle(this.cursor, 'background-color', 'transparent');
    }
  }

  @HostListener('document:mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.matches('.nav-item, button, a, .resume-button, input, textarea, select, .card, .dark-mode-toggle, span, .left h2, .social, .right i, .left p')) {
      this.renderer.setStyle(this.cursor, 'width', '20px');
      this.renderer.setStyle(this.cursor, 'height', '20px');
      this.renderer.setStyle(this.cursor, 'background-color', 'transparent');
    }
  }

  private animateCursor() {
    if (this.isMouseMoving) {
      const dx = this.targetX - this.currentX;
      const dy = this.targetY - this.currentY;
      this.currentX += dx * 0.1; 
      this.currentY += dy * 0.1; 

      this.renderer.setStyle(this.cursor, 'left', `${this.currentX}px`);
      this.renderer.setStyle(this.cursor, 'top', `${this.currentY}px`);
    
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        this.isMouseMoving = false;
      }
    }
    
    requestAnimationFrame(this.animateCursor.bind(this));
  }
}
