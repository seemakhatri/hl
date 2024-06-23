import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkMode = false;

  constructor() { }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveTheme();
  }


  private applyTheme(){
    const body = document.body;
    if(this.isDarkMode){
      body.classList.add('dark-mode');
    }
    else{
      body.classList.remove('dark-mode');
    }
  }

  private saveTheme(){
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  private loadTheme(){
    const savedTheme = localStorage.getItem('isDarkMode');
    this.isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;
    this.applyTheme();
  }


  isDarkModeEnabled() {
    return this.isDarkMode;
  }
}
