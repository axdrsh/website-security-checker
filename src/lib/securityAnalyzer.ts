
import { AnalysisResult, SecurityFactor } from "./types";

// Function to analyze a website and return security metrics
export async function analyzeWebsite(url: string): Promise<AnalysisResult> {
  // This is where we would normally make server-side API calls to analyze the website
  // Since we're limited to client-side code, we'll use a combination of:
  // 1. Simple fetch request to get basic info
  // 2. Simulated analysis for aspects we can't check directly from the client

  // Normalize URL for display
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  
  // Check if HTTPS
  const isHttps = url.startsWith('https://');
  
  // Initialize factors array
  const factors: SecurityFactor[] = [];
  
  // Add HTTPS factor
  factors.push({
    title: "HTTPS Connection",
    description: isHttps 
      ? "The website uses HTTPS, which encrypts data between your browser and the website."
      : "The website does not use HTTPS, which means data is not encrypted in transit.",
    status: isHttps ? "good" : "bad",
    impact: 8,
  });

  // Try to fetch the website to get basic info
  let title = null;
  let server = null;
  let hasSecurity = false;
  
  try {
    // We'll use a CORS proxy for demo purposes
    // In a real app, this would be handled by a backend API
    // For demo purposes, we'll simulate fetching some headers
    /*
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    const response = await fetch(proxyUrl, {
      method: 'HEAD',
    });
    */
    
    // Simulate response data since we can't directly fetch due to CORS
    const securityHeaders = simulateSecurityHeaders(displayUrl);
    
    // Check for security headers
    hasSecurity = securityHeaders.someSecurityHeaders;
    
    if (securityHeaders.hasXFrameOptions) {
      factors.push({
        title: "Clickjacking Protection",
        description: "The website uses X-Frame-Options header to prevent clickjacking attacks.",
        status: "good",
        impact: 5,
      });
    } else {
      factors.push({
        title: "Clickjacking Protection",
        description: "The website might be vulnerable to clickjacking attacks as no X-Frame-Options header was detected.",
        status: "warning",
        impact: 4,
      });
    }
    
    if (securityHeaders.hasContentSecurityPolicy) {
      factors.push({
        title: "Content Security Policy",
        description: "The website implements Content Security Policy, reducing the risk of cross-site scripting attacks.",
        status: "good",
        impact: 7,
      });
    } else {
      factors.push({
        title: "Content Security Policy",
        description: "No Content Security Policy detected, which could expose the site to cross-site scripting (XSS) attacks.",
        status: "warning",
        impact: 6,
      });
    }
    
    // Simulate domain age check
    const domainAgeResult = simulateDomainAgeCheck(displayUrl);
    factors.push({
      title: "Domain Age",
      description: domainAgeResult.description,
      status: domainAgeResult.status,
      impact: 4,
    });
    
    // Simulate SSL certificate check
    if (isHttps) {
      const sslResult = simulateSSLCheck(displayUrl);
      factors.push({
        title: "SSL Certificate",
        description: sslResult.description,
        status: sslResult.status,
        impact: 6,
      });
    }
    
    // Simulate privacy policy check
    const privacyResult = simulatePrivacyPolicyCheck(displayUrl);
    factors.push({
      title: "Privacy Policy",
      description: privacyResult.description,
      status: privacyResult.status,
      impact: 3,
    });
    
    // Get simulated info
    const websiteInfo = simulateWebsiteInfo(displayUrl);
    title = websiteInfo.title;
    server = websiteInfo.server;
    
  } catch (error) {
    console.error("Error fetching website:", error);
    // If we can't fetch, add a warning factor
    factors.push({
      title: "Website Accessibility",
      description: "Unable to access the website for detailed analysis. The site may be down or blocking our requests.",
      status: "warning",
      impact: 5,
    });
  }
  
  // Calculate trust score
  let trustScore = calculateTrustScore({
    isHttps,
    hasSecurity,
    factors,
    displayUrl,
  });
  
  // Generate summary based on trust score
  const summary = generateSummary(trustScore, factors);
  
  return {
    url: displayUrl,
    title,
    https: isHttps,
    server,
    trustScore,
    factors,
    summary,
  };
}

// Function to calculate trust score based on various factors
function calculateTrustScore({
  isHttps,
  hasSecurity,
  factors,
  displayUrl,
}: {
  isHttps: boolean;
  hasSecurity: boolean;
  factors: SecurityFactor[];
  displayUrl: string;
}): number {
  // Base score
  let score = 50;
  
  // HTTPS is a major factor
  if (isHttps) {
    score += 20;
  } else {
    score -= 20;
  }
  
  // Factor in security headers
  if (hasSecurity) {
    score += 10;
  }
  
  // Calculate score from individual factors
  let totalImpact = 0;
  let weightedScore = 0;
  
  factors.forEach(factor => {
    totalImpact += factor.impact;
    
    switch (factor.status) {
      case "good":
        weightedScore += factor.impact * 10; // Full points
        break;
      case "warning":
        weightedScore += factor.impact * 5; // Half points
        break;
      case "bad":
        weightedScore += 0; // No points
        break;
      case "info":
        // Info doesn't affect score
        totalImpact -= factor.impact;
        break;
    }
  });
  
  // Normalize the score from factors (max 20 points contribution)
  if (totalImpact > 0) {
    score += (weightedScore / (totalImpact * 10)) * 20;
  }
  
  // Simulate reputation boost/penalty based on domain
  if (displayUrl.includes('google') || 
      displayUrl.includes('github') || 
      displayUrl.includes('microsoft')) {
    score += 10;
  } else if (displayUrl.includes('example') || 
             displayUrl.includes('test')) {
    score -= 5;
  }
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
}

// Generate a summary based on trust score and factors
function generateSummary(trustScore: number, factors: SecurityFactor[]): string {
  let summary = "";
  
  if (trustScore >= 80) {
    summary = "This website appears to implement strong security practices. ";
  } else if (trustScore >= 60) {
    summary = "This website has reasonable security measures in place, but could improve in some areas. ";
  } else if (trustScore >= 40) {
    summary = "This website has several security concerns that should be addressed. ";
  } else {
    summary = "This website has significant security issues and should be approached with caution. ";
  }
  
  // Add details about the most critical factors
  const criticalFactors = factors
    .filter(f => f.impact >= 6)
    .sort((a, b) => b.impact - a.impact);
  
  if (criticalFactors.length > 0) {
    if (criticalFactors.some(f => f.status === "bad")) {
      summary += "The most significant issues include: ";
      const badFactors = criticalFactors
        .filter(f => f.status === "bad")
        .slice(0, 2)
        .map(f => f.title.toLowerCase());
      
      summary += badFactors.join(" and ") + ". ";
    } else if (criticalFactors.some(f => f.status === "good")) {
      summary += "Notable security strengths include: ";
      const goodFactors = criticalFactors
        .filter(f => f.status === "good")
        .slice(0, 2)
        .map(f => f.title.toLowerCase());
      
      summary += goodFactors.join(" and ") + ". ";
    }
  }
  
  // Add recommendations
  if (trustScore < 80) {
    summary += "We recommend the website owner ";
    
    if (!factors.some(f => f.title === "HTTPS Connection" && f.status === "good")) {
      summary += "implement HTTPS encryption";
    } else if (!factors.some(f => f.title === "Content Security Policy" && f.status === "good")) {
      summary += "add a Content Security Policy";
    } else {
      summary += "address the security warnings identified in this report";
    }
    
    summary += " to improve the overall security posture.";
  }
  
  return summary;
}

// SIMULATION FUNCTIONS
// These simulate checks we'd normally do server-side

function simulateSecurityHeaders(url: string) {
  // Simulate different security header presence based on domain
  // In a real app, this would be from actual HTTP response headers
  
  // Some popular sites with good security
  const secureExamples = [
    'google.com', 
    'github.com', 
    'microsoft.com', 
    'cloudflare.com',
    'mozilla.org'
  ];
  
  // Check if URL contains any of the secure examples
  const isLikelySecure = secureExamples.some(domain => url.includes(domain));
  
  // Randomize with bias toward secure for those domains
  const hasXFrameOptions = isLikelySecure ? Math.random() > 0.2 : Math.random() > 0.6;
  const hasContentSecurityPolicy = isLikelySecure ? Math.random() > 0.3 : Math.random() > 0.7;
  const hasXContentTypeOptions = isLikelySecure ? Math.random() > 0.2 : Math.random() > 0.6;
  
  return {
    hasXFrameOptions,
    hasContentSecurityPolicy,
    hasXContentTypeOptions,
    someSecurityHeaders: hasXFrameOptions || hasContentSecurityPolicy || hasXContentTypeOptions
  };
}

function simulateDomainAgeCheck(url: string) {
  // Simulate domain age check
  // In a real app, this would query WHOIS data
  
  // Some known older domains
  const oldDomains = ['google', 'microsoft', 'apple', 'amazon', 'yahoo', 'ebay'];
  const isLikelyOld = oldDomains.some(domain => url.includes(domain));
  
  // Randomize with bias
  const ageYears = isLikelyOld 
    ? 10 + Math.floor(Math.random() * 15) // 10-25 years for likely old domains
    : Math.floor(Math.random() * 10);     // 0-10 years for others
  
  let status: "good" | "warning" | "bad" | "info" = "info";
  let description: string;
  
  if (ageYears > 5) {
    status = "good";
    description = `Domain appears to be established (approximately ${ageYears} years old), which is a positive trust indicator.`;
  } else if (ageYears > 1) {
    status = "info";
    description = `Domain is relatively new (approximately ${ageYears} years old).`;
  } else {
    status = "warning";
    description = `Domain appears to be very new (less than a year old). New domains can sometimes be associated with phishing or scam websites.`;
  }
  
  return { status, description };
}

function simulateSSLCheck(url: string) {
  // Simulate SSL certificate check
  // In a real app, this would check certificate validity, expiration, etc.
  
  // Some domains likely to have EV certs or good SSL
  const goodSSLDomains = ['bank', 'gov', 'google', 'microsoft', 'apple'];
  const isLikelyGoodSSL = goodSSLDomains.some(domain => url.includes(domain));
  
  // Randomize with bias
  const sslQuality = Math.random();
  let status: "good" | "warning" | "bad" | "info" = "warning";
  let description: string;
  
  if ((isLikelyGoodSSL && sslQuality > 0.1) || sslQuality > 0.7) {
    status = "good";
    description = "Valid SSL certificate with strong encryption is in place.";
  } else if (sslQuality > 0.3) {
    status = "warning";
    description = "SSL certificate is valid but uses outdated encryption methods.";
  } else {
    status = "bad";
    description = "Issues detected with the SSL certificate. It may be expired, self-signed, or invalid.";
  }
  
  return { status, description };
}

function simulatePrivacyPolicyCheck(url: string) {
  // Simulate checking for privacy policy
  // In a real app, this would crawl for privacy-related pages
  
  // Larger sites are more likely to have privacy policies
  const likelyHasPrivacyDomains = ['google', 'amazon', 'microsoft', 'apple', 'facebook', 'shop', 'store'];
  const isLikelyHasPrivacy = likelyHasPrivacyDomains.some(domain => url.includes(domain));
  
  // Randomize with bias
  const hasPrivacyPolicy = (isLikelyHasPrivacy && Math.random() > 0.1) || Math.random() > 0.4;
  
  const status: "good" | "warning" | "bad" | "info" = hasPrivacyPolicy ? "good" : "warning";
  
  return {
    status,
    description: hasPrivacyPolicy 
      ? "Privacy policy detected, which is a good indicator of a legitimate site."
      : "No obvious privacy policy detected. Legitimate websites typically have clear privacy policies."
  };
}

function simulateWebsiteInfo(url: string) {
  // Simulate getting basic website info
  // In a real app, this would parse the HTML and headers
  
  let title = null;
  let server = null;
  
  // Generate a plausible title based on the URL
  const domain = url.split('.')[0];
  if (domain) {
    // Capitalize first letter
    const capitalized = domain.charAt(0).toUpperCase() + domain.slice(1);
    
    // Create plausible titles
    const titleOptions = [
      `${capitalized} - Official Website`,
      `Welcome to ${capitalized}`,
      `${capitalized} - Home`,
      `${capitalized}: Leaders in ${domain.length > 5 ? domain : 'Web Services'}`,
      `${capitalized} | ${domain.length > 5 ? domain : 'Web'} Solutions`
    ];
    
    // Pick one randomly
    title = titleOptions[Math.floor(Math.random() * titleOptions.length)];
  }
  
  // Simulate server info
  const serverOptions = [
    "Apache/2.4.41",
    "nginx/1.18.0",
    "Microsoft-IIS/10.0",
    "cloudflare",
    "gws (Google Web Server)",
    "GitHub.com",
    "AmazonS3",
    "Vercel",
    "Netlify",
    null // Sometimes server info is hidden
  ];
  
  // Pick one randomly with some bias for known domains
  if (url.includes('google')) {
    server = "gws (Google Web Server)";
  } else if (url.includes('github')) {
    server = "GitHub.com";
  } else if (url.includes('amazon') || url.includes('aws')) {
    server = "AmazonS3";
  } else if (url.includes('microsoft')) {
    server = "Microsoft-IIS/10.0";
  } else {
    server = serverOptions[Math.floor(Math.random() * serverOptions.length)];
  }
  
  return { title, server };
}
