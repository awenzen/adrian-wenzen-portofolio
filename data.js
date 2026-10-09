export const profile = {
  name: 'Adrian Wenzen', email: 'wensenadrian@gmail.com',
  github: 'https://github.com/awenzen', linkedin: 'https://www.linkedin.com/in/adrian-wenzen/',
  school: 'Illinois Institute of Technology', degree: 'B.S. in Computer Science', graduation: 'Summer 2027', gpa: '3.46 / 4.0',
};
export const experience = [
  { date:'Jan 2026 – Present', location:'', role:'Founder', company:'ProxX', bullets:[
    'Building construction intelligence tools to help project teams identify quality issues earlier and improve site visibility.'
  ], tags:['Construction technology','Product'] },
  { date:'Jan 2026 – Present', location:'', role:'Co-founder & CTO', company:'Loka', bullets:[
    'Built a community safety platform for Jakarta–Depok with live incident mapping, community reporting, official BMKG alerts, and CCTV integration.',
    'Developed the iOS app with SwiftUI, Mapbox Maps SDK v11, and Firebase, including real-time listeners, geohash indexing, BMKG data ingestion, and HLS camera feeds.',
    'Delivered v0.1.0 to TestFlight with 10 internal testers for device QA across map, GPS, reporting, and authentication flows. Built a public waitlist with referral routing.'
  ], tags:['SwiftUI','Mapbox','Firebase','Firestore','HLS','JavaScript'] },
  { date:'May 2026 – Aug 2026', location:'Jakarta, Indonesia', role:'Software Engineer Intern', company:'TransIndonesia Network', bullets:[
    'Built an internal provisioning portal for enterprise connectivity requests, from customer intake and feasibility review through installation, activation, and billing.',
    'Developed role-based authentication, workflow routing, task queues, document management, approval tracking, operational dashboards, CSV reporting, and automated activity logs.',
    'Deployed the platform to a VPS using Kubernetes, supporting 8 internal user roles, 9 core modules, 10 provisioning stages, 50 standardized task outcomes, and 11 database entities.'
  ], tags:['Next.js','TypeScript','PostgreSQL','Supabase','Kubernetes','VPS','Role-based access'] },
  { date:'Aug 2024 – Aug 2026', location:'Chicago, IL · On-site', role:'Community Desk Assistant', company:'Illinois Institute of Technology', bullets:[
    'Assisted students with questions, service requests, lockouts, and general residence hall support.',
    'Managed front desk operations for residential housing as the first point of contact for students, visitors, and staff.',
    'Supported resident safety and building access through check-ins, ID verification, and campus housing procedures.'
  ], tags:['Student services','Operations'] },
  { date:'Aug 2022 – Dec 2022', location:'Chicago, IL', role:'Student Consultant, RPA/IPA Automation', company:'Protiviti', bullets:[
    'Analyzed more than 10 business processes during a five-month consulting engagement to identify robotic and intelligent process automation opportunities.',
    'Evaluated 3 enterprise automation platforms across 8 criteria, including security, scalability, integrations, and implementation complexity.',
    'Designed an end-to-end automation workflow with more than 20 process steps and presented implementation recommendations.'
  ], tags:['Process analysis','RPA','IPA','Technical consulting'] },
  { date:'May 2020 – Aug 2020', location:'Jakarta, Indonesia · Remote', role:'Data Management Developer Intern', company:'PT Supersoft Sistemindo', bullets:[
    'Used INFOR SunSystem ERP software to streamline client data management processes.',
    'Developed a client-facing query system that automated data extraction from INFOR SunSystem ERP.'
  ], tags:['ERP','Data management'] },
];
export const projects = [
  {id:'headroom',name:'Headroom',year:'2026',icon:'H',color:'#e4e7eb',status:'Live',description:'A native macOS notch app that keeps AI coding limits, token usage, and GitHub activity one click away.',tags:['SwiftUI','macOS','Codex','Claude','GitHub'],url:'https://openheadroom.com',details:['Built a SwiftUI notch panel that shows remaining rate-limit windows and reset timers across Cursor, Codex, Claude, Grok, and Kimi.','Added per-provider token usage cards, configurable limit and reset alerts, and quick hover and click interactions with Reduce Motion support.','Integrated GitHub contribution history with a read-only token stored in Keychain, while keeping developer activity data on the Mac.'],context:'Personal project · 2026'},
  {id:'loka',name:'Loka',year:'2026',icon:'L',color:'#98d285',status:'TestFlight',description:'A community safety platform for Jakarta–Depok, bringing live incident maps, community reports, BMKG alerts, and CCTV feeds into one iOS app.',tags:['SwiftUI','Mapbox','Firebase','Firestore','HLS'],url:'https://lokabyproxx.com',details:['Real-time incident mapping and community reporting with geohash indexing.','Official BMKG alert ingestion and HLS camera feeds.','v0.1.0 delivered to TestFlight for QA with 10 internal testers.'],context:'Co-founder & CTO · January 2026 – Present'},
  {id:'risk-engine',name:'Financial Asset Valuation & Risk Engine',year:'2026',icon:'$',color:'#dbb875',status:'Completed',description:'Quantitative models for natural gas derivative pricing and consumer credit risk, built as part of the J.P. Morgan quantitative research job simulation.',tags:['Python','Pandas','scikit-learn','Logistic Regression'],github:'https://github.com/awenzen/jpmorgan-quant-research-simulation',details:['Built a deterministic pricing model to extrapolate seasonal natural gas trends.','Trained a logistic regression model to score borrower risk.','Simulation analysis identified a $120,000 seasonal arbitrage opportunity and $8.23M in expected loss across a $41.6M portfolio.'],context:'Personal project · Spring 2026 · Job simulation'},
  {id:'options-pricer',name:'High Performance Options Pricer',year:'2025',icon:'π',color:'#7cc9d3',status:'Completed',description:'A C++17 Black–Scholes pricing engine calculating option prices and Greeks at a benchmark of 3,090,517 options per second.',tags:['C++17','Python','pybind11','pytest'],github:'https://github.com/awenzen/options_pricer',details:['Calculated Black–Scholes option prices and corresponding risk sensitivities in a single pass.','Benchmarked throughput at 3,090,517 options per second by avoiding redundant calculations.','Exposed the C++ core to Python through pybind11 and validated known values with pytest.'],context:'Personal project · Fall 2025'},
  {id:'market-dashboard',name:'Financial Market Analysis Dashboard',year:'2025',icon:'↗',color:'#b6a1dd',status:'Completed',description:'An interactive Python dashboard exploring market trends, volatility, correlations, and diversification across SPY, BLK, and AGG.',tags:['Python','Pandas','Data visualization','Finance'],github:'https://github.com/awenzen/FinancialMarketDashboard',details:['Analyzed market data from January 2020 through February 2025.','Calculated annualized volatility and correlation matrices to quantify relationships between assets.','Designed an interactive view of market trends, risk, and diversification.'],context:'Personal project · Spring 2025'},
  {id:'stock-prediction',name:'Machine Learning Stock Prediction',year:'2025',icon:'ML',color:'#b4cf7a',status:'Completed',description:'A Random Forest model for predicting stock movements above 1%, using technical indicators including SMA, RSI, and MACD.',tags:['Python','scikit-learn','Random Forest','yfinance'],github:'https://github.com/awenzen/MarketPrediction',details:['Trained a Random Forest model on time-series market data retrieved with yfinance.','Reported 75% accuracy in the project evaluation.','Analyzed feature importance to explain how technical indicators related to price movement predictions.'],context:'Personal project · Spring 2025'},
  {id:'netflix-backend',name:'Netflix-Inspired Backend',year:'2023',icon:'N',color:'#d87a73',status:'Completed',description:'A Python and SQL backend for content management, user authentication, content delivery, and recommendations.',tags:['Python','SQL','Database design','Authentication'],github:'https://github.com/awenzen/NetflixDB',details:['Designed a scalable database for content management and user data.','Integrated authentication, content delivery, and recommendation algorithms.','Reduced data retrieval latency by 45% in high-volume traffic simulations with indexing and query optimization.'],context:'Personal project · Fall 2023'},
];
export const categories = [
  {name:'Languages',icon:'diamond-sword.png',skills:['Python','SQL','R','JavaScript','TypeScript','C++','Java','Swift']},
  {name:'Frameworks & Libraries',icon:'diamond-pickaxe.png',skills:['Next.js','SwiftUI','Pandas','NumPy','scikit-learn','Matplotlib','Seaborn','TensorFlow','PyTorch','Mapbox']},
  {name:'Data & AI',icon:'diamond-shovel.png',skills:['PostgreSQL','SQL Server','Oracle SQL','Spark','dbt','Tableau','Power BI','ETL','OpenAI API','Hugging Face','LangChain']},
  {name:'Tools & Infra',icon:'diamond-axe.png',skills:['Git','Docker','Jupyter Notebook','Firebase','Supabase','Cursor','Claude Code','Codex','Grok Build']},
];
