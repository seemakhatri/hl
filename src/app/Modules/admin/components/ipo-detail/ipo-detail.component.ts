import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

interface IPODetails {
  id: string;
  companyName: string;
  issueSize: string;
  aboutCompany: string;
  strengths: string[];
  risks: string[];
  minInvestment: string;
  numberOfShares: string;
  lotSize: string;
  offerPrice: string;
}


@Component({
  selector: 'app-ipo-detail',
  templateUrl: './ipo-detail.component.html',
  styleUrls: ['./ipo-detail.component.scss']
})
export class IpoDetailComponent {
  ipo: IPODetails | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.ipo = this.ipoDetails.find(ipo => ipo.id === id);
    });
  }


 ipoDetails: IPODetails[] = [
    {
      id: '1',
      companyName: 'Tech Innovators Inc.',
      issueSize: '$500 million',
      aboutCompany: 'Tech Innovators Inc. is a leading technology company specializing in artificial intelligence and machine learning solutions. Founded over a decade ago, the company has consistently pushed the boundaries of what is possible with AI, developing cutting-edge technologies that are used in various industries from healthcare to finance. Our dedicated research and development team continuously works on innovative projects, resulting in a growing portfolio of patented technologies. With a strong focus on customer satisfaction, we have built a robust client base that includes some of the world’s largest corporations. Our mission is to drive the future of technology by creating intelligent solutions that enhance business performance and improve quality of life globally.',
      strengths: [
        'Cutting-edge AI technology',
        'Strong research and development team',
        'Growing customer base'
      ],
      risks: [
        'High competition in the tech industry',
        'Regulatory challenges',
        'Dependence on key personnel'
      ],
      minInvestment: '$1000',
      numberOfShares: '50 million',
          lotSize: '100',
    offerPrice: '$45'
    
    },
    {
      id: '2',
      companyName: 'Green Earth Foods',
      issueSize: '$300 million',
      aboutCompany: 'Green Earth Foods focuses on sustainable food production, offering organic and eco-friendly products. Established to meet the growing demand for organic foods, we have made a significant impact in the food industry by promoting sustainable agricultural practices. Our products are sourced from certified organic farms that prioritize environmental health and animal welfare. We pride ourselves on providing high-quality, nutritious food options that are free from harmful chemicals and genetically modified organisms. Our commitment to sustainability extends beyond our products, as we continually seek innovative ways to reduce our carbon footprint and promote ecological balance. With strong brand recognition and an increasing customer base, we aim to lead the market in sustainable food solutions.',
      strengths: [
        'Sustainable and eco-friendly practices',
        'Strong brand recognition',
        'Increasing demand for organic foods'
      ],
      risks: [
        'Fluctuations in agricultural output',
        'Supply chain disruptions',
        'Price sensitivity'
      ],
      minInvestment: '$500',
      numberOfShares: '30 million',
      lotSize: '50',
      offerPrice: '$55'
        },
    {
      id: '3',
      companyName: 'Urban Style Co.',
      issueSize: '$150 million',
      aboutCompany: 'Urban Style Co. is a trendy urban clothing retailer catering to young adults and fashion enthusiasts. Since our inception, we have carved a niche in the fashion industry by offering stylish and contemporary clothing that resonates with the urban lifestyle. Our designs are inspired by the latest fashion trends, ensuring that our customers always have access to the most current styles. We operate both online and through a network of retail stores in major urban centers, providing a seamless shopping experience. Our effective marketing strategies and strong social media presence have helped us build a loyal customer base. We are committed to innovation and creativity, constantly updating our collections to meet the evolving tastes of our customers.',
      strengths: [
        'Strong brand presence in urban areas',
        'Innovative and trendy designs',
        'Effective marketing strategies'
      ],
      risks: [
        'Seasonal fluctuations in demand',
        'High competition in the retail sector',
        'Changing fashion trends'
      ],
      minInvestment: '$200',
      numberOfShares: '15 million',
      lotSize: '75',
      offerPrice: '$35'   },
    {
      id: '4',
      companyName: 'HealthFirst Medical',
      issueSize: '$600 million',
      aboutCompany: 'HealthFirst Medical offers a wide range of medical solutions, including healthcare services and medical devices. Our comprehensive approach to healthcare includes state-of-the-art medical devices, cutting-edge research, and partnerships with leading hospitals and healthcare providers. With a strong focus on innovation, we have developed numerous medical devices that have significantly improved patient outcomes. Our healthcare services are designed to be patient-centric, ensuring that each individual receives the highest standard of care. We are committed to advancing medical technology and improving healthcare accessibility. Our team of experienced professionals works tirelessly to stay ahead of industry trends and deliver solutions that meet the evolving needs of the healthcare sector.',
      strengths: [
        'Comprehensive healthcare solutions',
        'Strong partnerships with hospitals',
        'Innovative medical devices'
      ],
      risks: [
        'Regulatory hurdles',
        'High research and development costs',
        'Market volatility'
      ],
      minInvestment: '$1500',
      numberOfShares: '60 million',
      lotSize: '125',
      offerPrice: '$65'   },
    {
      id: '5',
      companyName: 'SmartHome Solutions',
      issueSize: '$250 million',
      aboutCompany: 'SmartHome Solutions provides a variety of smart home devices aimed at improving home automation and security. Our product lineup includes smart locks, security cameras, thermostats, and home assistants, all designed to integrate seamlessly into modern homes. With a commitment to innovation, we continuously develop new technologies to enhance the functionality and user experience of our products. Our solutions are known for their reliability, ease of use, and advanced features that provide users with greater control over their home environments. As the smart home market continues to grow, we are dedicated to maintaining our position as a leader in this space by delivering cutting-edge products and exceptional customer service.',
      strengths: [
        'Innovative smart home products',
        'Strong customer satisfaction',
        'Growing market for smart home technology'
      ],
      risks: [
        'Technological obsolescence',
        'Cybersecurity threats',
        'High competition'
      ],
      minInvestment: '$750',
      numberOfShares: '25 million',
      lotSize: '80',
      offerPrice: '$50'    },
    {
      id: '6',
      companyName: 'Global Logistics Ltd.',
      issueSize: '$800 million',
      aboutCompany: 'Global Logistics Ltd. is a leader in international logistics, offering efficient and reliable transportation solutions. With a vast global network, we provide comprehensive logistics services that include freight forwarding, warehousing, and supply chain management. Our advanced logistics technology ensures that we can offer precise tracking and timely delivery of goods, enhancing the efficiency of our clients’ supply chains. We are committed to maintaining strong customer relationships by delivering tailored solutions that meet the specific needs of each business. Our expertise in navigating geopolitical risks and regulatory challenges enables us to provide stable and dependable services in a constantly changing global environment.',
      strengths: [
        'Extensive global network',
        'Advanced logistics technology',
        'Strong customer relationships'
      ],
      risks: [
        'Geopolitical risks',
        'Fuel price volatility',
        'Regulatory challenges'
      ],
      minInvestment: '$2000',
      numberOfShares: '80 million',
      lotSize: '150',
      offerPrice: '$60'   }
  ];
  
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode() {
    return this.themeService.isDarkModeEnabled();
  }

  goBack() {
    this.router.navigate(['/admin/ipo-section']);
  }

}
