import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-delisting-detail',
  templateUrl: './delisting-detail.component.html',
  styleUrls: ['./delisting-detail.component.scss']
})
export class DelistingDetailComponent implements OnInit {

  companyId: any;
  companyDetails: any;
  markerPosition: number | undefined;

  constructor(private route: ActivatedRoute, private themeService: ThemeService) {}

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.loadCompanyDetails(this.companyId);
    this.calculateMarkerPosition();
  }


  loadCompanyDetails(id: string) {
    switch (id) {
      case '1':
        this.companyDetails = {
          id,
          name: 'AAA',
          points: [
            "AAA, a leader in technology products, has made the strategic decision to delist from the London Stock Exchange. This decision reflects AAA's commitment to reshaping its market strategy in response to evolving industry dynamics.",
            "By delisting, AAA aims to enhance operational flexibility and focus on long-term innovation and growth initiatives.",
            "The company recognizes the challenges and opportunities of operating in a highly competitive sector, and believes that transitioning away from public markets will provide the autonomy needed to pursue its strategic vision effectively.",
            "Investors and stakeholders holding AAA shares will receive regular updates on the company's progress and future opportunities.",
            "AAA's leadership remains optimistic about the future, leveraging its strong market position and technological expertise to navigate the evolving landscape effectively.",
            "The delisting decision marks a pivotal moment for AAA as it aligns its operations with long-term strategic objectives and responds proactively to market dynamics and investor expectations."
          ]
        };
        break;
      case '2':
        this.companyDetails = {
          id,
          name: 'BBB',
          points: [
            "BBB, a prominent player in the energy sector, has voluntarily chosen to liquidate its operations in response to market challenges and strategic considerations.",
            "The decision reflects BBB's commitment to optimizing shareholder value and addressing financial pressures effectively.",
            "The company plans to initiate a voluntary liquidation process, which includes a redemption payment scheduled for July 5th, aimed at providing shareholders with fair compensation for their investments.",
            "BBB acknowledges the complexities of operating within the current economic environment and believes that liquidation is the most prudent course of action to protect shareholder interests.",
            "The decision follows a comprehensive review of BBB's financial position and strategic options, emphasizing transparency and accountability to all stakeholders.",
            "Looking ahead, BBB aims to explore new opportunities for growth and innovation in the energy sector, leveraging its expertise and market insights to drive sustainable value creation."
          ]
        };
        break;
      case '3':
        this.companyDetails = {
          id,
          name: 'CCC',
          points: [
            "CCC, renowned for its healthcare services, is currently undergoing a significant restructuring initiative to enhance operational efficiency and financial resilience.",
            "The strategic restructuring aims to streamline CCC's operations, optimize resource allocation, and strengthen its market position amidst evolving industry trends.",
            "The decision to restructure follows an in-depth analysis of CCC's operational performance and market dynamics, highlighting opportunities for improvement and growth.",
            "Throughout the restructuring process, CCC remains committed to maintaining high standards of patient care and service delivery.",
            "CCC's leadership is optimistic about the long-term benefits of the restructuring efforts, anticipating enhanced operational efficiency and sustainable growth in the healthcare sector.",
            "The company invites stakeholders to support its strategic vision and participate in the journey towards achieving excellence in healthcare services."
          ]
        };
        break;
      case '4':
        this.companyDetails = {
          id,
          name: 'DDD',
          points: [
            "DDD has successfully transitioned its operations to a private market environment, marking a strategic shift in its business model and market strategy.",
            "The decision to transition to a private market aims to enhance DDD's operational flexibility, capitalize on new growth opportunities, and reduce regulatory complexities associated with public market obligations.",
            "By operating in a private market environment, DDD anticipates greater autonomy in decision-making and resource allocation, fostering innovation and long-term growth initiatives.",
            "Shareholders and investors will receive updates on DDD's activities and strategic initiatives as the company explores new avenues for growth and expansion in its target markets.",
            "Looking ahead, DDD is optimistic about the prospects of operating in a private market environment, leveraging its strengths and market insights to drive sustainable value creation and long-term shareholder value.",
            "The transition underscores DDD's strategic vision and commitment to delivering excellence in its core business areas."
          ]
        };
        break;
      case '5':
        this.companyDetails = {
          id,
          name: 'EEE',
          points: [
            "EEE, a provider of financial services, has merged with another entity to create a stronger combined organization with enhanced market capabilities and synergies.",
            "The merger aims to deliver increased value to shareholders through improved operational efficiencies, expanded market presence, and synergistic growth opportunities.",
            "As a result of the merger, EEE expects to achieve significant cost savings and operational synergies, enhancing profitability and shareholder returns over the long term.",
            "Shareholders of EEE will receive regular updates on the integration process, ensuring transparency and clarity regarding the merger's impact on their investments.",
            "Looking ahead, EEE is poised for sustainable growth and value creation as it combines forces with a strategic partner to navigate evolving market dynamics and deliver enhanced value to shareholders and customers alike.",
            "The decision to merge underscores EEE's commitment to strategic growth and market leadership in the financial services sector."
          ]
        };
        break;
      default:
        this.companyDetails = null;
    }
  }
  


  calculateMarkerPosition() {
    if (!this.companyDetails) {
      this.markerPosition = 0;
      return;
    }

    const currentDate = new Date();
    const investmentDate = new Date(this.companyDetails.investmentDate);
    const dividendDate = new Date(this.companyDetails.dividendDate);
    const totalDuration = dividendDate.getTime() - investmentDate.getTime();
    const elapsedDuration = currentDate.getTime() - investmentDate.getTime();
    this.markerPosition = (elapsedDuration / totalDuration) * 100;
  }

  filterData(period: string) {
    console.log(`Filtering data for ${period}`);
    // Implement logic to filter data based on the selected period if needed
  }


}
