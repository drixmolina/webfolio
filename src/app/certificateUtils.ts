// Certificate and Capstone Data Management

export interface CertificateData {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  credentialId?: string;
  color: string;
  pdfPath: string;
  description?: string;
}

export interface CapstoneProject {
  title: string;
  subtitle?: string;
  description: string;
  objectives: string[];
  problemStatement: string;
  features: string[];
  techStack: string[];
  developmentProcess: string[];
  screenshots: { url: string; caption: string; type?: "web" | "mobile" | "photo" }[];
  screenshotGroups?: { title: string; description: string; type: "web" | "mobile"; shots: { url: string; caption: string }[] }[];
  documentation?: { title: string; url: string };
  architecture?: string;
  heroImage: string;
  thumbnail?: string;
  awards?: string[];
  experiencePhotos?: { url: string; caption: string }[];
}

// Extract certificate information from PDF filenames
export const parseCertificateFromFilename = (filename: string): Partial<CertificateData> => {
  const nameWithoutExt = filename.replace('.pdf', '');

  const certificateMap: Record<string, { title: string; org: string; color: string; credentialId?: string; issueDate: string }> = {
    'HTML & CSS': {
      title: 'IT Specialist - HTML and CSS',
      org: 'Certiport / Pearson VUE',
      color: '#D72323',
      issueDate: 'December 2024',
    },
    'Networking': {
      title: 'IT Specialist - Networking',
      org: 'Cisco / Certiport',
      color: '#D72323',
      issueDate: 'July 2024',
    },
    'Network Security': {
      title: 'IT Specialist - Network Security',
      org: 'Cisco / Certiport',
      color: '#D72323',
      issueDate: 'July 2025',
    },
    'device confi': {
      title: 'IT Specialist - Device Configuration and Management',
      org: 'Cisco / Certiport',
      color: '#D72323',
      credentialId: 'C3uJ-DwzJ',
      issueDate: 'December 2025',
    },
    'Python': {
      title: 'IT Specialist - Python',
      org: 'Certiport / Pearson VUE',
      color: '#D72323',
      issueDate: 'January 2024',
    },
  };

  for (const [key, value] of Object.entries(certificateMap)) {
    if (nameWithoutExt.toLowerCase().includes(key.toLowerCase())) {
      return {
        title: value.title,
        organization: value.org,
        color: value.color,
        credentialId: value.credentialId,
        issueDate: value.issueDate,
      };
    }
  }

  return {
    title: nameWithoutExt,
    organization: 'Professional Certification',
    color: '#D72323',
    issueDate: '2024',
  };
};

// Dynamically load certificates from the public certifications folder
export const loadCertificates = async (): Promise<CertificateData[]> => {
  const pdfFiles = [
    'device confi.pdf',
    'HTML & CSS.pdf',
    'Network Security.pdf',
    'Networking.pdf',
    'Python.pdf',
  ];

  return pdfFiles.map((filename, index) => {
    const parsed = parseCertificateFromFilename(filename);
    return {
      id: `cert-${index + 1}`,
      title: parsed.title || filename,
      organization: parsed.organization || 'Professional Certification',
      issueDate: parsed.issueDate || '2024',
      credentialId: parsed.credentialId,
      color: parsed.color || '#D72323',
      pdfPath: `/certifications/${filename}`,
      description: `Professional certification demonstrating expertise in ${parsed.title || 'IT'}`,
    };
  });
};

export const getCapstoneProject = (): CapstoneProject => ({
  title: 'FacilitEASE',
  subtitle: 'A Web and Mobile Application Property Management System with Priority-Based Personnel Dispatch and Push Notifications for the Facilities Office of FEU Diliman',
  description:
    'FacilitEASE is a web and mobile application designed for the Facilities Office of FEU Diliman. It centralizes venue and equipment reservations, service requests, personnel dispatch, inventory tracking, and real-time notifications into one organized property management system.',
  objectives: [
    'Design and develop a web and mobile application for FEU Diliman Facilities Office',
    'Automate venue and equipment reservation workflows',
    'Improve job order processing and personnel dispatch tracking',
    'Provide inventory visibility for venues, equipment, and resources',
    'Send push notifications and status updates to involved users',
  ],
  problemStatement:
    'The Facilities Office relied on manual and paper-based processes, limited real-time information, weak communication, double-booking risks, and slow tracking of pending job orders. FacilitEASE was created to make facility management faster, clearer, and more organized.',
  features: [
    'Google Authentication and role-based registration',
    'Dashboard for reservations, service requests, reminders, and announcements',
    'Venue and equipment reservation management',
    'Service request and job order tracking',
    'Priority-based personnel dispatch',
    'Photo upload support for service requests',
    'Venue and equipment inventory management',
    'Push notifications and status updates',
    'Conversation section for request coordination',
    'Service ratings for personnel performance evaluation',
  ],
  techStack: [
    'Kotlin',
    'PHP',
    'JavaScript',
    'XAMPP',
    'Expo Go',
    'Google Authentication',
    'Web Application',
    'Mobile Application',
  ],
  developmentProcess: [
    'Analyzed the Facilities Office workflow and existing manual processes',
    'Defined modules for login, registration, dashboard, reservations, service requests, services, and inventory',
    'Designed the system interface, diagrams, and project documentation',
    'Developed the web and mobile application using Scrum-based implementation',
    'Tested reservation, job order, service request, dispatch, and inventory workflows',
    'Presented the project during the capstone exhibit and awards activities',
  ],
  screenshots: [
    {
      url: '/projects/facilitease-extra/web-login.jpeg',
      caption: 'Web login screen',
      type: 'web',
    },
    {
      url: '/projects/facilitease-extra/web-dashboard.jpeg',
      caption: 'Web dashboard with reservation overview',
      type: 'web',
    },
    {
      url: '/projects/facilitease-extra/web-master-records.jpeg',
      caption: 'Web master records and reservation list',
      type: 'web',
    },
    {
      url: '/projects/facilitease-web-dashboard-current.png',
      caption: 'Web dashboard with calendar, next reservations, and announcements',
      type: 'web',
    },
    {
      url: '/projects/facilitease-extra/mobile-login.jpeg',
      caption: 'Mobile login screen',
      type: 'mobile',
    },
    {
      url: '/projects/facilitease-extra/mobile-dashboard.jpeg',
      caption: 'Mobile dashboard with venue usage summary',
      type: 'mobile',
    },
    {
      url: '/projects/facilitease-extra/mobile-reservation-request.jpeg',
      caption: 'Mobile reservation request form',
      type: 'mobile',
    },
    {
      url: '/projects/facilitease-extra/mobile-service-request.jpeg',
      caption: 'Mobile service request form',
      type: 'mobile',
    },
    {
      url: '/projects/facilitease-mobile-reservations.png',
      caption: 'Mobile ongoing reservation screen',
      type: 'mobile',
    },
    {
      url: '/projects/facilitease-thumbnail.png',
      caption: 'FacilitEASE project title thumbnail',
      type: 'photo',
    },
    {
      url: '/projects/facilitease-project-demo.jpg',
      caption: 'Project demo during capstone exhibit',
      type: 'photo',
    },
    {
      url: '/projects/facilitease-members.jpg',
      caption: 'FacilitEASE team members during project exhibit',
      type: 'photo',
    },
    {
      url: '/projects/facilitease-awards-night.jpg',
      caption: 'Awards night recognition photo',
      type: 'photo',
    },
    {
      url: '/projects/facilitease-awards-night-2.jpg',
      caption: 'Capstone awards ceremony photo',
      type: 'photo',
    },
  ],
  screenshotGroups: [
    {
      title: 'Web Application Screens',
      description: 'Web screens for login, dashboard, reservation records, announcements, and facilities management.',
      type: 'web',
      shots: [
        { url: '/projects/facilitease-extra/web-login.jpeg', caption: 'Web login screen' },
        { url: '/projects/facilitease-extra/web-dashboard.jpeg', caption: 'Web dashboard' },
        { url: '/projects/facilitease-extra/web-master-records.jpeg', caption: 'Master records / reservations' },
        { url: '/projects/facilitease-web-dashboard-current.png', caption: 'Calendar dashboard with announcements' },
      ],
    },
    {
      title: 'Mobile Application Screens',
      description: 'Mobile screens for requestors, including login, dashboard, reservations, service requests, and status tracking.',
      type: 'mobile',
      shots: [
        { url: '/projects/facilitease-extra/mobile-login.jpeg', caption: 'Mobile login screen' },
        { url: '/projects/facilitease-extra/mobile-dashboard.jpeg', caption: 'Mobile dashboard' },
        { url: '/projects/facilitease-extra/mobile-reservation-request.jpeg', caption: 'Reservation request form' },
        { url: '/projects/facilitease-extra/mobile-service-request.jpeg', caption: 'Service request form' },
        { url: '/projects/facilitease-mobile-reservations.png', caption: 'Mobile ongoing reservation tab' },
      ],
    },
  ],
  experiencePhotos: [
    {
      url: '/projects/facilitease-experience/awards-night-team-1.jpg',
      caption: 'FacilitEASE team during awards night recognition',
    },
    {
      url: '/projects/facilitease-experience/awards-night-team-2.jpg',
      caption: 'Capstone awards night group photo',
    },
    {
      url: '/projects/facilitease-experience/capstone-exhibit-team.jpg',
      caption: 'FacilitEASE team during the capstone project exhibit',
    },
    {
      url: '/projects/facilitease-experience/capstone-project-demo.jpg',
      caption: 'Project demo and system presentation during the exhibit',
    },
  ],
  heroImage: '/projects/facilitease-thumbnail.png',
  thumbnail: '/projects/facilitease-thumbnail.png',
  documentation: {
    title: 'FacilitEASE Research Paper',
    url: '/projects/facilitease-paper.pdf',
  },
  architecture:
    'FacilitEASE uses an integrated web and mobile platform structure. The mobile application supports requestors, while the web platform supports administrators, personnel, and approvers. The system follows a role-based workflow for reservations, service requests, inventory updates, approval decisions, and personnel dispatch.',
  awards: ['Capstone project exhibit presentation', 'Awards night recognition', 'Best in Website', 'Best in Trailer'],
});
